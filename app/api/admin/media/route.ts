import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { validToken } from '@/lib/auth';
import { db } from '@/lib/db';
async function auth(){return validToken((await cookies()).get('shahul_admin')?.value);}
export async function GET(){if(!(await auth()))return NextResponse.json({error:'Unauthorized'},{status:401});return NextResponse.json({data:await db.mediaAsset.findMany({orderBy:{createdAt:'desc'}})});}
export async function POST(req:NextRequest){if(!(await auth()))return NextResponse.json({error:'Unauthorized'},{status:401});const fd=await req.formData();const file=fd.get('file');if(!(file instanceof File))return NextResponse.json({error:'Image file required'},{status:400});if(!file.type.startsWith('image/'))return NextResponse.json({error:'Only image files are allowed'},{status:400});if(file.size>8*1024*1024)return NextResponse.json({error:'Maximum image size is 8MB'},{status:400});const ext=(file.name.split('.').pop()||'jpg').toLowerCase().replace(/[^a-z0-9]/g,'');const filename=`${Date.now()}-${randomUUID().slice(0,8)}.${ext}`;const dir=path.join(process.cwd(),'public','uploads');await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,filename),Buffer.from(await file.arrayBuffer()));const item=await db.mediaAsset.create({data:{filename,url:`/uploads/${filename}`,alt:file.name.replace(/\.[^.]+$/,''),mimeType:file.type,size:file.size}});return NextResponse.json({item},{status:201});}
export async function DELETE(req:NextRequest){if(!(await auth()))return NextResponse.json({error:'Unauthorized'},{status:401});const {id}=await req.json();const item=await db.mediaAsset.findUnique({where:{id:Number(id)}});if(!item)return NextResponse.json({error:'Not found'},{status:404});try{await fs.unlink(path.join(process.cwd(),'public',item.url.replace(/^\//,'')))}catch{}await db.mediaAsset.delete({where:{id:item.id}});return NextResponse.json({ok:true});}
