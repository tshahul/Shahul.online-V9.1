import { getSeo } from '@/lib/seo';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BadgeCheck, Fingerprint, LockKeyhole, ShieldCheck } from 'lucide-react';

const records = [
  { code:'VER-001', title:'CCNP Enterprise', issuer:'Cisco', type:'Professional Certification', status:'VERIFIED', icon:<BadgeCheck size={22}/> },
  { code:'VER-002', title:'MSc Cyber Forensics & Information Security', issuer:'Madras University', type:'Postgraduate Education', status:'VERIFIED', icon:<Fingerprint size={22}/> },
  { code:'VER-003', title:'12+ Years IT Infrastructure Experience', issuer:'Professional Career Profile', type:'Experience Record', status:'ACTIVE', icon:<ShieldCheck size={22}/> },
  { code:'VER-004', title:'Senior Infrastructure Engineering', issuer:'Shahul.online', type:'Capability Profile', status:'ACTIVE', icon:<LockKeyhole size={22}/> },
];

export async function generateMetadata(): Promise<Metadata> { return getSeo('certifications', { title: 'Certifications | Shahul.online', description: 'Professional certifications, education and capability records.' }); }

export default function Certifications() {
  return <main className="holo-page relative min-h-screen overflow-hidden pt-28 pb-20"><div className="holo-bg-grid"/><div className="holo-scanline"/><section className="relative z-10 mx-auto max-w-7xl px-5"><div className="holo-header glass rounded-3xl p-7 md:p-10"><Link href="/" className="holo-back"><ArrowLeft size={16}/> CONTROL CENTER</Link><div className="holo-eyebrow mt-7">◉ SECURE IDENTITY MODULE / 04</div><h1 className="mt-3 text-5xl md:text-7xl font-black text-white">CERTIFICATIONS</h1><p className="mt-5 max-w-3xl text-slate-400 leading-7">A holographic credential matrix for professional certifications, education, experience and capability records.</p></div><div className="certifications-stage glass mt-7"><div className="verify-orbit"><div className="verify-ring v1"/><div className="verify-ring v2"/><div className="verify-ring v3"/><div className="verify-core"><Fingerprint size={44}/><strong>IDENTITY</strong><span>SECURE</span></div></div><div className="certifications-grid">{records.map(r=><article className="verify-card" key={r.code}><div className="flex items-center justify-between"><span className="holo-chip">{r.code}</span><span className="verify-check">✓ {r.status}</span></div><div className="verify-icon">{r.icon}</div><h2>{r.title}</h2><p>{r.issuer}</p><span>{r.type}</span></article>)}</div></div></section></main>;
}
