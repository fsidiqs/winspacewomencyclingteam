// Utility for making API requests (using fetch)
const API_HOST = import.meta.env.VITE_API_HOST;
import { getAuth } from "./localStorage";

export async function apiRequest(url: string, method: string, data?: any, isFormData = false, token?: string) {
    const headers: Record<string, string> = {};
    if (!isFormData) headers['Content-Type'] = 'application/json';
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const options: RequestInit = {
        method,
        headers: isFormData ? (token ? { 'Authorization': `Bearer ${token}` } : undefined) : headers,
        body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
    };
    console.log(`API Request: ${method} ${API_HOST}${url}`, options);
    const res = await fetch(`${API_HOST}${url}`, options);
    // if (res.status === 401) {
    //     window.location.href = '/wos-connect';
    //     throw new Error('Unauthorized');
    // }
    // if (!res.ok) throw new Error(await res.text());
    return res.json();
}

export async function apiRequestWithAuth(url: string, method: string, data?: any, isFormData = false) {
    const auth = getAuth();
    const token = auth?.access_token;
    if (!token) throw new Error("No auth token found");
    return apiRequest(url, method, data, isFormData, token);
}
