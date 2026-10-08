import {db} from '@/lib/db'; import {z} from 'zod';
const schema=z.object({name:z.string().min(2),email:z.string().email(),phone:z.string().optional(),subject:z.string().optional(),message:z.string().min(3)});
export async function POST(req:Request){const parsed=schema.safeParse(await req.json());if(!parsed.success)return Response.json({error:'Invalid input'},{status:400});await db.contactMessage.create({data:parsed.data});return Response.json({ok:true})}
