import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { query } from "@/lib/db.server";

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
    rateLimit({ max: 5, windowMs: 60_000 });
    await query(
      "INSERT INTO contact_submissions (name, email, subject, message) VALUES ($1, $2, $3, $4)",
      [data.name, data.email, data.subject, data.message]
    );
    return { success: true };
  });

export const listContactSubmissions = createServerFn({ method: "GET" })
  .handler(async () => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    return await query("SELECT * FROM contact_submissions ORDER BY created_at DESC");
  });

export const deleteContactSubmission = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query("DELETE FROM contact_submissions WHERE id = $1", [id]);
    return { success: true };
  });
