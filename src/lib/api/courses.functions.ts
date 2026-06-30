import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("courses")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const listCoursesPublic = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("courses")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const createCourse = createServerFn({ method: "POST" })
  .validator(courseSchema)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("courses").insert(data as never);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const updateCourse = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string(), data: courseUpdateSchema }))
  .handler(async ({ data: { id, data } }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("courses").update(data as never).eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deleteCourse = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("courses").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });
