import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdmin } from "@/lib/auth-helpers.server";
import { rateLimit } from "@/lib/rate-limit.server";

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .validator(z.object({ email: z.string().email("Valid email is required") }))
  .handler(async ({ data }) => {
    rateLimit({ max: 5, windowMs: 60_000 });
    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert({ email: data.email });
    if (error) {
      if (error.message?.includes("duplicate") || error.message?.includes("unique")) {
        throw new Error("You're already subscribed!");
      }
      throw new Error(error.message);
    }
    return { success: true };
  });

export const listSubscribers = createServerFn({ method: "GET" })
  .handler(async () => {
    await requireAdmin();
    const { data, error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("*")
      .order("subscribed_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const deleteSubscriber = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    await requireAdmin();
    const { error } = await supabaseAdmin.from("newsletter_subscribers").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { success: true };
  });
