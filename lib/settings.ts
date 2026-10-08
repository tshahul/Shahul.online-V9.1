import { db } from '@/lib/db';
export async function getSettings(){
  const rows=await db.setting.findMany();
  return Object.fromEntries(rows.map((r: { key: string; value: string })=>[r.key,r.value]));
}
