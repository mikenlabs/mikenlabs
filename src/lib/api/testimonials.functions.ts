import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

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
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { data, error } = await supabaseAdmin
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const listTestimonialsPublic = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const createTestimonial = createServerFn({ method: "POST" })
  .validator(testimonialSchema)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { error } = await supabaseAdmin.from("testimonials").insert(data as never);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const updateTestimonial = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string(), data: testimonialUpdateSchema }))
  .handler(async ({ data: { id, data } }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { error } = await supabaseAdmin.from("testimonials").update(data as never).eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deleteTestimonial = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { error } = await supabaseAdmin.from("testimonials").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });
