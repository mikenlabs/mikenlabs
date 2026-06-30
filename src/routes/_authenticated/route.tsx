import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { verifySession } from "@/lib/api/auth.functions";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    if (typeof window === "undefined") throw redirect({ to: "/auth" });
    const cookie = document.cookie;
    const match = cookie.match(/(?:^|;\s*)miken-jwt=([^;]*)/);
    const token = match?.[1];
    if (!token) throw redirect({ to: "/auth" });
    const res = await verifySession({ data: { token } });
    if (!res.valid || res.role !== "admin") throw redirect({ to: "/auth" });
    return { user: { id: res.userId! }, isAdmin: true };
  },
  component: () => <Outlet />,
});
