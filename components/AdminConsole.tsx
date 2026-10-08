'use client';

import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import Link from 'next/link';
import {
  Award,
  BarChart3,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Inbox,
  Layers3,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Menu,
  Plus,
  Quote,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  UserRound,
  Wrench,
  X,
} from 'lucide-react';

type Resource =
  | 'project' | 'blogPost' | 'experience' | 'skill' | 'certification' | 'service'
  | 'innovationItem' | 'homepageSection' | 'seoPage' | 'contactMessage' | 'quoteRequest';

type Field = { key: string; label: string; type?: 'text' | 'number' | 'textarea' | 'checkbox'; hint?: string };
type RecordValue = Record<string, unknown> & { id?: number };
type Setting = { key: string; value: string };
type MediaItem = { id: number; filename: string; url: string; alt?: string | null; mimeType: string; size: number };

type Stats = Record<string, number>;

const labels: Record<Resource, string> = {
  project: 'Projects', blogPost: 'Blog Posts', experience: 'Experience', skill: 'Skills',
  certification: 'Certifications', service: 'Services', innovationItem: 'Innovation',
  homepageSection: 'Homepage Sections', seoPage: 'SEO Manager', contactMessage: 'Messages', quoteRequest: 'Quote Requests',
};

const groups: Array<{ title: string; items: Resource[] }> = [
  { title: 'Portfolio', items: ['project', 'experience', 'skill', 'certification'] },
  { title: 'Content', items: ['blogPost', 'service', 'innovationItem', 'homepageSection'] },
  { title: 'Operations', items: ['seoPage', 'contactMessage', 'quoteRequest'] },
];

const iconMap: Record<Resource, typeof BriefcaseBusiness> = {
  project: BriefcaseBusiness, blogPost: FileText, experience: UserRound, skill: Wrench,
  certification: Award, service: ShieldCheck, innovationItem: Lightbulb, homepageSection: Layers3,
  seoPage: Search, contactMessage: Inbox, quoteRequest: Quote,
};

const field = (key: string, label: string, type: Field['type'] = 'text', hint?: string): Field => ({ key, label, type, hint });
const fields: Record<Resource, Field[]> = {
  project: [field('title', 'Project title'), field('slug', 'URL slug'), field('excerpt', 'Short summary'), field('content', 'Overview', 'textarea'), field('image', 'Image URL'), field('technologies', 'Technologies'), field('github', 'GitHub URL'), field('liveUrl', 'Live URL'), field('featured', 'Featured', 'checkbox'), field('published', 'Published', 'checkbox')],
  blogPost: [field('title', 'Title'), field('slug', 'URL slug'), field('excerpt', 'Excerpt'), field('content', 'Content', 'textarea'), field('category', 'Category'), field('tags', 'Tags'), field('image', 'Image URL'), field('published', 'Published', 'checkbox')],
  experience: [field('role', 'Role'), field('company', 'Company'), field('location', 'Location'), field('startDate', 'Start date'), field('endDate', 'End date'), field('description', 'Description', 'textarea'), field('sortOrder', 'Sort order', 'number')],
  skill: [field('name', 'Skill name'), field('category', 'Category'), field('level', 'Level 0–100', 'number'), field('icon', 'Icon key'), field('sortOrder', 'Sort order', 'number')],
  certification: [field('name', 'Certification'), field('issuer', 'Issuer'), field('year', 'Year'), field('image', 'Certificate image URL'), field('url', 'Verification URL'), field('sortOrder', 'Sort order', 'number')],
  service: [field('title', 'Service title'), field('description', 'Description', 'textarea'), field('icon', 'Icon key'), field('sortOrder', 'Sort order', 'number'), field('published', 'Published', 'checkbox')],
  innovationItem: [field('title', 'Innovation title'), field('description', 'Description', 'textarea'), field('icon', 'Icon key'), field('sortOrder', 'Sort order', 'number'), field('published', 'Published', 'checkbox')],
  homepageSection: [field('sectionKey', 'Section key'), field('eyebrow', 'Eyebrow'), field('title', 'Title'), field('subtitle', 'Subtitle'), field('content', 'Content', 'textarea'), field('image', 'Image URL'), field('sortOrder', 'Sort order', 'number'), field('published', 'Published', 'checkbox')],
  seoPage: [field('pageKey', 'Page key'), field('title', 'SEO title'), field('description', 'Meta description', 'textarea'), field('keywords', 'Keywords', 'textarea'), field('ogImage', 'Open Graph image URL'), field('canonical', 'Canonical URL')],
  contactMessage: [field('name', 'Name'), field('email', 'Email'), field('phone', 'Phone'), field('subject', 'Subject'), field('message', 'Message', 'textarea'), field('status', 'Status')],
  quoteRequest: [field('name', 'Name'), field('email', 'Email'), field('phone', 'Phone'), field('company', 'Company'), field('projectType', 'Project type'), field('budget', 'Budget'), field('message', 'Message', 'textarea'), field('status', 'Status')],
};

function emptyRecord(resource: Resource): RecordValue {
  const result: RecordValue = {};
  for (const item of fields[resource]) result[item.key] = item.type === 'checkbox' ? true : item.type === 'number' ? 0 : '';
  return result;
}

function titleOf(item: RecordValue): string {
  return String(item.title || item.name || item.role || item.sectionKey || item.pageKey || item.subject || `Record #${item.id ?? ''}`);
}

function descriptionOf(item: RecordValue): string {
  return String(item.excerpt || item.company || item.issuer || item.description || item.status || '');
}

export function AdminConsole({ stats }: { stats: Stats }) {
  const [resource, setResource] = useState<Resource>('project');
  const [items, setItems] = useState<RecordValue[]>([]);
  const [editing, setEditing] = useState<RecordValue | null>(null);
  const [settings, setSettings] = useState<Setting[]>([]);
  const [tab, setTab] = useState<'content' | 'media' | 'settings'>('content');
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  async function load(target = resource) {
    setBusy(true);
    try {
      const response = await fetch(`/api/admin/content?resource=${target}`, { cache: 'no-store' });
      const json = await response.json() as { data?: RecordValue[]; error?: string };
      if (!response.ok) throw new Error(json.error || 'Unable to load content');
      setItems(json.data || []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to load content');
    } finally { setBusy(false); }
  }

  async function loadSettings() {
    const response = await fetch('/api/admin/settings', { cache: 'no-store' });
    const json = await response.json() as { data?: Setting[] };
    setSettings(json.data || []);
  }

  useEffect(() => {
    setQuery('');
    setEditing(null);
    if (tab === 'content') void load(resource);
    if (tab === 'settings') void loadSettings();
  }, [resource, tab]);

  const statCards = useMemo(() => [
    ['projects', 'Projects', 'project', BriefcaseBusiness], ['blogs', 'Blog Posts', 'blogPost', FileText],
    ['experience', 'Experience', 'experience', UserRound], ['skills', 'Skills', 'skill', Wrench],
    ['certs', 'Certifications', 'certification', Award], ['services', 'Services', 'service', ShieldCheck],
    ['innovations', 'Innovation', 'innovationItem', Lightbulb], ['messages', 'New Messages', 'contactMessage', Inbox],
    ['quotes', 'Quote Requests', 'quoteRequest', Quote],
  ] as const, []);

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter(item => `${titleOf(item)} ${descriptionOf(item)}`.toLowerCase().includes(needle));
  }, [items, query]);

  async function save() {
    if (!editing) return;
    setBusy(true);
    try {
      const response = await fetch('/api/admin/content', {
        method: editing.id ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resource, id: editing.id, data: editing }),
      });
      const json = await response.json() as { error?: string };
      if (!response.ok) throw new Error(json.error || 'Save failed');
      setMessage('Changes saved successfully.'); setEditing(null); await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Save failed'); }
    finally { setBusy(false); }
  }

  async function remove(id: number) {
    if (!window.confirm('Delete this record? This action cannot be undone.')) return;
    setBusy(true);
    try {
      const response = await fetch('/api/admin/content', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ resource, id }) });
      const json = await response.json() as { error?: string };
      if (!response.ok) throw new Error(json.error || 'Delete failed');
      setMessage('Record deleted.'); await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Delete failed'); }
    finally { setBusy(false); }
  }

  async function saveSetting(setting: Setting) {
    const response = await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(setting) });
    if (response.ok) { setMessage(`${setting.key} updated.`); await loadSettings(); }
  }

  async function logout() { await fetch('/api/admin/logout', { method: 'POST' }); window.location.href = '/admin/login'; }

  function chooseResource(next: Resource) { setTab('content'); setResource(next); setMobileNav(false); }
  const CurrentIcon = iconMap[resource];

  return (
    <main className="admin-shell">
      <div className="admin-atmosphere" />
      <header className="admin-topbar">
        <div className="flex items-center gap-3 min-w-0">
          <button className="admin-icon-btn lg:hidden" onClick={() => setMobileNav(v => !v)} aria-label="Toggle navigation"><Menu size={19} /></button>
          <div className="admin-brand-mark"><LayoutDashboard size={18} /></div>
          <div className="min-w-0"><div className="admin-kicker">SHAHUL.ONLINE / V7</div><div className="admin-brand-title">Engineering Control Center</div></div>
        </div>
        <div className="flex items-center gap-2">
          <span className="admin-live"><span /> SYSTEM ONLINE</span>
          <Link href="/" className="admin-icon-btn" title="Open website"><ExternalLink size={18} /></Link>
          <button className="admin-icon-btn" onClick={() => void logout()} title="Logout"><LogOut size={18} /></button>
        </div>
      </header>

      <div className="admin-layout">
        <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileNav ? 'mobile-open' : ''}`}>
          <div className="admin-side-head"><div className="admin-side-label">CONTROL PLANE</div><button className="admin-collapse" onClick={() => setCollapsed(v => !v)}>{collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}</button></div>
          <button className={`admin-nav-item ${tab === 'content' && resource === 'project' ? 'active' : ''}`} onClick={() => chooseResource('project')}><LayoutDashboard size={17} /><span>Overview</span></button>
          {groups.map(group => <div key={group.title} className="admin-nav-group"><div className="admin-nav-heading">{group.title}</div>{group.items.map(item => { const Icon = iconMap[item]; return <button key={item} className={`admin-nav-item ${tab === 'content' && resource === item ? 'active' : ''}`} onClick={() => chooseResource(item)}><Icon size={17} /><span>{labels[item]}</span></button>; })}</div>)}
          <div className="admin-nav-group"><div className="admin-nav-heading">System</div><button className={`admin-nav-item ${tab === 'media' ? 'active' : ''}`} onClick={() => { setTab('media'); setMobileNav(false); }}><ImageIcon size={17} /><span>Media Library</span></button><button className={`admin-nav-item ${tab === 'settings' ? 'active' : ''}`} onClick={() => { setTab('settings'); setMobileNav(false); }}><Settings size={17} /><span>Site Settings</span></button></div>
          <div className="admin-side-footer"><div className="admin-secure"><ShieldCheck size={15} /><span>Protected session</span></div></div>
        </aside>
        {mobileNav && <button className="admin-nav-backdrop lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}

        <section className="admin-workspace">
          <div className="admin-page-head">
            <div><div className="admin-kicker">PROFESSIONAL CMS</div><h1>{tab === 'media' ? 'Media Library' : tab === 'settings' ? 'Site Settings' : labels[resource]}</h1><p>{tab === 'media' ? 'Manage visual assets used throughout your portfolio.' : tab === 'settings' ? 'Control global site identity, hero content and contact configuration.' : 'Manage production content without touching source code.'}</p></div>
            {tab === 'content' && !['contactMessage', 'quoteRequest'].includes(resource) && <button className="admin-primary" onClick={() => setEditing(emptyRecord(resource))}><Plus size={17} /> New {labels[resource].replace(/s$/, '')}</button>}
          </div>

          <div className="admin-kpi-grid">
            {statCards.map(([key, label, target, Icon]) => <button key={key} className={`admin-kpi ${tab === 'content' && resource === target ? 'selected' : ''}`} onClick={() => chooseResource(target)}><span className="admin-kpi-icon"><Icon size={17} /></span><span className="admin-kpi-label">{label}</span><strong>{stats[key] ?? 0}</strong></button>)}
          </div>

          <div className="admin-panel">
            {tab === 'settings' ? <SettingsPanel settings={settings} onSave={saveSetting} /> : tab === 'media' ? <MediaLibrary /> : <>
              <div className="admin-toolbar"><div className="admin-module-title"><span className="admin-module-icon"><CurrentIcon size={19} /></span><div><span>MODULE</span><h2>{labels[resource]}</h2></div></div><div className="admin-toolbar-actions"><label className="admin-search"><Search size={16} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder={`Search ${labels[resource].toLowerCase()}...`} /><kbd>⌘ K</kbd></label><button className="admin-icon-btn" onClick={() => void load()} title="Refresh"><RefreshCw size={17} className={busy ? 'spin' : ''} /></button></div></div>
              {message && <div className="admin-notice"><Check size={16} /> {message}<button onClick={() => setMessage('')} aria-label="Dismiss"><X size={15} /></button></div>}
              {editing ? <Editor resource={resource} value={editing} setValue={setEditing} onSave={save} onCancel={() => setEditing(null)} busy={busy} /> : <ContentList resource={resource} items={filteredItems} onEdit={setEditing} onDelete={remove} />}
            </>}
          </div>
        </section>
      </div>
    </main>
  );
}

function Editor({ resource, value, setValue, onSave, onCancel, busy }: { resource: Resource; value: RecordValue; setValue: (value: RecordValue) => void; onSave: () => void; onCancel: () => void; busy: boolean }) {
  return <div className="admin-editor">
    <div className="admin-editor-head"><div><span className="admin-kicker">{value.id ? 'EDIT RECORD' : 'CREATE RECORD'}</span><h3>{value.id ? `Edit ${labels[resource]}` : `New ${labels[resource].replace(/s$/, '')}`}</h3></div><button className="admin-icon-btn" onClick={onCancel} title="Close editor"><X size={18} /></button></div>
    <div className="admin-form-grid">{fields[resource].map(item => item.type === 'checkbox' ? <label key={item.key} className="admin-check-card"><input type="checkbox" checked={Boolean(value[item.key])} onChange={event => setValue({ ...value, [item.key]: event.target.checked })} /><span><strong>{item.label}</strong><small>Enable this option</small></span></label> : <label key={item.key} className={item.type === 'textarea' ? 'admin-field full' : 'admin-field'}><span>{item.label}</span>{item.hint && <small>{item.hint}</small>}{item.type === 'textarea' ? <textarea rows={item.key === 'content' ? 10 : 6} value={String(value[item.key] ?? '')} onChange={event => setValue({ ...value, [item.key]: event.target.value })} /> : <input type={item.type === 'number' ? 'number' : 'text'} value={String(value[item.key] ?? '')} onChange={event => setValue({ ...value, [item.key]: item.type === 'number' ? Number(event.target.value) : event.target.value })} />}</label>)}</div>
    <div className="admin-editor-actions"><button className="admin-secondary" onClick={onCancel}>Cancel</button><button className="admin-primary" disabled={busy} onClick={onSave}>{busy ? 'Saving...' : 'Save changes'}</button></div>
  </div>;
}

function ContentList({ resource, items, onEdit, onDelete }: { resource: Resource; items: RecordValue[]; onEdit: (value: RecordValue) => void; onDelete: (id: number) => void }) {
  if (!items.length) return <div className="admin-empty"><BarChart3 size={28} /><h3>No records found</h3><p>There is nothing matching your current view.</p></div>;
  return <div className="admin-records"><div className="admin-records-head"><span>{items.length} record{items.length === 1 ? '' : 's'}</span><span>Actions</span></div>{items.map(item => <article key={item.id} className="admin-record"><div className="admin-record-main"><div className="admin-record-icon"><span>{titleOf(item).slice(0, 1).toUpperCase()}</span></div><div className="min-w-0"><h3>{String(titleOf(item))}</h3><p>{String(descriptionOf(item))}</p><div className="admin-record-meta"><span>ID #{item.id}</span>{typeof item.published === 'boolean' && <span className={item.published ? 'ok' : 'muted'}>{item.published ? 'Published' : 'Draft'}</span>}{item.featured === true && <span className="featured">Featured</span>}</div></div></div><div className="admin-record-actions"><button className="admin-secondary small" onClick={() => onEdit({ ...item })}><FileText size={15} /> Edit</button><button className="admin-danger small" onClick={() => item.id && onDelete(item.id)}><Trash2 size={15} /> Delete</button></div></article>)}</div>;
}

function SettingsPanel({ settings, onSave }: { settings: Setting[]; onSave: (setting: Setting) => void }) {
  const [draft, setDraft] = useState<Setting[]>(settings);
  useEffect(() => setDraft(settings), [settings]);
  return <div><div className="admin-toolbar"><div className="admin-module-title"><span className="admin-module-icon"><Settings size={19} /></span><div><span>GLOBAL CONFIGURATION</span><h2>Site Settings</h2></div></div></div><div className="admin-settings-grid">{draft.map(setting => <div key={setting.key} className="admin-setting-card"><label>{setting.key.replaceAll('_', ' ')}</label><input value={setting.value} onChange={event => setDraft(draft.map(item => item.key === setting.key ? { ...item, value: event.target.value } : item))} /><button className="admin-secondary small" onClick={() => onSave(setting)}>Save</button></div>)}</div></div>;
}

function MediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>([]); const [busy, setBusy] = useState(false); const [message, setMessage] = useState('');
  async function load() { const response = await fetch('/api/admin/media', { cache: 'no-store' }); const json = await response.json() as { data?: MediaItem[] }; setItems(json.data || []); }
  useEffect(() => { void load(); }, []);
  async function upload(event: ChangeEvent<HTMLInputElement>) { const file = event.target.files?.[0]; if (!file) return; setBusy(true); const form = new FormData(); form.append('file', file); const response = await fetch('/api/admin/media', { method: 'POST', body: form }); const json = await response.json() as { error?: string }; setMessage(response.ok ? 'Image uploaded successfully.' : json.error || 'Upload failed.'); if (response.ok) await load(); setBusy(false); event.target.value = ''; }
  async function remove(id: number) { if (!window.confirm('Delete this media asset?')) return; await fetch('/api/admin/media', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }); await load(); }
  return <div><div className="admin-toolbar"><div className="admin-module-title"><span className="admin-module-icon"><ImageIcon size={19} /></span><div><span>ASSET MANAGEMENT</span><h2>Media Library</h2></div></div><label className="admin-primary cursor-pointer"><Plus size={17} /> {busy ? 'Uploading...' : 'Upload image'}<input hidden type="file" accept="image/*" onChange={upload} /></label></div>{message && <div className="admin-notice"><Check size={16} /> {message}</div>}<div className="admin-media-grid">{items.map(item => <article key={item.id} className="admin-media-card"><div className="admin-media-image"><img src={item.url} alt={item.alt || item.filename} /></div><div className="admin-media-body"><strong>{item.filename}</strong><span>{Math.max(1, Math.round(item.size / 1024))} KB · {item.mimeType}</span><div><button className="admin-secondary small" onClick={() => void navigator.clipboard?.writeText(item.url)}>Copy URL</button><button className="admin-danger small" onClick={() => void remove(item.id)}><Trash2 size={14} /></button></div></div></article>)}</div></div>;
}
