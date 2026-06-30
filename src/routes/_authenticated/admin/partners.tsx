import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { partnerConfig } from "@/lib/cms";
import { AdminLayout } from "@/routes/_authenticated/admin/index";

export const Route = createFileRoute("/_authenticated/admin/partners")({
  head: () => ({
    meta: [
      { title: "Manage Partners | Miken Labs Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPartners,
});

function AdminPartners() {
  return (
    <AdminLayout>
      <ResourceManager config={partnerConfig} />
    </AdminLayout>
  );
}
