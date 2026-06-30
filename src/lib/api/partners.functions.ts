import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { query } from "@/lib/db.server";

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
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    return await query("SELECT * FROM partners ORDER BY sort_order ASC, created_at DESC");
  });

export const listPartnersPublic = createServerFn({ method: "GET" })
  .handler(async () => {
    return await query("SELECT * FROM partners ORDER BY sort_order ASC, created_at DESC");
  });

export const createPartner = createServerFn({ method: "POST" })
  .inputValidator(partnerSchema)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query(
      "INSERT INTO partners (name, website_url, logo_url, description, category, featured, sort_order) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [data.name, data.website_url, data.logo_url, data.description, data.category, data.featured, data.sort_order]
    );
    return { success: true };
  });

export const updatePartner = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string(), data: partnerUpdateSchema }))
  .handler(async ({ data: { id, data } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    const fields = Object.entries(data).filter(([, v]) => v !== undefined);
    if (fields.length === 0) return { success: true };
    const setClauses = fields.map(([key], i) => `${key} = $${i + 1}`).join(", ");
    const values = fields.map(([, v]) => v);
    values.push(id);
    await query(`UPDATE partners SET ${setClauses} WHERE id = $${fields.length + 1}`, values);
    return { success: true };
  });

export const deletePartner = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query("DELETE FROM partners WHERE id = $1", [id]);
    return { success: true };
  });
