import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { query } from "@/lib/db.server";

const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  level: z.string().nullable().optional(),
  topics: z.array(z.string()).default([]),
  status: z.string().default("active"),
  image_url: z.string().nullable().optional(),
  enrollment_url: z.string().nullable().optional(),
  featured: z.boolean().default(false),
  sort_order: z.number().default(0),
});

const courseUpdateSchema = courseSchema.partial();

export const listCourses = createServerFn({ method: "GET" })
  .handler(async () => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    return await query("SELECT * FROM courses ORDER BY sort_order ASC, created_at DESC");
  });

export const listCoursesPublic = createServerFn({ method: "GET" })
  .handler(async () => {
    return await query("SELECT * FROM courses ORDER BY sort_order ASC, created_at DESC");
  });

export const createCourse = createServerFn({ method: "POST" })
  .inputValidator(courseSchema)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query(
      "INSERT INTO courses (title, slug, description, category, duration, level, topics, status, image_url, enrollment_url, featured, sort_order) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
      [data.title, data.slug, data.description, data.category, data.duration, data.level, data.topics, data.status, data.image_url, data.enrollment_url, data.featured, data.sort_order]
    );
    return { success: true };
  });

export const updateCourse = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string(), data: courseUpdateSchema }))
  .handler(async ({ data: { id, data } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    const fields = Object.entries(data).filter(([, v]) => v !== undefined);
    if (fields.length === 0) return { success: true };
    const setClauses = fields.map(([key], i) => `${key} = $${i + 1}`).join(", ");
    const values = fields.map(([, v]) => v);
    values.push(id);
    await query(`UPDATE courses SET ${setClauses} WHERE id = $${fields.length + 1}`, values);
    return { success: true };
  });

export const deleteCourse = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query("DELETE FROM courses WHERE id = $1", [id]);
    return { success: true };
  });
