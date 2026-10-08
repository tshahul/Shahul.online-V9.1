import { InfrastructureLab } from '@/components/InfrastructureLab';
import { ShieldCheck, Cloud, Network } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const metadata = {
  title: 'Infrastructure Lab | Shahul.online',
  description: 'Interactive infrastructure, cloud and cybersecurity architecture lab.',
};

export default function LabsPage() {
  return (
    <main className="min-h-screen px-5 pb-24 pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="holo-header rounded-3xl p-7 md:p-10">
          <div className="holo-eyebrow">ENGINEERING LAB / V9</div>
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-black md:text-6xl">Infrastructure Lab</h1>
              <p className="mt-4 max-w-3xl text-slate-400 leading-7">A visual demonstration of how enterprise networking, security, compute, cloud and data layers connect into one resilient platform.</p>
            </div>
            <div className="holo-status"><span /> ARCHITECTURE ONLINE</div>
          </div>
        </div>
        <div className="mt-8"><InfrastructureLab /></div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {([['Network', Network, 'Cisco, routing, switching, VLAN, VPN and SD-WAN.'], ['Security', ShieldCheck, 'Firewall policy, segmentation, hardening and monitoring.'], ['Cloud', Cloud, 'AWS, Azure and hybrid infrastructure architecture.']] as Array<[string, LucideIcon, string]>).map(([title, Icon, text]) => {
            const ItemIcon = Icon;
            return <div key={String(title)} className="glass rounded-2xl p-6"><ItemIcon className="text-cyan-300" /><h2 className="mt-4 font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>;
          })}
        </div>
      </div>
    </main>
  );
}
