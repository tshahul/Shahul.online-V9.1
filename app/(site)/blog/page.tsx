import { getSeo } from '@/lib/seo';
import type { Metadata } from 'next';
import {PageHero} from '@/components/PageHero'; import {db} from '@/lib/db'; import Link from 'next/link';
export const dynamic='force-dynamic';
export async function generateMetadata(): Promise<Metadata> { return getSeo('blog', { title: 'Blog | Shahul.online', description: 'Technical writing on infrastructure, networking, cybersecurity, cloud and automation.' }); }

export default async function Blog(){const posts=await db.blogPost.findMany({where:{published:true},orderBy:{createdAt:'desc'}});return <><PageHero eyebrow="Knowledge Base / 05" title="Blog" description="Technical writing on infrastructure, cybersecurity, cloud, automation and AI."/><main className="mx-auto max-w-7xl px-5 pb-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">{posts.map(p=><Link href={'/blog/'+p.slug} key={p.id} className="glass grid-card rounded-2xl p-7"><span className="text-xs text-cyan-300">{p.category}</span><h2 className="mt-3 text-xl font-bold">{p.title}</h2><p className="mt-3 text-sm text-slate-400 leading-6">{p.excerpt}</p><div className="mt-6 text-xs text-slate-500">Read article →</div></Link>)}</main></>}
