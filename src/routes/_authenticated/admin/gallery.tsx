import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { galleryConfig } from "@/lib/cms";
import { AdminLayout } from "@/routes/_authenticated/admin/index";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  head: () => ({
    meta: [
      { title: "Manage Gallery | Miken Labs Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminGallery,
});

function AdminGallery() {
  return (
    <AdminLayout>
      <ResourceManager config={galleryConfig} />
    </AdminLayout>
  );
}
