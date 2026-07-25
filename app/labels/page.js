'use client';

// Log&List - printable QR box labels.
// Shows a label for every box you've created OR used, and lets you create a new
// named box on the spot (saved to the boxes table) so you can print its QR before
// anything goes in it. Each QR points at /box/<name>.

import { useState, useEffect } from 'react';

const colors = {
  ink: '#171A20',
  inkSoft: '#5C5E62',
  inkFaint: '#98999D',
  bg: '#FFFFFF',
  bgAlt: '#F4F4F5',
  line: '#E7E7E8',
  brand: '#7CCB2B',
  accent: '#E31937',
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
  const [boxes, setBoxes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [qrMap, setQrMap] = useState({});
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);
  const [printOnly, setPrintOnly] = useState(null);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    let itemList = [];
    let boxList = [];
    try {
      const ri = await fetch('/api/items');
      const di = await ri.json();
      if (di.error) throw new Error(di.error);
      itemList = di.items || [];
    } catch (e) {
      setError('Could not load your items: ' + e.message);
    }
    // Boxes route is optional - if it's not there yet, we just carry on with item boxes.
    try {
      const rb = await fetch('/api/boxes');
      const db = await rb.json();
      if (db && db.boxes) boxList = db.boxes;
    } catch (e) {}
    setItems(itemList);
    setBoxes(boxList);
    setLoaded(true);
  }

  async function addBox() {
    const name = newName.trim();
    if (!name) return;
    setAdding(true);
    setError(null);
    try {
      const res = await fetch('/api/boxes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setNewName('');
      await load();
    } catch (e) {
      setError('Could not add that box: ' + e.message);
    }
    setAdding(false);
  }

  function printLabel(name) {
    setPrintOnly(name);
    setTimeout(() => { window.print(); setPrintOnly(null); }, 60);
  }

  // Build a tidy PNG of a single label (QR + name) and hand it to the device's
  // share sheet - so you can email/message a label to yourself without printing.
  // On a laptop with no share sheet, it downloads the image to attach instead.
  async function shareLabel(name) {
    const qrData = qrMap[name];
    if (!qrData) return;
    setNotice(null);
    setError(null);
    try {
      const W = 620;
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = W + 150;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#98999D';
      ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
      ctx.fillText('LOG\u0026LIST', canvas.width / 2, 48);

      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = qrData; });
      const qrSize = 480;
      const qx = (canvas.width - qrSize) / 2;
      const qy = 74;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, qx, qy, qrSize, qrSize);

      ctx.fillStyle = '#171A20';
      ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
      ctx.fillText(name, canvas.width / 2, qy + qrSize + 64);

      const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
      const safe = (name.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '') || 'box');
      const file = new File([blob], 'LogNList-' + safe + '.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Box label: ' + name,
          text: 'Log\u0026List label for "' + name + '". Open the image and scan the QR to file items into this box.',
        });
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 4000);
        setNotice('Saved the "' + name + '" label as an image - attach it to an email, or open it and scan it.');
      }
    } catch (e) {
      if (e && e.name === 'AbortError') return; // user closed the share sheet - not an error
      setError('Could not share that label: ' + e.message);
    }
  }

  // All box names: created boxes first, plus any names already used by items.
  const createdNames = boxes.map((b) => (b.name || '').trim()).filter(Boolean);
  const itemNames = items
    .filter((i) => i.type !== 'file')
    .map((i) => (i.box || '').trim())
    .filter(Boolean);
  const boxNames = Array.from(new Set([...createdNames, ...itemNames])).sort((a, b) =>
    a.localeCompare(b)
  );

  const countFor = (name) =>
    items.filter(
      (i) => i.type !== 'file' && i.type !== 'box' && (i.box || '').trim() === name
    ).length;

  // Build a QR image for each box name.
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
          .sheet.print-one .label { display: none !important; }
          .sheet.print-one .label[data-print="yes"] { display: flex !important; }
          @page { margin: 12mm; }
        }
      `}</style>

      <header className="noprint" style={{ background: colors.ink, padding: '24px 22px' }}>
        <div style={{ color: colors.brand, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
          Log&amp;List
        </div>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>Box labels</h1>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 6 }}>
          Create a box, print its code, stick it on. Scan it later to see what's inside.
        </div>
      </header>

      <main style={{ padding: 20 }}>
        {/* Create a new box */}
        <div className="noprint" style={{ background: colors.bgAlt, borderRadius: 14, padding: 16, marginBottom: 22 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: colors.inkFaint, marginBottom: 8 }}>
            CREATE A NEW BOX
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') addBox(); }}
              placeholder="Name the box"
              style={{ flex: 1, minWidth: 0, padding: 12, border: '1.5px solid ' + colors.line, borderRadius: 10, background: '#fff', fontSize: 14, boxSizing: 'border-box' }}
            />
            <button
              onClick={addBox}
              disabled={!newName.trim() || adding}
              style={{ flex: '0 0 auto', padding: '12px 16px', whiteSpace: 'nowrap', background: colors.ink, color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer', opacity: newName.trim() && !adding ? 1 : 0.5 }}
            >
              {adding ? 'Adding...' : 'Add box'}
            </button>
          </div>
        </div>

        {!loaded && <p style={{ color: colors.inkFaint, textAlign: 'center', marginTop: 40 }}>Loading...</p>}
        {error && <p style={{ color: colors.accent, fontSize: 14, marginTop: 4, marginBottom: 16 }}>{error}</p>}
        {notice && <p style={{ color: '#0F7A54', fontSize: 14, marginTop: 4, marginBottom: 16, fontWeight: 600 }}>{notice}</p>}

        {loaded && boxNames.length === 0 && (
          <p style={{ color: colors.inkFaint, textAlign: 'center', marginTop: 20, fontSize: 15, lineHeight: 1.5, padding: '0 20px' }}>
            No boxes yet. Create one above and its printable QR will appear right here.
          </p>
        )}

        {loaded && boxNames.length > 0 && (
          <>
            <div className="noprint" style={{ marginBottom: 20 }}>
              <button
                onClick={() => window.print()}
                style={{ background: colors.brand, color: colors.ink, border: 'none', borderRadius: 999, padding: '12px 22px', fontWeight: 700, fontSize: 14.5, cursor: 'pointer' }}
              >
                Print labels
              </button>
              <span style={{ color: colors.inkFaint, fontSize: 13, marginLeft: 12 }}>
                {boxNames.length} {boxNames.length === 1 ? 'box' : 'boxes'}
              </span>
            </div>

            <div className={"sheet" + (printOnly ? " print-one" : "")} style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
              {boxNames.map((name) => (
                <div
                  key={name}
                  className="label"
                  data-print={printOnly === name ? 'yes' : 'no'}
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
                  <div className="noprint" style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button
                      type="button"
                      onClick={() => printLabel(name)}
                      style={{ background: 'transparent', border: '1.5px solid ' + colors.line, color: colors.ink, borderRadius: 999, padding: '7px 14px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}
                    >
                      Print
                    </button>
                    <button
                      type="button"
                      onClick={() => shareLabel(name)}
                      disabled={!qrMap[name]}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, background: colors.ink, border: '1.5px solid ' + colors.ink, color: '#fff', borderRadius: 999, padding: '7px 14px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', opacity: qrMap[name] ? 1 : 0.5 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
                      </svg>
                      Share
                    </button>
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
