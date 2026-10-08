'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nav } from '@/lib/site';

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;
  return <footer className="mt-20 border-t border-cyan-400/10"><div className="mx-auto max-w-7xl px-5 py-12 grid md:grid-cols-3 gap-8"><div><div className="font-bold tracking-widest">SHAHUL<span className="text-cyan-300">.ONLINE</span></div><p className="mt-3 text-sm text-slate-400">IT Infrastructure • Cybersecurity • Cloud • Automation • AI</p></div><div><h3 className="font-semibold">Explore</h3><div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-400">{nav.slice(1).map(([name, href]) => <Link key={href} href={href} className="hover:text-cyan-300">{name}</Link>)}</div></div><div><h3 className="font-semibold">System Status</h3><p className="mt-3 text-sm text-cyan-300">● Portfolio Online</p><p className="text-xs text-slate-500 mt-2">© {new Date().getFullYear()} Shahul Hameed. All rights reserved.</p></div></div></footer>;
}
