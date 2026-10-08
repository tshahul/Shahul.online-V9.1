import { Metadata } from 'next';
import { db } from '@/lib/db';
export async function getSeo(pageKey:string,fallback:Metadata):Promise<Metadata>{const row=await db.seoPage.findUnique({where:{pageKey}});return row?{title:row.title,description:row.description,keywords:row.keywords?.split(',').map((x: string) => x.trim()),alternates:row.canonical?{canonical:row.canonical}:undefined,openGraph:row.ogImage?{images:[row.ogImage]}:undefined}:fallback;}
