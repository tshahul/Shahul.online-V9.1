'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockKeyhole, Terminal, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Login() {
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError(false);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (response.ok) router.push('/admin/dashboard'); else setError(true);
    setBusy(false);
  }

  return <main className="admin-login-page">
    <div className="admin-login-grid" />
    <div className="admin-login-glow" />
    <section className="admin-login-card">
      <div className="admin-login-top"><div className="admin-login-logo"><Terminal size={21} /></div><div><div className="admin-kicker">SHAHUL.ONLINE / V7</div><strong>SECURE CONTROL CENTER</strong></div><div className="admin-login-status"><span /> SECURE</div></div>
      <div className="admin-login-heading"><LockKeyhole size={28} /><div><h1>Administrator Access</h1><p>Sign in to manage your professional engineering portfolio.</p></div></div>
      <form onSubmit={submit} className="admin-login-form">
        <label>Email address<input name="email" type="email" required autoComplete="username" placeholder="admin@shahul.online" /></label>
        <label>Password<input name="password" type="password" required autoComplete="current-password" placeholder="Enter secure password" /></label>
        {error && <div className="admin-login-error"><ShieldCheck size={15} /> Invalid credentials. Check your ADMIN_EMAIL and ADMIN_PASSWORD.</div>}
        <button disabled={busy}>{busy ? 'Authenticating...' : 'Enter Control Center'}<ArrowRight size={17} /></button>
      </form>
      <div className="admin-login-foot"><span>AUTHENTICATED SESSION</span><span>HTTPS / HTTPOnly COOKIE</span></div>
    </section>
  </main>;
}
