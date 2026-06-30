import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { query } from "@/lib/db.server";

const researchSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  summary: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  status: z.string().default("research"),
  read_time: z.string().nullable().optional(),
  featured: z.boolean().default(false),
  sort_order: z.number().default(0),
  published_at: z.string().nullable().optional(),
});

const researchUpdateSchema = researchSchema.partial();

export const listResearch = createServerFn({ method: "GET" })
  .handler(async () => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    return await query("SELECT * FROM research ORDER BY sort_order ASC, created_at DESC");
  });

export const listResearchPublic = createServerFn({ method: "GET" })
  .handler(async () => {
    return await query("SELECT * FROM research ORDER BY sort_order ASC, created_at DESC");
  });

export const createResearch = createServerFn({ method: "POST" })
  .inputValidator(researchSchema)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query(
      "INSERT INTO research (title, slug, summary, content, category, tags, status, read_time, featured, sort_order, published_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [data.title, data.slug, data.summary, data.content, data.category, data.tags, data.status, data.read_time, data.featured, data.sort_order, data.published_at]
    );
    return { success: true };
  });

export const updateResearch = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string(), data: researchUpdateSchema }))
  .handler(async ({ data: { id, data } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    const fields = Object.entries(data).filter(([, v]) => v !== undefined);
    if (fields.length === 0) return { success: true };
    const setClauses = fields.map(([key], i) => `${key} = $${i + 1}`).join(", ");
    const values = fields.map(([, v]) => v);
    values.push(id);
    await query(`UPDATE research SET ${setClauses} WHERE id = $${fields.length + 1}`, values);
    return { success: true };
  });

export const deleteResearch = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query("DELETE FROM research WHERE id = $1", [id]);
    return { success: true };
  });
