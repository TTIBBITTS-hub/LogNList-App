'use client';

import { useState, useEffect } from 'react';

const c = {
  ink: '#171A20',
  inkSoft: '#5C5E62',
  inkFaint: '#98999D',
  bgAlt: '#F4F4F5',
  line: '#E7E7E8',
  success: '#0F7A54',
};

export default function ShopfrontPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/sell');
        const data = await res.json();
        setItems(data.items || []);
      } catch (e) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 0 60px', minHeight: '100vh', background: '#fff', fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif', color: c.ink }}>
      <header style={{ background: c.ink, padding: '18px 20px' }}>
        <div style={{ color: '#fff', fontWeight: 800, fontSize: 17, letterSpacing: '0.02em' }}>LOG&amp;LIST</div>
      </header>

      <div style={{ padding: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>For sale</h1>
        <p style={{ fontSize: 14, color: c.inkFaint, margin: '0 0 20px' }}>
          {loading ? '' : items.length === 0 ? 'Nothing up at the moment — check back.' : `${items.length} item${items.length === 1 ? '' : 's'} available`}
        </p>

        {loading ? (
          <p style={{ color: c.inkFaint, textAlign: 'center', marginTop: 30 }}>Loading…</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 14 }}>
            {items.map((it) => (
              <a
                key={it.id}
                href={`/sell/${it.id}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div style={{ width: '100%', aspectRatio: '1', background: c.bgAlt, borderRadius: 14, overflow: 'hidden' }}>
                  {it.photos && it.photos[0] ? (
                    <img src={it.photos[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.inkFaint, fontSize: 12 }}>No photo</div>
                  )}
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.4, marginTop: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {it.title}
                </div>
                {it.price != null && (
                  <div style={{ fontSize: 15, fontWeight: 700, color: c.success, marginTop: 2 }}>${it.price}</div>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
