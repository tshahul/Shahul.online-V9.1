import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Cpu, Database, Network, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await db.project.findUnique({ where: { slug } });
  if (!p || !p.published) return notFound();

  return (
    <main className="holo-page relative min-h-screen overflow-hidden pt-28 pb-20">
      <div className="holo-bg-grid" aria-hidden="true" />
      <div className="holo-scanline" aria-hidden="true" />
      <section className="relative z-10 mx-auto max-w-7xl px-5">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/projects" className="holo-back"><ArrowLeft size={16} /> PROJECT MATRIX</Link>
          <span className="holo-status"><span /> SECURE MODULE</span>
        </div>

        <div className="holo-command glass">
          <div className="holo-command-title">PROJECT HOLOGRAM • {p.title.toUpperCase()}</div>
          <div className="holo-orbit-stage">
            <div className="holo-ring ring-a" /><div className="holo-ring ring-b" /><div className="holo-ring ring-c" />
            <div className="holo-orbit-dot dot-a" /><div className="holo-orbit-dot dot-b" />
            <div className="holo-core">
              <div className="holo-core-grid" />
              <Cpu size={42} />
              <strong>{p.title.split(' ')[0].toUpperCase()}</strong>
              <span>PROJECT ONLINE</span>
            </div>
          </div>

          <div className="holo-panel panel-left"><div className="panel-title"><Network size={14}/> NETWORK</div><b>SECURE</b><span>LAN / WAN / VPN</span><span>MONITORING ACTIVE</span></div>
          <div className="holo-panel panel-right"><div className="panel-title"><ShieldCheck size={14}/> SECURITY</div><b>VERIFIED</b><span>ACCESS CONTROL</span><span>THREAT LEVEL: LOW</span></div>
          <div className="holo-panel panel-bottom-left"><div className="panel-title"><Database size={14}/> DATA</div><b>SYNC OK</b><span>API / DB / CACHE</span></div>
          <div className="holo-panel panel-bottom-right"><div className="panel-title"><Cpu size={14}/> AUTOMATION</div><b>READY</b><span>WORKFLOWS ONLINE</span></div>

          <div className="holo-project-info">
            <div className="text-xs tracking-[.3em] text-cyan-300">MODULE DESCRIPTION</div>
            <h1>{p.title}</h1>
            <p>{p.excerpt}</p>
            <div className="holo-detail">{p.content}</div>

            <div className="mt-5 flex flex-wrap gap-2">{p.technologies.split(',').map(t => <span className="holo-tech" key={t}>{t.trim()}</span>)}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
