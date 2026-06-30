import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

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
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { data, error } = await supabaseAdmin
      .from("gallery")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const listGalleryPublic = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from("gallery")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const createGalleryItem = createServerFn({ method: "POST" })
  .validator(gallerySchema)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { error } = await supabaseAdmin.from("gallery").insert(data as never);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const updateGalleryItem = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string(), data: galleryUpdateSchema }))
  .handler(async ({ data: { id, data } }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { error } = await supabaseAdmin.from("gallery").update(data as never).eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deleteGalleryItem = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { error } = await supabaseAdmin.from("gallery").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });
