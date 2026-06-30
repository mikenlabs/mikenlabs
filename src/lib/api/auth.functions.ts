import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const signupAdmin = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().email(), password: z.string().min(6) }))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existing } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin")
      .limit(1);
    const isFirstAdmin = !existing || existing.length === 0;
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });
    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error("Failed to create user");
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: authData.user.id, role: "admin" });
    if (roleError) throw new Error(roleError.message);
    return { success: true, isFirstAdmin };
  });

export const checkHasAdmin = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin")
      .limit(1);
    return { hasAdmin: !!data && data.length > 0 };
  });
