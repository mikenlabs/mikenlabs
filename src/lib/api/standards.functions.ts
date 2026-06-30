import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const standardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  icon: z.string().default("ShieldCheck"),
  sort_order: z.number().default(0),
});

const standardUpdateSchema = standardSchema.partial();

export const listStandards = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from("standards")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const createStandard = createServerFn({ method: "POST" })
  .validator(standardSchema)
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("standards").insert(data as never);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const updateStandard = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string(), data: standardUpdateSchema }))
  .handler(async ({ data: { id, data } }) => {
    const { error } = await supabaseAdmin.from("standards").update(data as never).eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deleteStandard = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { error } = await supabaseAdmin.from("standards").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });
