import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { query } from "@/lib/db.server";
import { hashPassword, verifyPassword, signToken, requireAdmin } from "@/lib/auth.server";

export const signupAdmin = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().email(), password: z.string().min(6) }))
  .handler(async ({ data }) => {
    const existing = await query("SELECT id FROM users WHERE role = 'admin' LIMIT 1");
    const isFirstAdmin = existing.length === 0;

    const dup = await query("SELECT id FROM users WHERE email = $1", [data.email]);
    if (dup.length > 0) throw new Error("Email already registered");

    const passwordHash = await hashPassword(data.password);
    const result = await query(
      "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id",
      [data.email, passwordHash, "admin"]
    );

    const token = signToken(result[0].id, "admin");
    return { success: true, isFirstAdmin, token };
  });

export const login = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().email(), password: z.string() }))
  .handler(async ({ data }) => {
    const rows = await query("SELECT id, email, password_hash, role FROM users WHERE email = $1", [data.email]);
    if (rows.length === 0) throw new Error("Invalid email or password");

    const user = rows[0];
    const valid = await verifyPassword(data.password, user.password_hash);
    if (!valid) throw new Error("Invalid email or password");

    const token = signToken(user.id, user.role);
    return { token, userId: user.id, role: user.role };
  });

export const checkHasAdmin = createServerFn({ method: "GET" })
  .handler(async () => {
    const result = await query("SELECT id FROM users WHERE role = 'admin' LIMIT 1");
    return { hasAdmin: result.length > 0 };
  });

export const verifySession = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    const { verifyToken } = await import("@/lib/auth.server");
    const payload = verifyToken(data.token);
    if (!payload) return { valid: false };
    return { valid: true, userId: payload.userId, role: payload.role };
  });
