import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const listProductsPublic = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const createProduct = createServerFn({ method: "POST" })
  .validator(productSchema)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("products").insert(data as never);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const updateProduct = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string(), data: productUpdateSchema }))
  .handler(async ({ data: { id, data } }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("products").update(data as never).eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("products").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });
