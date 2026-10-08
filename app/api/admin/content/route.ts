import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validToken } from '@/lib/auth';
import { db } from '@/lib/db';

const resources = new Set(['project','blogPost','experience','skill','certification','service','innovationItem','contactMessage','quoteRequest','homepageSection','seoPage']);
const editable = new Set(['project','blogPost','experience','skill','certification','service','innovationItem','homepageSection','seoPage']);
async function auth(){ return validToken((await cookies()).get('shahul_admin')?.value); }
function clean(resource:string, data:any){
  const d={...data}; delete d.id; delete d.createdAt; delete d.updatedAt;
  if(resource==='skill') d.level=Number(d.level ?? 80);
  if(['experience','skill','certification','service','innovationItem','homepageSection'].includes(resource)) d.sortOrder=Number(d.sortOrder ?? 0);
  if(['project','blogPost','service','innovationItem','homepageSection'].includes(resource)) d.published=d.published!==false && d.published!=='false';
  if(resource==='project') d.featured=d.featured===true || d.featured==='true';
  return d;
}
export async function GET(req:NextRequest){
  if(!(await auth())) return NextResponse.json({error:'Unauthorized'},{status:401});
  const resource=req.nextUrl.searchParams.get('resource')||'';
  if(!resources.has(resource)) return NextResponse.json({error:'Invalid resource'},{status:400});
  const model=(db as any)[resource];
  const orderBy=['contactMessage','quoteRequest','project','blogPost'].includes(resource)?{createdAt:'desc'}:resource==='seoPage'?{updatedAt:'desc'}:{sortOrder:'asc'};
  const data=await model.findMany({orderBy});
  return NextResponse.json({data});
}
export async function POST(req:NextRequest){
  if(!(await auth())) return NextResponse.json({error:'Unauthorized'},{status:401});
  const body=await req.json(); const resource=body.resource;
  if(!editable.has(resource)) return NextResponse.json({error:'Create not allowed'},{status:400});
  try { const item=await (db as any)[resource].create({data:clean(resource,body.data||{})}); return NextResponse.json({item},{status:201}); }
  catch(e:any){ return NextResponse.json({error:e?.message||'Create failed'},{status:400}); }
}
export async function PATCH(req:NextRequest){
  if(!(await auth())) return NextResponse.json({error:'Unauthorized'},{status:401});
  const body=await req.json(); const resource=body.resource; const id=Number(body.id);
  if(!resources.has(resource)||!id) return NextResponse.json({error:'Invalid request'},{status:400});
  try { const item=await (db as any)[resource].update({where:{id},data:clean(resource,body.data||{})}); return NextResponse.json({item}); }
  catch(e:any){ return NextResponse.json({error:e?.message||'Update failed'},{status:400}); }
}
export async function DELETE(req:NextRequest){
  if(!(await auth())) return NextResponse.json({error:'Unauthorized'},{status:401});
  const body=await req.json(); const resource=body.resource; const id=Number(body.id);
  if(!resources.has(resource)||!id) return NextResponse.json({error:'Invalid request'},{status:400});
  try { await (db as any)[resource].delete({where:{id}}); return NextResponse.json({ok:true}); }
  catch(e:any){ return NextResponse.json({error:e?.message||'Delete failed'},{status:400}); }
}
