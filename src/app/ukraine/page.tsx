import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Украина — мониторинг конфликта | OSIRIS',
  description: 'Мониторинг открытых источников по конфликту в Украине с указанием источников и ограничений данных.',
};

const sources = [
  { name: 'ACLED — Ukraine Conflict Monitor', detail: 'Карта зарегистрированных событий, фильтры по датам и типам, сводки и территориальные карты с указанной датой.', url: 'https://acleddata.com/monitor/ukraine-conflict-monitor', tag: 'События и карта' },
  { name: 'OHCHR — защита гражданского населения', detail: 'Проверенные ООН данные о жертвах среди гражданских и ежемесячные доклады.', url: 'https://ukraine.ohchr.org/en/reports/protection-of-civilians', tag: 'Гражданские' },
  { name: 'ACAPS — Ukraine', detail: 'Гуманитарная обстановка, ограничения доступа и аналитические отчёты.', url: 'https://www.acaps.org/en/countries/ukraine', tag: 'Гуманитарная ситуация' },
];

export default function UkraineConflictPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#06060c', color: '#f3f4f6', padding: 'max(24px, env(safe-area-inset-top)) 18px 48px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 840, margin: '0 auto' }}>
        <Link href="/" style={{ color: '#e8c56b', textDecoration: 'none' }}>← OSIRIS / Карта мира</Link>
        <p style={{ marginTop: 32, color: '#e8c56b', letterSpacing: 2, fontSize: 12 }}>РЕГИОНАЛЬНЫЙ МОНИТОРИНГ</p>
        <h1 style={{ fontSize: 'clamp(28px, 7vw, 48px)', lineHeight: 1.15, margin: '12px 0' }}>Украина — зона конфликта</h1>
        <p style={{ color: '#aab0bb', lineHeight: 1.7 }}>Отдельный обзор открытых источников: события, положение гражданского населения и гуманитарная обстановка. Все сведения требуют проверки по первоисточнику.</p>
        <section style={{ border: '1px solid #55451e', borderRadius: 14, background: '#19160d', padding: 18, margin: '24px 0' }}>
          <strong style={{ color: '#f2d184' }}>Важно о точности</strong>
          <p style={{ marginBottom: 0, lineHeight: 1.6, color: '#d5d0c5' }}>Это не оперативная карта боевых действий и не система предупреждения об опасности. Данные могут поступать с задержкой, сообщения могут быть неполными или неподтверждёнными. Отсутствие отметок не означает безопасность. Линия контроля территорий зависит от даты и методики источника.</p>
        </section>
        <h2 style={{ fontSize: 21, margin: '30px 0 16px' }}>Источники мониторинга</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {sources.map(source => (
            <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: 'inherit', textDecoration: 'none', background: '#10121a', border: '1px solid #303340', borderRadius: 14, padding: 18 }}>
              <span style={{ color: '#e8c56b', fontSize: 12 }}>{source.tag}</span>
              <h3 style={{ margin: '8px 0', fontSize: 17 }}>{source.name} ↗</h3>
              <p style={{ color: '#aab0bb', margin: 0, lineHeight: 1.6, fontSize: 14 }}>{source.detail}</p>
            </a>
          ))}
        </div>
        <p style={{ color: '#8e95a3', marginTop: 24, lineHeight: 1.6, fontSize: 13 }}>OSIRIS не подтверждает автоматически сообщения из внешних источников. Время обновления, категории и географические координаты смотрите на страницах источников. Интерактивная карта событий открывается через ACLED.</p>
      </div>
    </main>
  );
}
