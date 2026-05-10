import { RequestParams } from "./request/types";

// lib/url.ts
export function withSearchParams(base: string, params: RequestParams): string 
{
    // Si params est undefined ou FormData, retourner l'URL de base
    if (!params || params instanceof FormData) {
        return base;
    }

    const u = new URL(
        base,
        typeof window !== "undefined" ? window.location.origin : "http://local"
    );
    // On nettoie d'abord
    u.search = "";
    const sp = u.searchParams;

    Object.entries(params).forEach(([k, v]) => {
        if (v === undefined || v === null || v === "") return;

        if (Array.isArray(v)) 
        {
            if (v.length === 0) return;
            // key[]=v1&key[]=v2
            v.forEach((item) => {
                if (item === undefined || item === null || item === "") return;
                sp.append(`${k}[]`, String(item));
            });
        } 
        else if (typeof v === "boolean") 
        {
            sp.set(k, v ? "1" : "0");
        } 
        else 
        {
            sp.set(k, String(v));
        }
    });

    return u.toString();
}