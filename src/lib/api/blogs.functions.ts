import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const listBlogsPublic = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const createBlog = createServerFn({ method: "POST" })
  .validator(blogSchema)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("blogs").insert(data as never);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const updateBlog = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string(), data: blogUpdateSchema }))
  .handler(async ({ data: { id, data } }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("blogs").update(data as never).eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deleteBlog = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("blogs").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });
