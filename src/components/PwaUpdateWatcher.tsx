'use client';

import { useEffect, useState } from 'react';

/**
 * Checks whether a new Vercel deployment is available.
 * Never reloads the map automatically: an analyst may be in the middle of work.
 * The original OSIRIS data layers retain their own refresh logic.
 */
export default function PwaUpdateWatcher() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    let lastVersion: string | null = null;
    let cancelled = false;
    let inFlight = false;

    async function checkVersion() {
      if (document.visibilityState !== 'visible' || inFlight) return;
      inFlight = true;
      try {
        const response = await fetch('/api/pwa-version', { cache: 'no-store' });
        if (!response.ok) return;
        const payload: { version?: string } = await response.json();
        if (cancelled || !payload.version || payload.version === 'local') return;
        if (lastVersion && lastVersion !== payload.version) {
          setUpdateAvailable(true);
        }
        lastVersion = payload.version;
      } catch {
        // An offline iPhone should remain usable; try again next time.
      } finally {
        inFlight = false;
      }
    }

    void checkVersion();
    const interval = window.setInterval(() => void checkVersion(), 5 * 60 * 1000);
    document.addEventListener('visibilitychange', checkVersion);
    window.addEventListener('online', checkVersion);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', checkVersion);
      window.removeEventListener('online', checkVersion);
    };
  }, []);

  if (!updateAvailable) return null;
  return (
    <aside
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed', zIndex: 2147483000, left: 12, right: 12,
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)',
        maxWidth: 440, marginInline: 'auto', padding: 12,
        border: '1px solid #D4AF37', borderRadius: 12,
        background: '#0C0E1A', color: '#fff', fontSize: 14,
        boxShadow: '0 8px 24px rgba(0,0,0,.5)'
      }}
    >
      <div style={{ marginBottom: 10 }}>Доступна новая версия OSIRIS</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{ padding: '10px 14px', borderRadius: 8, background: '#D4AF37', color: '#06060C', fontWeight: 700 }}
        >Обновить</button>
        <button
          type="button"
          onClick={() => setUpdateAvailable(false)}
          style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #777', color: '#fff' }}
        >Позже</button>
      </div>
    </aside>
  );
}
