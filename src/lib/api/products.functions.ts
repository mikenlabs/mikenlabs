import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { query } from "@/lib/db.server";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  short_description: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  status: z.string().default("LIVE"),
  category: z.string().default("ai_product"),
  demo_url: z.string().nullable().optional(),
  github_url: z.string().nullable().optional(),
  docs_url: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  live_url: z.string().nullable().optional(),
  featured: z.boolean().default(false),
  sort_order: z.number().default(0),
});

const productUpdateSchema = productSchema.partial();

export const listProducts = createServerFn({ method: "GET" })
  .handler(async () => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    return await query("SELECT * FROM products ORDER BY sort_order ASC, created_at DESC");
  });

export const listProductsPublic = createServerFn({ method: "GET" })
  .handler(async () => {
    return await query("SELECT * FROM products ORDER BY sort_order ASC, created_at DESC");
  });

export const createProduct = createServerFn({ method: "POST" })
  .inputValidator(productSchema)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query(
      "INSERT INTO products (name, slug, short_description, description, tags, status, category, demo_url, github_url, docs_url, image_url, live_url, featured, sort_order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
      [data.name, data.slug, data.short_description, data.description, data.tags, data.status, data.category, data.demo_url, data.github_url, data.docs_url, data.image_url, data.live_url, data.featured, data.sort_order]
    );
    return { success: true };
  });

export const updateProduct = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string(), data: productUpdateSchema }))
  .handler(async ({ data: { id, data } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    const fields = Object.entries(data).filter(([, v]) => v !== undefined);
    if (fields.length === 0) return { success: true };
    const setClauses = fields.map(([key], i) => `${key} = $${i + 1}`).join(", ");
    const values = fields.map(([, v]) => v);
    values.push(id);
    await query(`UPDATE products SET ${setClauses} WHERE id = $${fields.length + 1}`, values);
    return { success: true };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query("DELETE FROM products WHERE id = $1", [id]);
    return { success: true };
  });
