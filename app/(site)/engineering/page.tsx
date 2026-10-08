import Link from 'next/link';
import { ArrowUpRight, Bot, Code2, Database, Gauge, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const tracks: Array<[string, string, LucideIcon]> = [
  ['Infrastructure', 'Architecture, operations, resilience and enterprise support.', Gauge],
  ['Security', 'Security-first design, network segmentation and operational hardening.', ShieldCheck],
  ['Automation', 'Repeatable workflows with PowerShell, n8n and intelligent tooling.', Code2],
  ['AI Engineering', 'A practical foundation for AI-assisted engineering and knowledge retrieval.', Bot],
  ['Data & Platforms', 'Reliable application platforms, databases and observability.', Database],
];

export default function EngineeringPage() {
  return <main className="min-h-screen px-5 pb-24 pt-32"><div className="mx-auto max-w-7xl">
    <div className="holo-header rounded-3xl p-7 md:p-10"><div className="holo-eyebrow">ENGINEERING COMMAND CENTER / V9</div><h1 className="mt-4 text-4xl font-black md:text-6xl">Build. Secure. Automate.</h1><p className="mt-4 max-w-3xl text-slate-400 leading-7">A technical map of the disciplines behind Shahul.online — designed to make engineering capability visible, not just listed on a CV.</p></div>
    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{tracks.map(([title, description, Icon]) => {const I = Icon; return <article key={String(title)} className="glass rounded-2xl p-6 grid-card"><I className="text-cyan-300"/><h2 className="mt-5 text-xl font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p></article>})}</div>
    <div className="mt-8 glass rounded-3xl p-7 md:p-10"><div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><div className="text-xs tracking-[.25em] text-cyan-300">NEXT-GENERATION PORTFOLIO</div><h2 className="mt-2 text-2xl font-bold">Explore the interactive lab</h2><p className="mt-2 text-slate-500">Walk through a reference enterprise architecture and inspect each layer.</p></div><Link href="/labs" className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 font-bold text-slate-950">Open Lab <ArrowUpRight size={17}/></Link></div></div>
  </div></main>;
}
