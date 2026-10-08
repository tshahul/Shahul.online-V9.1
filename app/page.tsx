import Link from 'next/link';
import { db } from '@/lib/db';
import { getSettings } from '@/lib/settings';
import {
  ArrowUpRight,
  ShieldCheck,
  Cloud,
  Network,
  BrainCircuit,
} from 'lucide-react';

const fallbackCapabilities = [
  { name: 'Network Infrastructure', icon: Network },
  { name: 'Cybersecurity', icon: ShieldCheck },
  { name: 'Cloud Architecture', icon: Cloud },
  { name: 'AI & Automation', icon: BrainCircuit },
];

export default async function Home() {
  const settings=await getSettings();
  const [skills,services,sections,featuredProjects]=await Promise.all([db.skill.findMany({orderBy:{sortOrder:'asc'},take:6}),db.service.findMany({where:{published:true},orderBy:{sortOrder:'asc'},take:4}),db.homepageSection.findMany({where:{published:true},orderBy:{sortOrder:'asc'}}),db.project.findMany({where:{published:true,featured:true},orderBy:{updatedAt:'desc'},take:3})]);
  return (
    <main>
      <section className="relative min-h-screen flex items-center overflow-hidden pt-28 hero-photo-section">
        <div className="hero-photo-bg" aria-hidden="true" />
        <div className="hero-photo-overlay" aria-hidden="true" />
        <div className="hero-photo-grid" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 w-full grid lg:grid-cols-[1.15fr_.85fr] gap-12 items-center">
          <div className="hero-enter">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs text-cyan-300">
              <span className="terminal-dot bg-cyan-300 pulse" />
              {settings.hero_badge || 'SYSTEM ONLINE • OPEN TO OPPORTUNITIES'}
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[.95]">
              {(settings.hero_title || 'Building secure digital infrastructure.').split(' ').map((word,i)=><span key={i} className={i===1?'gradient-text':''}>{word} </span>)}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
              {settings.hero_description || "I’m Shahul Hameed — an IT Infrastructure and Cybersecurity professional focused on enterprise networking, cloud, automation and future technology."}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/cv"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-200 hover:-translate-y-0.5"
              >
                Explore My CV <ArrowUpRight size={18} />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 px-6 py-3 text-cyan-200 transition hover:bg-cyan-400/10 hover:-translate-y-0.5"
              >
                View Projects
              </Link>
            </div>
          </div>

          <div className="glass scan rounded-3xl p-6 glow hero-card-enter">
            <div className="flex gap-2 mb-6">
              <i className="terminal-dot red" />
              <i className="terminal-dot yellow" />
              <i className="terminal-dot green" />
            </div>

            <div className="font-mono text-sm leading-8 text-slate-300">
              <p><span className="text-cyan-300">$</span> whoami</p>
              <p className="text-white">shahul@online:~$ Senior Infrastructure Engineer</p>
              <p><span className="text-cyan-300">$</span> skills --active</p>
              <p className="text-cyan-200">{skills.length?skills.map(s=>s.name).join(" · "):"Cisco · Cloud · Security · Windows · Automation · AI"}</p>
              <p><span className="text-cyan-300">$</span> mission</p>
              <p>{settings.hero_mission || 'Design secure systems. Automate operations. Build what’s next.'}</p>
              <p className="text-cyan-300 cursor-blink">▮</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-cyan-400/10 p-4 stat-card">
                <div className="text-2xl font-bold">{settings.experience_years || '12+'}</div>
                <div className="text-xs text-slate-500">Years Experience</div>
              </div>
              <div className="rounded-xl border border-cyan-400/10 p-4 stat-card">
                <div className="text-2xl font-bold">{settings.primary_cert || 'CCNP'}</div>
                <div className="text-xs text-slate-500">Enterprise</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="grid md:grid-cols-4 gap-5">
          {(services.length?services.map(s=>({name:s.title,description:s.description,icon:s.icon})):fallbackCapabilities.map(s=>({name:s.name,description:'Engineering reliable, secure and scalable technology.',icon:null}))).map(({ name, description, icon }, index) => { const Icon = icon==='network'?Network:icon==='shield'?ShieldCheck:icon==='cloud'?Cloud:icon==='workflow'?BrainCircuit:fallbackCapabilities[index]?.icon||BrainCircuit; return (
            <div
              key={name}
              className="glass grid-card rounded-2xl p-6 capability-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Icon className="text-cyan-300" />
              <h3 className="mt-5 font-semibold">{name}</h3>
              <p className="mt-2 text-sm text-slate-500">{description || 'Engineering reliable, secure and scalable technology.'}</p>
            </div>
          ); })}
        </div>
      </section>

      {sections.filter(s=>s.sectionKey!=='contact-cta').map(section=><section key={section.id} className="mx-auto max-w-7xl px-5 py-12"><div className="glass rounded-3xl p-8 md:p-12"><div className="text-cyan-300 text-xs tracking-[.28em]">{section.eyebrow}</div><h2 className="mt-2 text-3xl md:text-4xl font-bold">{section.title}</h2>{section.subtitle&&<p className="mt-3 text-cyan-100">{section.subtitle}</p>}<p className="mt-4 max-w-3xl text-slate-400 leading-7 whitespace-pre-line">{section.content}</p></div></section>)}

      {featuredProjects.length>0&&<section className="mx-auto max-w-7xl px-5 py-12"><div className="flex items-end justify-between gap-4"><div><div className="text-cyan-300 text-xs tracking-[.28em]">FEATURED ENGINEERING</div><h2 className="mt-2 text-3xl md:text-4xl font-bold">Selected case studies</h2></div><Link href="/projects" className="text-cyan-300 text-sm">View all →</Link></div><div className="mt-7 grid md:grid-cols-3 gap-5">{featuredProjects.map(p=><Link href={`/projects/${p.slug}`} key={p.id} className="glass rounded-2xl p-6 grid-card"><div className="text-xs text-cyan-300">ENGINEERING PROJECT</div><h3 className="mt-3 text-xl font-bold">{p.title}</h3><p className="mt-2 text-sm text-slate-400 line-clamp-3">{p.excerpt}</p><div className="mt-4 text-xs text-slate-500">{p.technologies}</div></Link>)}</div></section>}

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="glass rounded-3xl p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="text-cyan-300 text-sm">NEXT MISSION</div>
            <h2 className="mt-2 text-3xl font-bold">{sections.find(s=>s.sectionKey==='contact-cta')?.title || 'Have a technology challenge?'}</h2>
            <p className="mt-2 text-slate-400">
              {sections.find(s=>s.sectionKey==='contact-cta')?.content || 'Let’s discuss infrastructure, cybersecurity, automation or a new digital product.'}
            </p>
          </div>
          <Link
            href="/quote"
            className="shrink-0 rounded-lg bg-white px-6 py-3 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-100"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
