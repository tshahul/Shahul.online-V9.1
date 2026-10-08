import { EngineeringAssistant } from '@/components/EngineeringAssistant';

export const metadata = { title: 'Engineering Assistant | Shahul.online', description: 'AI-ready engineering portfolio assistant.' };

export default function AssistantPage() {
  return <main className="min-h-screen px-5 pb-24 pt-32"><div className="mx-auto max-w-4xl"><div className="holo-header rounded-3xl p-7 md:p-10"><div className="holo-eyebrow">AI INTERFACE / V9</div><h1 className="mt-4 text-4xl font-black md:text-6xl">Engineering Assistant</h1><p className="mt-4 max-w-3xl text-slate-400 leading-7">Ask about Shahul’s engineering capabilities. This V9 foundation uses local portfolio knowledge and is structured to accept a secure AI API later.</p></div><div className="mt-8"><EngineeringAssistant /></div></div></main>;
}
