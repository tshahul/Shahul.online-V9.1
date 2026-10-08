'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { nav } from '@/lib/site';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  if (pathname.startsWith('/admin')) return null;
  return <header className="fixed top-0 z-50 w-full border-b border-cyan-400/10 bg-[#030711]/78 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
      <Link href="/" className="flex items-center gap-2 font-bold tracking-widest"><Terminal className="text-cyan-300" size={22}/><span>SHAHUL<span className="text-cyan-300">.ONLINE</span></span></Link>
      <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-300">{nav.map(([name, href]) => <Link key={href} href={href} className="transition hover:text-cyan-300">{name}</Link>)}</nav>
      <button className="lg:hidden" onClick={() => setOpen(value => !value)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <nav className="lg:hidden border-t border-cyan-400/10 px-5 py-5 grid gap-4 bg-[#030711]/95">{nav.map(([name, href]) => <Link onClick={() => setOpen(false)} key={href} href={href}>{name}</Link>)}</nav>}
  </header>;
}
