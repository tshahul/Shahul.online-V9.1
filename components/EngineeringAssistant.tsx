'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';

const knowledge = [
  { keys: ['network', 'cisco', 'routing', 'switching'], answer: 'Shahul focuses on enterprise networking, routing, switching, VLANs, VPN, SD-WAN and infrastructure design.' },
  { keys: ['security', 'cyber', 'firewall'], answer: 'The portfolio focuses on cybersecurity, firewall policy, segmentation, VPN, hardening and operational security.' },
  { keys: ['cloud', 'aws', 'azure'], answer: 'Cloud architecture coverage includes AWS, Azure, hybrid connectivity, identity and resilient infrastructure.' },
  { keys: ['automation', 'n8n', 'powershell'], answer: 'Automation work includes PowerShell, n8n and repeatable operational workflows.' },
  { keys: ['experience', 'years', 'career'], answer: 'The portfolio presents 12+ years of IT infrastructure and technical experience.' },
  { keys: ['certification', 'ccnp'], answer: 'The portfolio highlights CCNP Enterprise and cybersecurity / cloud learning.' },
];

function answerQuestion(question: string) {
  const normalized = question.toLowerCase();
  const match = knowledge.find(item => item.keys.some(key => normalized.includes(key)));
  return match?.answer ?? 'I can explain Shahul’s networking, cybersecurity, cloud, automation, certifications and engineering projects. Try asking about one of those areas.';
}

export function EngineeringAssistant() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hello. I am the Shahul.online Engineering Assistant. Ask me about infrastructure, cloud, cybersecurity, automation, projects or certifications.' }]);
  const suggestions = useMemo(() => ['What is Shahul’s networking experience?', 'What cloud technologies does he work with?', 'Tell me about cybersecurity expertise.'], []);

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = question.trim();
    if (!value) return;
    setMessages(current => [...current, { role: 'user', text: value }, { role: 'assistant', text: answerQuestion(value) }]);
    setQuestion('');
  }

  return <div className="glass rounded-3xl p-5 md:p-7">
    <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/5 text-cyan-300"><Bot size={21}/></div><div><div className="text-xs tracking-[.22em] text-cyan-300">AI ENGINEERING ASSISTANT</div><h2 className="mt-1 font-bold">Portfolio knowledge interface</h2></div></div>
    <div className="mt-6 max-h-[420px] space-y-3 overflow-y-auto pr-1">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`rounded-2xl border p-4 text-sm leading-6 ${message.role === 'user' ? 'ml-8 border-cyan-400/15 bg-cyan-400/5 text-cyan-50' : 'mr-8 border-white/5 bg-black/20 text-slate-300'}`}>{message.text}</div>)}</div>
    <div className="mt-5 flex flex-wrap gap-2">{suggestions.map(item => <button key={item} onClick={() => setQuestion(item)} className="rounded-full border border-cyan-400/10 px-3 py-2 text-xs text-slate-400 hover:border-cyan-400/30 hover:text-cyan-200">{item}</button>)}</div>
    <form onSubmit={submit} className="mt-4 flex gap-2"><input value={question} onChange={event => setQuestion(event.target.value)} placeholder="Ask an engineering question..." className="min-w-0 flex-1 rounded-xl border border-cyan-400/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"/><button aria-label="Send question" className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cyan-300 text-slate-950"><Send size={18}/></button></form>
    <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[.18em] text-slate-600"><Sparkles size={13}/> V9 local knowledge foundation — ready for API-backed AI</div>
  </div>;
}
