'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const steps = [
  'Initializing Shahul.online...',
  'Loading network infrastructure...',
  'Loading cybersecurity modules...',
  'Loading cloud systems...',
  'Loading automation engine...',
  'Establishing secure connection...',
];

export function BootLoader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (pathname.startsWith('/admin')) {
      setVisible(false);
      return;
    }
    const start = performance.now();
    const duration = 2600;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);
      setStep(Math.min(steps.length - 1, Math.floor(next / 18)));

      if (next < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setVisible(false), 650);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!visible || pathname.startsWith('/admin')) return null;

  return (
    <div className="boot-loader" role="status" aria-live="polite" aria-label="Loading Shahul.online">
      <div className="boot-grid" />
      <div className="boot-scanline" />
      <div className="boot-content">
        <div className="boot-brand">
          <span className="boot-prompt">&gt;_</span>
          <span>SHAHUL<span>.ONLINE</span></span>
        </div>

        <div className="boot-terminal">
          <div className="boot-terminal-head">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
            <span className="boot-terminal-title">secure_boot.exe</span>
          </div>

          <div className="boot-lines">
            {steps.map((message, index) => (
              <div key={message} className={index <= step ? 'boot-line active' : 'boot-line'}>
                <span className="boot-check">{index < step ? '✓' : index === step ? '›' : '·'}</span>
                {message}
              </div>
            ))}
          </div>

          <div className="boot-progress-row">
            <span>BOOT SEQUENCE</span>
            <strong>{progress}%</strong>
          </div>
          <div className="boot-progress-track">
            <div className="boot-progress-bar" style={{ width: `${progress}%` }} />
          </div>

          <div className={`boot-online ${progress === 100 ? 'ready' : ''}`}>
            <span className="boot-online-dot" />
            {progress === 100 ? 'SYSTEM ONLINE' : 'SECURE SYSTEM INITIALIZING'}
          </div>
        </div>

        <div className="boot-footer">Infrastructure • Cybersecurity • Cloud • Automation • AI</div>
      </div>
    </div>
  );
}
