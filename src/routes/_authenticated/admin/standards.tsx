import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { standardsConfig } from "@/lib/cms";
import { AdminLayout } from "@/routes/_authenticated/admin/index";

export const Route = createFileRoute("/_authenticated/admin/standards")({
  head: () => ({
    meta: [
      { title: "Manage Standards | Miken Labs Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminStandards,
});

function AdminStandards() {
  return (
    <AdminLayout>
      <ResourceManager config={standardsConfig} />
    </AdminLayout>
  );
}
