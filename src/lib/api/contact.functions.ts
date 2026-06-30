import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Valid email is required").max(300),
  subject: z.string().min(1, "Subject is required").max(500),
  message: z.string().min(1, "Message is required").max(5000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator(contactSchema)
  .handler(async ({ data }) => {
    const { rateLimit } = await import("@/lib/rate-limit.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    rateLimit({ max: 5, windowMs: 60_000 });
    const { error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({ name: data.name, email: data.email, subject: data.subject, message: data.message });
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const listContactSubmissions = createServerFn({ method: "GET" })
  .handler(async () => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const deleteContactSubmission = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth-helpers.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });
