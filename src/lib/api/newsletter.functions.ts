import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { query } from "@/lib/db.server";

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().email("Valid email is required") }))
  .handler(async ({ data }) => {
    const { rateLimit } = await import("@/lib/rate-limit.server");
    rateLimit({ max: 5, windowMs: 60_000 });
    try {
      await query("INSERT INTO newsletter_subscribers (email) VALUES ($1)", [data.email]);
    } catch (err: any) {
      if (err?.message?.includes("unique") || err?.code === "23505") {
        throw new Error("You're already subscribed!");
      }
      throw err;
    }
    return { success: true };
  });

export const listSubscribers = createServerFn({ method: "GET" })
  .handler(async () => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    return await query("SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC");
  });

export const deleteSubscriber = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const { requireAdmin } = await import("@/lib/auth.server");
    await requireAdmin();
    await query("DELETE FROM newsletter_subscribers WHERE id = $1", [id]);
    return { success: true };
  });
