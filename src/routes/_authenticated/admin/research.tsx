import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { researchConfig } from "@/lib/cms";
import { AdminLayout } from "@/routes/_authenticated/admin/index";

export const Route = createFileRoute("/_authenticated/admin/research")({
  head: () => ({
    meta: [
      { title: "Manage Research | Miken Labs Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminResearch,
});

function AdminResearch() {
  return (
    <AdminLayout>
      <ResourceManager config={researchConfig} />
    </AdminLayout>
  );
}
