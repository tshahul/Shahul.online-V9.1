'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone, Linkedin, Router, ShieldCheck, Server, Network, Send, CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/PageHero';

const nodes = [
  { label: 'EDGE ROUTER', icon: Router, className: 'node-router' },
  { label: 'FIREWALL', icon: ShieldCheck, className: 'node-firewall' },
  { label: 'CORE SWITCH', icon: Network, className: 'node-switch' },
  { label: 'SERVER', icon: Server, className: 'node-server' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (r.ok) {
        setSent(true);
        form.reset();
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageHero eyebrow="Connect / 07" title="Contact" description="For opportunities, technical discussions, collaborations or infrastructure project enquiries." />

      <main className="contact-page cyber-bg">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-20 lg:grid-cols-[1.05fr_.95fr]">
          <div className="contact-network glass rounded-3xl p-6 md:p-8">
            <div className="contact-section-label"><span className="status-dot" /> NETWORK CHANNEL</div>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">Connect with an <span className="gradient-text">Infrastructure Engineer</span></h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">A professional communication channel for enterprise networking, infrastructure, cloud, security and technical opportunities.</p>

            <div className="network-canvas" aria-label="Animated enterprise network topology">
              <div className="network-lines" aria-hidden="true">
                <span className="network-link link-1" /><span className="network-link link-2" /><span className="network-link link-3" />
                <i className="packet packet-1" /><i className="packet packet-2" /><i className="packet packet-3" />
              </div>
              <div className="network-nodes">
                {nodes.map(({ label, icon: Icon, className }) => (
                  <div className={`network-node ${className}`} key={label}>
                    <div className="network-node-icon"><Icon size={21} /></div>
                    <span>{label}</span>
                    <small>ONLINE</small>
                  </div>
                ))}
              </div>
              <div className="network-core"><span>SECURE</span><strong>NETWORK</strong><small>SHAHUL.ONLINE</small></div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="contact-mini"><Network size={16} /><span>Networking</span></div>
              <div className="contact-mini"><Server size={16} /><span>Infrastructure</span></div>
              <div className="contact-mini"><ShieldCheck size={16} /><span>Security</span></div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 md:p-8">
            <div className="contact-section-label"><span className="status-dot" /> SECURE MESSAGE</div>
            <h2 className="mt-3 text-2xl font-bold">Start a conversation</h2>
            <form onSubmit={submit} className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="name" required placeholder="Full Name" className="contact-input" />
                <input name="email" type="email" required placeholder="Email Address" className="contact-input" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="phone" placeholder="Phone (optional)" className="contact-input" />
                <input name="subject" placeholder="Subject" className="contact-input" />
              </div>
              <textarea name="message" required placeholder="Tell me about your requirement..." rows={7} className="contact-input resize-none" />
              <button disabled={sending} className="contact-send"><Send size={17} /> {sending ? 'Sending...' : 'Send Message'}</button>
              {sent && <div className="contact-success"><CheckCircle2 size={18} /><span>Message received. Thank you — I will get back to you.</span></div>}
            </form>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-3 px-5 pb-24 sm:grid-cols-2 lg:grid-cols-4">
          <a className="contact-detail glass" href="mailto:contact@shahul.online"><Mail size={19} /><span><small>EMAIL</small>contact@shahul.online</span></a>
          <a className="contact-detail glass" href="tel:+918883333220"><Phone size={19} /><span><small>PHONE</small>+91 88833 33220</span></a>
          <div className="contact-detail glass"><MapPin size={19} /><span><small>LOCATION</small>India / UAE</span></div>
          <a className="contact-detail glass" href="https://www.linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={19} /><span><small>PROFESSIONAL</small>LinkedIn</span></a>
        </section>
      </main>
    </>
  );
}
