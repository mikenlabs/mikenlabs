import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { productConfig } from "@/lib/cms";
import { AdminLayout } from "@/routes/_authenticated/admin/index";

export const Route = createFileRoute("/_authenticated/admin/products")({
  head: () => ({
    meta: [
      { title: "Manage Products | Miken Labs Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminProducts,
});

function AdminProducts() {
  return (
    <AdminLayout>
      <ResourceManager config={productConfig} />
    </AdminLayout>
  );
}
