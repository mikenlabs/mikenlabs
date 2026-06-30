import { query } from "./db.server";
import { getRequest } from "@tanstack/react-start/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "miken-labs-jwt-secret-change-in-production";

export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

export function signToken(userId: string, role: string): string {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const request = getRequest();
  if (!request?.headers) throw new Error("Unauthorized: No request headers");

  let token: string | null = null;

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.replace("Bearer ", "");
  }

  if (!token) {
    const cookie = request.headers.get("cookie") || "";
    const match = cookie.match(/(?:^|;\s*)miken-jwt=([^;]*)/);
    if (match) token = match[1];
  }

  if (!token) throw new Error("Unauthorized: No valid authorization header");

  const payload = verifyToken(token);
  if (!payload) throw new Error("Unauthorized: Invalid or expired token");
  if (payload.role !== "admin") throw new Error("Forbidden: Admin access required");

  return { userId: payload.userId };
}
