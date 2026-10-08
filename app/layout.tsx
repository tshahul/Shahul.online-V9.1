import './globals.css';
import { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BootLoader } from '@/components/BootLoader';
import { db } from '@/lib/db';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await db.seoPage.findUnique({ where: { pageKey: 'home' } });
  return { title: seo?.title || 'Shahul Hameed | Senior Infrastructure Engineer', description: seo?.description || 'Professional portfolio of Shahul Hameed — IT Infrastructure, Networking, Cybersecurity, Cloud, Automation and AI.', keywords: seo?.keywords?.split(',').map((x: string) => x.trim()) };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="cyber-bg">
        <BootLoader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
