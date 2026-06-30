import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { blogConfig } from "@/lib/cms";
import { AdminLayout } from "@/routes/_authenticated/admin/index";

export const Route = createFileRoute("/_authenticated/admin/blogs")({
  head: () => ({
    meta: [
      { title: "Manage Blog | Miken Labs Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminBlogs,
});

function AdminBlogs() {
  return (
    <AdminLayout>
      <ResourceManager config={blogConfig} />
    </AdminLayout>
  );
}
