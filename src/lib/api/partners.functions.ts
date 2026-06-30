import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdmin } from "@/lib/auth-helpers.server";

const partnerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  website_url: z.string().nullable().optional(),
  logo_url: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  featured: z.boolean().default(false),
  sort_order: z.number().default(0),
});

const partnerUpdateSchema = partnerSchema.partial();

export const listPartners = createServerFn({ method: "GET" })
  .handler(async () => {
    await requireAdmin();
    const { data, error } = await supabaseAdmin
      .from("partners")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const listPartnersPublic = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from("partners")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const createPartner = createServerFn({ method: "POST" })
  .validator(partnerSchema)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { error } = await supabaseAdmin.from("partners").insert(data as never);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const updatePartner = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string(), data: partnerUpdateSchema }))
  .handler(async ({ data: { id, data } }) => {
    await requireAdmin();
    const { error } = await supabaseAdmin.from("partners").update(data as never).eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const deletePartner = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    await requireAdmin();
    const { error } = await supabaseAdmin.from("partners").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });
