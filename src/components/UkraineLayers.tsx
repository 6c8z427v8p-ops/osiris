'use client';

import { useMemo, useState } from 'react';

type Layer = 'events' | 'humanitarian' | 'history';
type Source = { title: string; url: string; description: string; layer: Layer; updated: string };

const sources: Source[] = [
  { title: 'ACLED — Ukraine Conflict Monitor', url: 'https://acleddata.com/monitor/ukraine-conflict-monitor', description: 'Интерактивная карта зарегистрированных событий, фильтры по времени и типу. Даты и методику проверяйте у ACLED.', layer: 'events', updated: 'На сайте источника' },
  { title: 'OHCHR — Protection of Civilians', url: 'https://ukraine.ohchr.org/en/reports/protection-of-civilians', description: 'Проверенные ООН отчёты о гражданских жертвах и последствиях войны.', layer: 'humanitarian', updated: 'В каждом отчёте' },
  { title: 'ACAPS — Ukraine', url: 'https://www.acaps.org/en/countries/ukraine', description: 'Гуманитарные обзоры, ограничения доступа и оценка потребностей.', layer: 'humanitarian', updated: 'В каждом обзоре' },
  { title: 'ACLED — архив событий', url: 'https://acleddata.com/monitor/ukraine-conflict-monitor', description: 'Сравнивайте периоды на карте источника с помощью его фильтров дат.', layer: 'history', updated: 'На сайте источника' },
  { title: 'OHCHR — архив ежемесячных докладов', url: 'https://ukraine.ohchr.org/en/reports/protection-of-civilians', description: 'Просматривайте последовательные доклады ООН для сравнения периодов.', layer: 'history', updated: 'В каждом отчёте' },
];

const layerLabels: Record<Layer, string> = {
  events: 'События',
  humanitarian: 'Гуманитарная ситуация',
  history: 'История',
};

export default function UkraineLayers() {
  const [enabled, setEnabled] = useState<Layer[]>(['events', 'humanitarian']);
  const [query, setQuery] = useState('');
  const visible = useMemo(() => sources.filter(s => enabled.includes(s.layer) && (s.title + ' ' + s.description).toLocaleLowerCase('ru').includes(query.toLocaleLowerCase('ru'))), [enabled, query]);
  return (
    <section aria-labelledby="ukraine-layers-title" style={{ marginTop: 28 }}>
      <h2 id="ukraine-layers-title" style={{ fontSize: 22 }}>Слои мониторинга</h2>
      <p style={{ color: '#abb2bf', lineHeight: 1.6 }}>Включайте категории источников. Это фильтр проверяемых материалов, а не оперативные географические слои. Карта событий и временные фильтры доступны у ACLED.</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '18px 0' }}>
        {(Object.keys(layerLabels) as Layer[]).map(layer => {
          const active = enabled.includes(layer);
          return <button key={layer} type="button" aria-pressed={active} onClick={() => setEnabled(prev => active ? prev.filter(x => x !== layer) : [...prev, layer])}
            style={{ border: '1px solid ' + (active ? '#e8c56b' : '#444955'), borderRadius: 12, padding: '12px 14px', background: active ? '#342a13' : '#131620', color: active ? '#f7dfa3' : '#c4c9d2', fontSize: 14, cursor: 'pointer' }}>
            {active ? '✓ ' : '+ '}{layerLabels[layer]}
          </button>;
        })}
      </div>
      <label htmlFor="ukraine-source-search" style={{ display: 'block', fontSize: 14, marginBottom: 8 }}>Поиск по источникам</label>
      <input id="ukraine-source-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Например: гражданские, события..." style={{ boxSizing: 'border-box', width: '100%', padding: 14, border: '1px solid #444955', borderRadius: 12, background: '#10121a', color: '#fff', fontSize: 16 }} />
      <div aria-live="polite" style={{ marginTop: 18, display: 'grid', gap: 12 }}>
        {visible.length === 0 ? <p style={{ color: '#abb2bf' }}>Нет материалов по выбранным фильтрам.</p> : visible.map(s => (
          <a key={s.layer + s.title} href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', border: '1px solid #303340', borderRadius: 14, padding: 18, background: '#10121a', display: 'block' }}>
            <span style={{ color: '#e8c56b', fontSize: 12 }}>{layerLabels[s.layer]}</span>
            <h3 style={{ fontSize: 17, margin: '8px 0' }}>{s.title} ↗</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#abb2bf', margin: '0 0 8px' }}>{s.description}</p>
            <small style={{ color: '#949cab' }}>Дата обновления: {s.updated}</small>
          </a>
        ))}
      </div>
    </section>
  );
}
