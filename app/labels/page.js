'use client';

// Log&List - printable QR box labels.
// Reads /api/items, finds every box you've used, and makes a scannable QR label
// for each one pointing at /box/<name>. Print, cut, stick on the box.

import { useState, useEffect } from 'react';

const colors = {
  ink: '#171A20',
  inkSoft: '#5C5E62',
  inkFaint: '#98999D',
  bg: '#FFFFFF',
  bgAlt: '#F4F4F5',
  line: '#E7E7E8',
  brand: '#7CCB2B',
};

// Load a small, reliable QR library from a CDN at runtime.
function loadQR() {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && typeof window.qrcode === 'function') {
      return resolve(window.qrcode);
    }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js';
    s.onload = () =>
      typeof window.qrcode === 'function'
        ? resolve(window.qrcode)
        : reject(new Error('QR library loaded but was empty'));
    s.onerror = () => reject(new Error('QR library failed to load'));
    document.head.appendChild(s);
  });
}

export default function LabelsPage() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [qrMap, setQrMap] = useState({});

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
      setError('Could not load your boxes: ' + e.message);
    }
    setLoaded(true);
  }

  // Distinct box names, plus a count of the real items in each.
  const usable = items.filter((i) => i.type !== 'file');
  const boxNames = Array.from(
    new Set(usable.map((i) => (i.box || '').trim()).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  const countFor = (name) =>
    items.filter(
      (i) => i.type !== 'file' && i.type !== 'box' && (i.box || '').trim() === name
    ).length;

  // Once items are loaded, build a QR image for each box.
  useEffect(() => {
    if (!loaded || boxNames.length === 0) return;
    let cancelled = false;
    (async () => {
      try {
        const qrcode = await loadQR();
        const origin = window.location.origin;
        const map = {};
        for (const name of boxNames) {
          const url = origin + '/box/' + encodeURIComponent(name);
          const qr = qrcode(0, 'M');
          qr.addData(url);
          qr.make();
          map[name] = qr.createDataURL(8, 16);
        }
        if (!cancelled) setQrMap(map);
      } catch (e) {
        if (!cancelled) setError('Could not generate the QR codes: ' + e.message);
      }
    })();
    return () => { cancelled = true; };
  }, [loaded, boxNames.join('|')]);

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', minHeight: '100vh', background: colors.bg, paddingBottom: 60 }}>
      <style>{`
        @media print {
          .noprint { display: none !important; }
          .sheet { gap: 0 !important; }
          .label {
            break-inside: avoid;
            border: 1px solid #000 !important;
            box-shadow: none !important;
            margin: 6px !important;
          }
          @page { margin: 12mm; }
        }
      `}</style>

      <header className="noprint" style={{ background: colors.ink, padding: '24px 22px' }}>
        <div style={{ color: colors.brand, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
          Log&amp;List
        </div>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>Box labels</h1>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 6 }}>
          Print these, stick one on each box. Scan it later to see what's inside.
        </div>
      </header>

      <main style={{ padding: 20 }}>
        {!loaded && <p style={{ color: colors.inkFaint, textAlign: 'center', marginTop: 40 }}>Loading...</p>}
        {error && <p style={{ color: '#E31937', fontSize: 14, marginTop: 20 }}>{error}</p>}

        {loaded && !error && boxNames.length === 0 && (
          <p style={{ color: colors.inkFaint, textAlign: 'center', marginTop: 40, fontSize: 15, lineHeight: 1.5, padding: '0 20px' }}>
            No boxes yet. Log an item into a box in the app, then come back and its label will be here.
          </p>
        )}

        {loaded && !error && boxNames.length > 0 && (
          <>
            <div className="noprint" style={{ marginBottom: 20 }}>
              <button
                onClick={() => window.print()}
                style={{ background: colors.ink, color: '#fff', border: 'none', borderRadius: 999, padding: '12px 22px', fontWeight: 600, fontSize: 14.5, cursor: 'pointer' }}
              >
                Print labels
              </button>
              <span style={{ color: colors.inkFaint, fontSize: 13, marginLeft: 12 }}>
                {boxNames.length} {boxNames.length === 1 ? 'box' : 'boxes'}
              </span>
            </div>

            <div className="sheet" style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              {boxNames.map((name) => (
                <div
                  key={name}
                  className="label"
                  style={{ width: 230, border: '1px solid ' + colors.line, borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 1px 3px rgba(23,26,32,0.05)', background: '#fff' }}
                >
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: colors.inkFaint, marginBottom: 10 }}>
                    Log&amp;List
                  </div>
                  {qrMap[name] ? (
                    <img src={qrMap[name]} alt="" style={{ width: 150, height: 150, display: 'block', imageRendering: 'pixelated' }} />
                  ) : (
                    <div style={{ width: 150, height: 150, background: colors.bgAlt, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.inkFaint, fontSize: 12 }}>
                      ...
                    </div>
                  )}
                  <div style={{ fontSize: 16, fontWeight: 700, color: colors.ink, marginTop: 12, wordBreak: 'break-word' }}>
                    {name}
                  </div>
                  <div style={{ fontSize: 12, color: colors.inkFaint, marginTop: 3 }}>
                    {countFor(name)} {countFor(name) === 1 ? 'item' : 'items'}
                  </div>
                </div>
              ))}
            </div>

            <div className="noprint" style={{ textAlign: 'center', marginTop: 30, paddingTop: 18, borderTop: '1px solid ' + colors.line }}>
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
