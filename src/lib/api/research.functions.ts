import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

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
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { data, error } = await supabaseAdmin
      .from("research")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const listResearchPublic = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from("research")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const createResearch = createServerFn({ method: "POST" })
  .validator(researchSchema)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { error } = await supabaseAdmin.from("research").insert(data as never);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const updateResearch = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string(), data: researchUpdateSchema }))
  .handler(async ({ data: { id, data } }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { error } = await supabaseAdmin.from("research").update(data as never).eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deleteResearch = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { error } = await supabaseAdmin.from("research").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });
