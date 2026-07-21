'use client';

// Log&List - box view. Read-only screen the phone opens when a box QR is scanned.
// Reuses the existing /api/items route and matches the app's look. No new backend.

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const colors = {
  ink: '#171A20',
  inkSoft: '#5C5E62',
  inkFaint: '#98999D',
  bg: '#FFFFFF',
  bgAlt: '#F4F4F5',
  line: '#E7E7E8',
  success: '#0F7A54',
  successBg: '#E9F6F0',
  accent: '#E31937',
  brand: '#7CCB2B',
};

const statusColors = {
  logged: { bg: colors.bgAlt, text: colors.inkSoft },
  listed: { bg: colors.successBg, text: colors.success },
  sold: { bg: '#FBEAEC', text: colors.accent },
  box: { bg: '#EFE9F7', text: '#6B4FA0' },
};

export default function BoxPage() {
  const params = useParams();
  // Next.js already URL-decodes route params, so use it as-is.
  const raw = params && params.code ? params.code : '';
  const rawStr = Array.isArray(raw) ? raw[0] : raw;
  let boxName = rawStr;
  try { boxName = decodeURIComponent(rawStr); } catch (e) {}

  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await fetch('/api/items');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setItems(data.items || []);
    } catch (e) {
      setError('Could not load this box: ' + e.message);
    }
    setLoaded(true);
  }

  const norm = (s) => (s || '').trim().toLowerCase();
  const target = norm(boxName);
  const inBox = items.filter((i) => norm(i.box) === target);
  const mixed = inBox.filter((i) => i.type === 'box');
  const things = inBox.filter((i) => i.type !== 'box' && i.type !== 'file');

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', minHeight: '100vh', background: colors.bg, paddingBottom: 60 }}>
      <header style={{ background: colors.ink, padding: '26px 22px 22px' }}>
        <div style={{ color: colors.brand, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
          Log&amp;List
        </div>
        <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
          Box
        </div>
        <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, margin: 0, wordBreak: 'break-word' }}>
          {boxName || 'Unknown box'}
        </h1>
        {loaded && !error && (
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 8 }}>
            {things.length} {things.length === 1 ? 'item' : 'items'} logged here
          </div>
        )}
      </header>

      <main style={{ padding: 20 }}>
        {!loaded && (
          <p style={{ color: colors.inkFaint, textAlign: 'center', marginTop: 40 }}>Loading...</p>
        )}

        {error && (
          <p style={{ color: colors.accent, fontSize: 14, marginTop: 20 }}>{error}</p>
        )}

        {loaded && !error && (
          <>
            {mixed.map((m) => (
              <div key={m.id} style={{ background: statusColors.box.bg, borderRadius: 14, padding: 16, marginBottom: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: statusColors.box.text, marginBottom: 6 }}>
                  QUICK NOTE ON THIS BOX
                </div>
                <div style={{ fontSize: 14, color: colors.ink, lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
                  {m.notes || 'Mixed box'}
                </div>
                {m.photos && m.photos.length > 0 && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto' }}>
                    {m.photos.map((p, i) => (
                      <img key={i} src={p} alt="" style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />
                    ))}
                  </div>
                )}
              </div>
            ))}

            {things.length === 0 && mixed.length === 0 ? (
              <p style={{ color: colors.inkFaint, textAlign: 'center', marginTop: 40, fontSize: 15, lineHeight: 1.5, padding: '0 20px' }}>
                Nothing's logged as being in this box yet. Log something to it in the app and it'll show up here.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {things.map((item) => {
                  const sc = statusColors[item.status] || statusColors.logged;
                  const isBook = item.type === 'book';
                  return (
                    <a
                      key={item.id}
                      href={'/?item=' + item.id}
                      style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#fff', border: `1px solid ${colors.line}`, borderRadius: 14, padding: 12, boxShadow: '0 1px 3px rgba(23,26,32,0.04)', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                    >
                      {item.photos && item.photos[0] ? (
                        <img src={item.photos[0]} alt="" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 10, flexShrink: 0, background: colors.bgAlt }} />
                      ) : (
                        <div style={{ width: 56, height: 56, borderRadius: 10, background: colors.bgAlt, flexShrink: 0 }} />
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: 15, color: colors.ink, marginBottom: 3 }}>
                          {item.name || 'Unidentified item'}
                        </div>
                        <div style={{ fontSize: 12.5, color: colors.inkFaint }}>
                          {isBook
                            ? (item.author ? 'by ' + item.author : 'Book')
                            : (item.category || 'Uncategorised')}
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                        {item.status === 'listed' && item.listing && item.listing.price != null && (
                          <div style={{ background: colors.success, color: '#fff', fontSize: 12, fontWeight: 700, padding: '3px 9px', borderRadius: 999 }}>
                            ${item.listing.price}
                          </div>
                        )}
                        {!isBook && item.status && (
                          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', padding: '3px 8px', borderRadius: 999, background: sc.bg, color: sc.text }}>
                            {item.status.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: 30, paddingTop: 18, borderTop: `1px solid ${colors.line}` }}>
              <a href="/" style={{ color: colors.inkFaint, fontSize: 13, textDecoration: 'underline', textUnderlineOffset: 2 }}>
                Open Log&amp;List
              </a>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
