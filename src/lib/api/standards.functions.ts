import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { query } from "@/lib/db.server";

const standardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  sort_order: z.number().default(0),
});

const standardUpdateSchema = standardSchema.partial();

export const listStandards = createServerFn({ method: "GET" })
  .handler(async () => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    return await query("SELECT * FROM standards ORDER BY sort_order ASC");
  });

export const listStandardsPublic = createServerFn({ method: "GET" })
  .handler(async () => {
    return await query("SELECT * FROM standards ORDER BY sort_order ASC");
  });

export const createStandard = createServerFn({ method: "POST" })
  .inputValidator(standardSchema)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query(
      "INSERT INTO standards (title, slug, description, category, icon, sort_order) VALUES ($1, $2, $3, $4, $5, $6)",
      [data.title, data.slug, data.description, data.category, data.icon, data.sort_order]
    );
    return { success: true };
  });

export const updateStandard = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string(), data: standardUpdateSchema }))
  .handler(async ({ data: { id, data } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    const fields = Object.entries(data).filter(([, v]) => v !== undefined);
    if (fields.length === 0) return { success: true };
    const setClauses = fields.map(([key], i) => `${key} = $${i + 1}`).join(", ");
    const values = fields.map(([, v]) => v);
    values.push(id);
    await query(`UPDATE standards SET ${setClauses} WHERE id = $${fields.length + 1}`, values);
    return { success: true };
  });

export const deleteStandard = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query("DELETE FROM standards WHERE id = $1", [id]);
    return { success: true };
  });
