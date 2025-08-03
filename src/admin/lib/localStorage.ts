// src/admin/lib/localStorage.ts

const STORAGE_KEY = "auth";

export interface AuthStorage {
  access_token: string;
  user?: any;
}

export function setAuth(data: AuthStorage) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getAuth(): AuthStorage | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEY);
}
