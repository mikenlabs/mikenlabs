import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { query } from "@/lib/db.server";

const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  content: z.string().min(1, "Content is required"),
  avatar_url: z.string().nullable().optional(),
  rating: z.number().min(1).max(5).default(5),
  featured: z.boolean().default(false),
  sort_order: z.number().default(0),
});

const testimonialUpdateSchema = testimonialSchema.partial();

export const listTestimonials = createServerFn({ method: "GET" })
  .handler(async () => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    return await query("SELECT * FROM testimonials ORDER BY sort_order ASC, created_at DESC");
  });

export const listTestimonialsPublic = createServerFn({ method: "GET" })
  .handler(async () => {
    return await query("SELECT * FROM testimonials ORDER BY sort_order ASC, created_at DESC");
  });

export const createTestimonial = createServerFn({ method: "POST" })
  .inputValidator(testimonialSchema)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query(
      "INSERT INTO testimonials (name, role, company, content, avatar_url, rating, featured, sort_order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [data.name, data.role, data.company, data.content, data.avatar_url, data.rating, data.featured, data.sort_order]
    );
    return { success: true };
  });

export const updateTestimonial = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string(), data: testimonialUpdateSchema }))
  .handler(async ({ data: { id, data } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    const fields = Object.entries(data).filter(([, v]) => v !== undefined);
    if (fields.length === 0) return { success: true };
    const setClauses = fields.map(([key], i) => `${key} = $${i + 1}`).join(", ");
    const values = fields.map(([, v]) => v);
    values.push(id);
    await query(`UPDATE testimonials SET ${setClauses} WHERE id = $${fields.length + 1}`, values);
    return { success: true };
  });

export const deleteTestimonial = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query("DELETE FROM testimonials WHERE id = $1", [id]);
    return { success: true };
  });
