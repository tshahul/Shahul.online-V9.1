'use client';

import { useMemo, useState } from 'react';
import { Cloud, Database, Globe2, Network, Router, Server, ShieldCheck, Workflow } from 'lucide-react';

const nodes = [
  { id: 'internet', label: 'Internet', type: 'Edge', icon: Globe2, detail: 'WAN ingress, DNS, public services and remote access.' },
  { id: 'firewall', label: 'Firewall', type: 'Security', icon: ShieldCheck, detail: 'Segmentation, VPN, policy enforcement and threat protection.' },
  { id: 'core', label: 'Core Network', type: 'Network', icon: Router, detail: 'Routing, switching, VLANs, QoS and resilient campus connectivity.' },
  { id: 'servers', label: 'Server Zone', type: 'Compute', icon: Server, detail: 'Windows/Linux workloads, virtualization, backup and monitoring.' },
  { id: 'cloud', label: 'Cloud', type: 'Cloud', icon: Cloud, detail: 'AWS/Azure workloads, identity, networking and hybrid connectivity.' },
  { id: 'data', label: 'Data', type: 'Platform', icon: Database, detail: 'Application data, logs, backups and operational records.' },
];

const domains = [
  ['Network Engineering', 'Routing, switching, VLAN, VPN, SD-WAN and enterprise topology.'],
  ['Cloud Architecture', 'AWS, Azure, hybrid networking, identity and resilient services.'],
  ['Cyber Security', 'Firewalls, segmentation, hardening, monitoring and incident readiness.'],
  ['Automation', 'PowerShell, n8n and repeatable operational workflows.'],
];

export function InfrastructureLab() {
  const [selected, setSelected] = useState(nodes[0].id);
  const active = useMemo(() => nodes.find(node => node.id === selected) ?? nodes[0], [selected]);

  return (
    <div className="space-y-8">
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {nodes.map(node => {
          const Icon = node.icon;
          const isActive = node.id === selected;
          return (
            <button key={node.id} onClick={() => setSelected(node.id)} className={`lab-node ${isActive ? 'lab-node-active' : ''}`}>
              <Icon size={22} />
              <span>{node.label}</span>
              <small>{node.type}</small>
            </button>
          );
        })}
      </div>

      <div className="lab-architecture glass rounded-3xl p-5 md:p-8">
        <div className="lab-flow" aria-label="Interactive infrastructure architecture">
          {nodes.map((node, index) => (
            <div key={node.id} className="contents">
              <button onClick={() => setSelected(node.id)} className={`lab-arch-node ${node.id === selected ? 'lab-arch-node-active' : ''}`}>
                <node.icon size={20} />
                <span>{node.label}</span>
              </button>
              {index < nodes.length - 1 && <Workflow className="lab-arrow" size={20} />}
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-2xl border border-cyan-400/10 bg-black/20 p-5">
          <div className="text-[10px] tracking-[.25em] text-cyan-300">SELECTED COMPONENT</div>
          <h3 className="mt-2 text-xl font-bold">{active.label}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">{active.detail}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {domains.map(([title, description]) => (
          <div key={title} className="glass rounded-2xl p-5 grid-card">
            <div className="text-xs font-semibold tracking-[.18em] text-cyan-300">ENGINEERING DOMAIN</div>
            <h3 className="mt-3 font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
