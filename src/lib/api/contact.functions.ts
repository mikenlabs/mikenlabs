import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Valid email is required").max(300),
  subject: z.string().min(1, "Subject is required").max(500),
  message: z.string().min(1, "Message is required").max(5000),
});

export const submitContact = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({ name: data.name, email: data.email, subject: data.subject, message: data.message });
    if (error) throw new Error(error.message);
    return { success: true };
  });

export const listContactSubmissions = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const deleteContactSubmission = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { error } = await supabaseAdmin.from("contact_submissions").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });
