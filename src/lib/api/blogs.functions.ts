import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { query } from "@/lib/db.server";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  status: z.string().default("draft"),
  image_url: z.string().nullable().optional(),
  author: z.string().nullable().optional(),
  featured: z.boolean().default(false),
  published_at: z.string().nullable().optional(),
});

const blogUpdateSchema = blogSchema.partial();

export const listBlogs = createServerFn({ method: "GET" })
  .handler(async () => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    return await query("SELECT * FROM blogs ORDER BY created_at DESC");
  });

export const listBlogsPublic = createServerFn({ method: "GET" })
  .handler(async () => {
    return await query("SELECT * FROM blogs ORDER BY created_at DESC");
  });

export const createBlog = createServerFn({ method: "POST" })
  .inputValidator(blogSchema)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query(
      "INSERT INTO blogs (title, slug, excerpt, content, category, tags, status, image_url, author, featured, published_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [data.title, data.slug, data.excerpt, data.content, data.category, data.tags, data.status, data.image_url, data.author, data.featured, data.published_at]
    );
    return { success: true };
  });

export const updateBlog = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string(), data: blogUpdateSchema }))
  .handler(async ({ data: { id, data } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    const fields = Object.entries(data).filter(([, v]) => v !== undefined);
    if (fields.length === 0) return { success: true };
    const setClauses = fields.map(([key], i) => `${key} = $${i + 1}`).join(", ");
    const values = fields.map(([, v]) => v);
    values.push(id);
    await query(`UPDATE blogs SET ${setClauses} WHERE id = $${fields.length + 1}`, values);
    return { success: true };
  });

export const deleteBlog = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query("DELETE FROM blogs WHERE id = $1", [id]);
    return { success: true };
  });
