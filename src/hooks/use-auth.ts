import { useEffect, useState } from "react";
import { verifySession } from "@/lib/api/auth.functions";

const TOKEN_KEY = "miken-jwt";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `miken-jwt=${token}; path=/; max-age=604800; SameSite=Lax; Secure`;
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = "miken-jwt=; path=/; max-age=0";
}

export function useAuth() {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    verifySession({ data: { token } }).then((res) => {
      if (res.valid && res.role === "admin") {
        setIsAdmin(true);
        setUser({ id: res.userId!, email: "" });
      }
      setLoading(false);
    }).catch(() => {
      removeToken();
      setLoading(false);
    });
  }, []);

  return { user, isAdmin, loading, getToken, setToken, removeToken };
}
