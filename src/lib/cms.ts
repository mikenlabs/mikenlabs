import { listProducts, createProduct, updateProduct, deleteProduct } from "@/lib/api/products.functions";
import { listResearch, createResearch, updateResearch, deleteResearch } from "@/lib/api/research.functions";
import { listStandards, createStandard, updateStandard, deleteStandard } from "@/lib/api/standards.functions";
import { listCourses, createCourse, updateCourse, deleteCourse } from "@/lib/api/courses.functions";
import { listBlogs, createBlog, updateBlog, deleteBlog } from "@/lib/api/blogs.functions";
import { listTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/api/testimonials.functions";
import { listGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem } from "@/lib/api/gallery.functions";
import { listPartners, createPartner, updatePartner, deletePartner } from "@/lib/api/partners.functions";
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
  table: string;
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
    { name: "category", label: "Category", type: "select", options: ["ai_product", "saas", "educational", "developer_tool", "research"] },
    { name: "image_url", label: "Image URL", type: "text" },
    { name: "demo_url", label: "Demo/Live URL", type: "text" },
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
    { name: "icon", label: "Icon", type: "select", options: ["ShieldCheck", "Eye", "Scale", "Users", "Activity", "Lock"] },
    { name: "sort_order", label: "Sort order", type: "number" },
  ],
};

export const courseConfig: ResourceConfig = {
  table: "courses",
  label: "Courses",
  singular: "Course",
  titleField: "title",
  subtitleField: "description",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "icon", label: "Icon", type: "select", options: ["BrainCircuit", "Code2", "BarChart3", "FileText", "Terminal", "FileSpreadsheet"] },
    { name: "duration", label: "Duration (e.g. 12 Weeks)", type: "text" },
    { name: "mode", label: "Mode", type: "select", options: ["Online", "In-person", "Hybrid"] },
    { name: "level", label: "Level", type: "select", options: ["Beginner", "Intermediate", "Advanced", "Beginner to Advanced", "Beginner to Intermediate"] },
    { name: "color", label: "Color gradient", type: "select", options: ["from-blue-500 to-blue-700", "from-indigo-500 to-indigo-700", "from-emerald-500 to-emerald-700", "from-purple-500 to-purple-700", "from-amber-500 to-amber-700", "from-rose-500 to-rose-700"] },
    { name: "featured", label: "Featured", type: "checkbox" },
    { name: "sort_order", label: "Sort order", type: "number" },
  ],
};

export const blogConfig: ResourceConfig = {
  table: "blogs",
  label: "Blog Posts",
  singular: "Blog Post",
  titleField: "title",
  subtitleField: "excerpt",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true },
    { name: "excerpt", label: "Excerpt", type: "textarea" },
    { name: "content", label: "Content (Markdown)", type: "textarea" },
    { name: "category", label: "Category", type: "text" },
    { name: "tags", label: "Tags (comma separated)", type: "tags" },
    { name: "author", label: "Author", type: "text" },
    { name: "featured_image", label: "Featured Image URL", type: "text" },
    { name: "read_time", label: "Read time (e.g. 5 min read)", type: "text" },
    { name: "featured", label: "Featured", type: "checkbox" },
    { name: "published", label: "Published", type: "checkbox" },
    { name: "sort_order", label: "Sort order", type: "number" },
  ],
};

export const testimonialConfig: ResourceConfig = {
  table: "testimonials",
  label: "Testimonials",
  singular: "Testimonial",
  titleField: "name",
  subtitleField: "content",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "role", label: "Role", type: "text" },
    { name: "company", label: "Company", type: "text" },
    { name: "content", label: "Content", type: "textarea", required: true },
    { name: "rating", label: "Rating (1-5)", type: "select", options: ["5", "4", "3", "2", "1"] },
    { name: "avatar_url", label: "Avatar URL", type: "text" },
    { name: "featured", label: "Featured", type: "checkbox" },
    { name: "sort_order", label: "Sort order", type: "number" },
  ],
};

export const galleryConfig: ResourceConfig = {
  table: "gallery",
  label: "Gallery",
  singular: "Gallery item",
  titleField: "title",
  subtitleField: "description",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "image_url", label: "Image URL", type: "text" },
    { name: "category", label: "Category", type: "text" },
    { name: "sort_order", label: "Sort order", type: "number" },
  ],
};

export const partnerConfig: ResourceConfig = {
  table: "partners",
  label: "Partners",
  singular: "Partner",
  titleField: "name",
  subtitleField: "website",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "website", label: "Website URL", type: "text" },
    { name: "logo_url", label: "Logo URL", type: "text" },
    { name: "sort_order", label: "Sort order", type: "number" },
  ],
};

export type AnyRow = Record<string, unknown>;

async function genericList(table: string) {
  switch (table) {
    case "products": return listProducts() as Promise<AnyRow[]>;
    case "research": return listResearch() as Promise<AnyRow[]>;
    case "standards": return listStandards() as Promise<AnyRow[]>;
    case "courses": return listCourses() as Promise<AnyRow[]>;
    case "blogs": return listBlogs() as Promise<AnyRow[]>;
    case "testimonials": return listTestimonials() as Promise<AnyRow[]>;
    case "gallery": return listGallery() as Promise<AnyRow[]>;
    case "partners": return listPartners() as Promise<AnyRow[]>;
    default: throw new Error(`Unknown table: ${table}`);
  }
}

export async function listRows(table: string) {
  return genericList(table);
}

async function genericUpsert(table: string, values: Record<string, unknown>, id?: string) {
  if (id) {
    switch (table) {
      case "products": await updateProduct({ id, data: values }); break;
      case "research": await updateResearch({ id, data: values }); break;
      case "standards": await updateStandard({ id, data: values }); break;
      case "courses": await updateCourse({ id, data: values }); break;
      case "blogs": await updateBlog({ id, data: values }); break;
      case "testimonials": await updateTestimonial({ id, data: values }); break;
      case "gallery": await updateGalleryItem({ id, data: values }); break;
      case "partners": await updatePartner({ id, data: values }); break;
    }
  } else {
    switch (table) {
      case "products": await createProduct(values as never); break;
      case "research": await createResearch(values as never); break;
      case "standards": await createStandard(values as never); break;
      case "courses": await createCourse(values as never); break;
      case "blogs": await createBlog(values as never); break;
      case "testimonials": await createTestimonial(values as never); break;
      case "gallery": await createGalleryItem(values as never); break;
      case "partners": await createPartner(values as never); break;
    }
  }
}

export async function upsertRow(table: string, values: Record<string, unknown>, id?: string) {
  await genericUpsert(table, values, id);
}

async function genericDelete(table: string, id: string) {
  switch (table) {
    case "products": await deleteProduct({ id }); break;
    case "research": await deleteResearch({ id }); break;
    case "standards": await deleteStandard({ id }); break;
    case "courses": await deleteCourse({ id }); break;
    case "blogs": await deleteBlog({ id }); break;
    case "testimonials": await deleteTestimonial({ id }); break;
    case "gallery": await deleteGalleryItem({ id }); break;
    case "partners": await deletePartner({ id }); break;
  }
}

export async function deleteRow(table: string, id: string) {
  await genericDelete(table, id);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
