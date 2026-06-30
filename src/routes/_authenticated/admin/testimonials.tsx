import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { testimonialConfig } from "@/lib/cms";
import { AdminLayout } from "@/routes/_authenticated/admin/index";

export const Route = createFileRoute("/_authenticated/admin/testimonials")({
  head: () => ({
    meta: [
      { title: "Manage Testimonials | Miken Labs Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminTestimonials,
});

function AdminTestimonials() {
  return (
    <AdminLayout>
      <ResourceManager config={testimonialConfig} />
    </AdminLayout>
  );
}
