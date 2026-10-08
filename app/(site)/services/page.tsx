import { getSeo } from '@/lib/seo';
import type { Metadata } from 'next';
import {PageHero} from '@/components/PageHero'; import {CloudCog,Network,Shield,Workflow} from 'lucide-react'; import {db} from '@/lib/db';
export const dynamic='force-dynamic';
const icons:any={network:Network,shield:Shield,cloud:CloudCog,workflow:Workflow};
export async function generateMetadata(): Promise<Metadata> { return getSeo('services', { title: 'Services | Shahul.online', description: 'IT infrastructure, cybersecurity, cloud and automation services.' }); }

export default async function Services(){const s=await db.service.findMany({where:{published:true},orderBy:{sortOrder:'asc'}});return <><PageHero eyebrow="Capabilities / 06" title="Services" description="Technical capabilities that turn infrastructure and operational requirements into reliable systems."/><main className="mx-auto max-w-7xl px-5 pb-20 grid md:grid-cols-2 gap-6">{s.map(x=>{const Icon=icons[x.icon||'network']||Network;return <div key={x.id} className="glass grid-card rounded-2xl p-8"><Icon className="text-cyan-300"/><h2 className="mt-5 text-2xl font-bold">{x.title}</h2><p className="mt-3 text-slate-400 leading-7">{x.description}</p></div>})}</main></>}
