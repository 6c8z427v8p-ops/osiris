import type { Metadata } from 'next';
import Link from 'next/link';
import UkraineLayers from '@/components/UkraineLayers';

export const metadata: Metadata = {
  title: 'Украина — мониторинг конфликта | OSIRIS',
  description: 'Мониторинг открытых источников по конфликту в Украине с указанием источников и ограничений данных.',
};

const sources = [
  { name: 'ACLED — Ukraine Conflict Monitor', detail: 'Карта зарегистрированных событий, фильтры по датам и типам, сводки и территориальные карты с указанной датой.', url: 'https://acleddata.com/monitor/ukraine-conflict-monitor', tag: 'События и карта' },
  { name: 'OHCHR — защита гражданского населения', detail: 'Проверенные ООН данные о жертвах среди гражданских и ежемесячные доклады.', url: 'https://ukraine.ohchr.org/en/reports/protection-of-civilians', tag: 'Гражданские' },
  { name: 'ACAPS — Ukraine', detail: 'Гуманитарная обстановка, ограничения доступа и аналитические отчёты.', url: 'https://www.acaps.org/en/countries/ukraine', tag: 'Гуманитарная ситуация' },
];

const frontlineSectors = [
  { id: 'zaporizhzhia', title: 'Запорожское направление', screenshotDate: '16.11.2026', channelTag: 'Запорожское', locations: 'Никольское, Васильковое', sourceUrl: 'https://tvgram.ru/z_arhiv/34294' },
  { id: 'ocheretyne', title: 'Очеретинский участок', screenshotDate: '16.11.2026', channelTag: 'Очеретинский', locations: 'Весна, Новопавловка, Белозерское', sourceUrl: 'https://tvgram.ru/z_arhiv/34326' },
  { id: 'dobropillia', title: 'Добропольский участок', screenshotDate: '12.11.2026', channelTag: 'Добропольский', locations: 'Надия, Новофедоровка, Святогоровка', sourceUrl: 'https://t.me/s/z_arhiv' },
  { id: 'dnipro', title: 'Днепропетровский участок', screenshotDate: '11.11.2026', channelTag: 'Днепропетровский', locations: 'Шиловка, Петровское, Юрьевка', sourceUrl: 'https://t.me/s/z_arhiv' },
];

export default function UkraineConflictPage() {
  return (
    <main className="docs-root" style={{ overflowY: "auto", touchAction: "pan-y", WebkitOverflowScrolling: "touch", minHeight: '100vh', background: '#06060c', color: '#f3f4f6', padding: 'max(24px, env(safe-area-inset-top)) 18px 48px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 840, margin: '0 auto' }}><p style={{fontSize: 11, color: "#8e9aac"}}>OSIRIS RU · исправление прокрутки v2</p>
        <Link href="/" style={{ color: '#e8c56b', textDecoration: 'none' }}>← OSIRIS / Карта мира</Link>
        <p style={{ marginTop: 32, color: '#e8c56b', letterSpacing: 2, fontSize: 12 }}>РЕГИОНАЛЬНЫЙ МОНИТОРИНГ</p>
        <h1 style={{ fontSize: 'clamp(28px, 7vw, 48px)', lineHeight: 1.15, margin: '12px 0' }}>Украина — зона конфликта</h1>
        <p style={{ color: '#aab0bb', lineHeight: 1.7 }}>Отдельный обзор открытых источников: события, положение гражданского населения и гуманитарная обстановка. Все сведения требуют проверки по первоисточнику.</p>
        <section style={{ border: '1px solid #55451e', borderRadius: 14, background: '#19160d', padding: 18, margin: '24px 0' }}>
          <strong style={{ color: '#f2d184' }}>Важно о точности</strong>
          <p style={{ marginBottom: 0, lineHeight: 1.6, color: '#d5d0c5' }}>Это не оперативная карта боевых действий и не система предупреждения об опасности. Данные могут поступать с задержкой, сообщения могут быть неполными или неподтверждёнными. Отсутствие отметок не означает безопасность. Линия контроля территорий зависит от даты и методики источника.</p>
        </section>
        <section style={{ border: '1px solid #665027', borderRadius: 14, padding: 18, background: '#15130e', marginTop: 24 }}>
          <span style={{ color: '#e8c56b', fontSize: 12 }}>ИСТОЧНИК ЛИНИИ СОПРИКОСНОВЕНИЯ</span>
          <h2 style={{ fontSize: 20, margin: '10px 0' }}>Z комитет — публичная карта</h2>
          <p style={{ color: '#b8beca', lineHeight: 1.6 }}>Карта и оценки контроля территорий публикуются сторонним проектом. Данные могут запаздывать и отражают методику и позицию авторов. Сверяйте дату обновления и другие независимые источники.</p>
          <a href="https://паблик.карта-сво.рф/free/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', border: '1px solid #e8c56b', borderRadius: 10, padding: '12px 16px', color: '#e8c56b', textDecoration: 'none' }}>Открыть карту Z комитета ↗</a>
          <p style={{ fontSize: 13, color: '#969eaa', lineHeight: 1.6 }}>Линия фронта пока не импортирована в карту OSIRIS: доступный машиночитаемый слой и разрешение на повторное использование не подтверждены.</p>
        </section>
        <section style={{ marginTop: 28 }} aria-label="Отдельные участки по Z комитету">
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>Участки фронта · Z комитет</h2>
          <p style={{ color: '#aab0bb', lineHeight: 1.6, fontSize: 14 }}>Четыре направления по присланным изображениям. Названия населённых пунктов взяты из опубликованных сообщений канала; это ссылки на материалы источника, а не географические контуры. Даты изображений и сообщений могут отличаться.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 12 }}>
            {frontlineSectors.map(sector => (
              <article key={sector.id} style={{ border: '1px solid #373a46', borderRadius: 14, background: '#11131d', padding: 16 }}>
                <span style={{ fontSize: 11, color: '#e8c56b' }}>УЧАСТОК · СНИМОК {sector.screenshotDate}</span>
                <h3 style={{ margin: '9px 0', fontSize: 18 }}>{sector.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: '#b9c0cb' }}>Упоминаются в публикациях: {sector.locations}.</p>
                <a href={sector.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#e8c56b', fontSize: 14 }}>Сообщение / лента Z комитета ↗</a>
              </article>
            ))}
          </div>
          <p style={{ color: '#9ca3af', fontSize: 12, lineHeight: 1.6 }}>Источник публикаций: Telegram @z_arhiv. Автоматическое обновление сообщений и наложение геометрии фронта пока не подключены. Данные об инженерных заграждениях не импортированы.</p>
        </section>
        <UkraineLayers />
        <h2 style={{ fontSize: 21, margin: '30px 0 16px' }}>Все основные источники</h2>
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
