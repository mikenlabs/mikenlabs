import { createFileRoute } from "@tanstack/react-router";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { courseConfig } from "@/lib/cms";
import { AdminLayout } from "@/routes/_authenticated/admin/index";

export const Route = createFileRoute("/_authenticated/admin/courses")({
  head: () => ({
    meta: [
      { title: "Manage Courses | Miken Labs Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminCourses,
});

function AdminCourses() {
  return (
    <AdminLayout>
      <ResourceManager config={courseConfig} />
    </AdminLayout>
  );
}
