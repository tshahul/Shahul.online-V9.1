import { getSeo } from '@/lib/seo';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import Link from 'next/link';
import { ArrowUpRight, Cpu, Network, ShieldCheck, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

function ModuleIcon({ category }: { category: string }) {
  if (category.toLowerCase().includes('security')) return <ShieldCheck size={24} />;
  if (category.toLowerCase().includes('network')) return <Network size={24} />;
  if (category.toLowerCase().includes('ai')) return <Sparkles size={24} />;
  return <Cpu size={24} />;
}

export async function generateMetadata(): Promise<Metadata> { return getSeo('projects', { title: 'Projects | Shahul.online', description: 'Infrastructure, cybersecurity, automation, IoT and AI engineering projects.' }); }

export default async function Projects() {
  const projects = await db.project.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } });

  return (
    <main className="holo-page relative min-h-screen overflow-hidden pt-28 pb-20">
      <div className="holo-bg-grid" aria-hidden="true" />
      <div className="holo-scanline" aria-hidden="true" />
      <section className="relative z-10 mx-auto max-w-7xl px-5">
        <div className="holo-header glass rounded-3xl p-7 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <div className="holo-eyebrow">◈ HOLOGRAPHIC MODULE / 03</div>
              <h1 className="mt-3 text-5xl md:text-7xl font-black tracking-tight text-white">PROJECT MATRIX</h1>
              <p className="mt-5 max-w-3xl text-slate-400 leading-7">Select a project module. The interface expands into a full holographic control view with live-style telemetry, system rings and technology layers.</p>
            </div>
            <div className="holo-status"><span /> PROJECT SYSTEM ONLINE</div>
          </div>
        </div>

        <div className="mt-7 grid md:grid-cols-2 gap-6">
          {projects.map((p, index) => (
            <Link key={p.id} href={`/projects/${p.slug}`} className="holo-project-card glass group" style={{ animationDelay: `${index * 90}ms` }}>
              <div className="holo-card-corner" />
              <div className="flex items-start justify-between gap-5">
                <div className="holo-icon">{ModuleIcon({ category: p.title })}</div>
                <span className="holo-chip">MODULE {String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="mt-7 text-xs uppercase tracking-[.24em] text-cyan-300">{p.title}</div>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-200 transition">{p.excerpt}</h2>
              <div className="mt-6 grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-500">
                <span>STATUS: ACTIVE</span><span>SECURE: OK</span><span>AI: READY</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">{p.technologies.split(',').map(t => <span key={t} className="holo-tech">{t.trim()}</span>)}</div>
              <div className="mt-7 flex items-center justify-between text-cyan-300 text-sm"><span>OPEN HOLOGRAM</span><ArrowUpRight size={17} /></div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
