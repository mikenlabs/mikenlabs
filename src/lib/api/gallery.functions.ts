import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { query } from "@/lib/db.server";

const gallerySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable().optional(),
  image_url: z.string().min(1, "Image URL is required"),
  category: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  sort_order: z.number().default(0),
});

const galleryUpdateSchema = gallerySchema.partial();

export const listGallery = createServerFn({ method: "GET" })
  .handler(async () => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    return await query("SELECT * FROM gallery ORDER BY sort_order ASC, created_at DESC");
  });

export const listGalleryPublic = createServerFn({ method: "GET" })
  .handler(async () => {
    return await query("SELECT * FROM gallery ORDER BY sort_order ASC, created_at DESC");
  });

export const createGalleryItem = createServerFn({ method: "POST" })
  .inputValidator(gallerySchema)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query(
      "INSERT INTO gallery (title, description, image_url, category, tags, featured, sort_order) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [data.title, data.description, data.image_url, data.category, data.tags, data.featured, data.sort_order]
    );
    return { success: true };
  });

export const updateGalleryItem = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string(), data: galleryUpdateSchema }))
  .handler(async ({ data: { id, data } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    const fields = Object.entries(data).filter(([, v]) => v !== undefined);
    if (fields.length === 0) return { success: true };
    const setClauses = fields.map(([key], i) => `${key} = $${i + 1}`).join(", ");
    const values = fields.map(([, v]) => v);
    values.push(id);
    await query(`UPDATE gallery SET ${setClauses} WHERE id = $${fields.length + 1}`, values);
    return { success: true };
  });

export const deleteGalleryItem = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query("DELETE FROM gallery WHERE id = $1", [id]);
    return { success: true };
  });
