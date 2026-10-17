import { useSession, setResponseHeader } from '@tanstack/react-start/server';
export async function gateSession() {
 const password=process.env['SESSION_SECRET'];
 if(!password) throw new Error('Administration indisponible');
 setResponseHeader('Cache-Control','no-store');
 return useSession<{admin?:boolean}>({password,name:'frigiere-admin',maxAge:60*60*8,cookie:{httpOnly:true,secure:true,sameSite:'lax',path:'/'}});
}
export async function requireAdmin() { const s=await gateSession(); if(!s.data.admin) throw new Error('Accès refusé'); }
