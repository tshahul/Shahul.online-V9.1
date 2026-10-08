import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validToken } from '@/lib/auth';
import { db } from '@/lib/db';
async function auth(){return validToken((await cookies()).get('shahul_admin')?.value)}
export async function GET(){if(!(await auth()))return NextResponse.json({error:'Unauthorized'},{status:401});return NextResponse.json({data:await db.setting.findMany({orderBy:{key:'asc'}})});}
export async function PUT(req:NextRequest){if(!(await auth()))return NextResponse.json({error:'Unauthorized'},{status:401});const body=await req.json();if(!body.key)return NextResponse.json({error:'Key required'},{status:400});const item=await db.setting.upsert({where:{key:String(body.key)},update:{value:String(body.value??'')},create:{key:String(body.key),value:String(body.value??'')}});return NextResponse.json({item});}
export async function DELETE(req:NextRequest){if(!(await auth()))return NextResponse.json({error:'Unauthorized'},{status:401});const {key}=await req.json();if(!key)return NextResponse.json({error:'Key required'},{status:400});await db.setting.delete({where:{key}});return NextResponse.json({ok:true});}
