import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type FieldType = "text" | "textarea" | "tags" | "select" | "checkbox" | "number";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export interface ResourceConfig {
  table: "products" | "research" | "standards";
  label: string;
  singular: string;
  titleField: string;
  subtitleField?: string;
  fields: FieldDef[];
}

export const productConfig: ResourceConfig = {
  table: "products",
  label: "Products",
  singular: "Product",
  titleField: "name",
  subtitleField: "short_description",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "short_description", label: "Short description", type: "textarea" },
    { name: "description", label: "Full description", type: "textarea" },
    { name: "tags", label: "Tags (comma separated)", type: "tags" },
    { name: "status", label: "Status", type: "select", options: ["LIVE", "BETA", "COMING SOON"] },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: ["ai_product", "saas", "educational", "developer_tool", "research"],
    },
    { name: "demo_url", label: "Demo URL", type: "text" },
    { name: "github_url", label: "GitHub URL", type: "text" },
    { name: "docs_url", label: "Docs URL", type: "text" },
    { name: "sort_order", label: "Sort order", type: "number" },
    { name: "featured", label: "Featured", type: "checkbox" },
  ],
};

export const researchConfig: ResourceConfig = {
  table: "research",
  label: "Research",
  singular: "Research post",
  titleField: "title",
  subtitleField: "summary",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "summary", label: "Summary", type: "textarea" },
    { name: "content", label: "Content", type: "textarea" },
    { name: "category", label: "Category", type: "text" },
    { name: "tags", label: "Tags (comma separated)", type: "tags" },
    { name: "status", label: "Status", type: "select", options: ["research", "prototype", "beta", "production"] },
    { name: "read_time", label: "Read time (e.g. 7 min read)", type: "text" },
    { name: "sort_order", label: "Sort order", type: "number" },
    { name: "featured", label: "Featured", type: "checkbox" },
  ],
};

export const standardsConfig: ResourceConfig = {
  table: "standards",
  label: "Standards",
  singular: "Standard",
  titleField: "title",
  subtitleField: "description",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "content", label: "Content", type: "textarea" },
    {
      name: "icon",
      label: "Icon",
      type: "select",
      options: ["ShieldCheck", "Eye", "Scale", "Users", "Activity", "Lock"],
    },
    { name: "sort_order", label: "Sort order", type: "number" },
  ],
};

export type AnyRow = Tables<"products"> | Tables<"research"> | Tables<"standards">;

export async function listRows(table: ResourceConfig["table"]) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function upsertRow(table: ResourceConfig["table"], values: Record<string, unknown>, id?: string) {
  if (id) {
    const { error } = await supabase.from(table).update(values as never).eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from(table).insert(values as never);
    if (error) throw error;
  }
}

export async function deleteRow(table: ResourceConfig["table"], id: string) {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
