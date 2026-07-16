'use client';

import { useState, useEffect } from 'react';

// LogNList wordmark, inlined so there's no public/ folder to get wrong.
// The phone-and-box mark, inlined alongside the wordmark.
const LOGO_GRAPHIC = 'data:image/png;base64,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';

const LOGO_WORDMARK = 'data:image/png;base64,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';

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
};

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxW = 480;
        const scale = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.6));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function slugify(text) {
  return (text || 'item').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 40) || 'item';
}

function limitWords(text, maxWords) {
  const words = (text || '').trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '\u2026';
}

function downloadItemPhotos(item) {
  const photos = item.photos || [];
  const slug = slugify(item.name || 'item');
  photos.forEach((photo, idx) => {
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = photo;
      a.download = `${slug}-photo-${idx + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, idx * 400);
  });
  return photos.length;
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e2) {
      return false;
    }
  }
}

export default function Home() {
  const [tab, setTab] = useState('log');
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  const [listening, setListening] = useState(null);

  function startVoice(field, setter) {
    const Ctor =
      typeof window !== 'undefined' &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!Ctor) {
      setError("Voice input isn't supported in this browser. Try Chrome, or just type instead.");
      return;
    }
    if (listening) return; // already listening

    const recognition = new Ctor();
    recognition.lang = navigator.language || 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(field);

    recognition.onresult = (event) => {
      const transcript = (event.results[0][0].transcript || '').trim();
      if (transcript) {
        setter((cur) => (cur && cur.trim() ? cur.trim() + ' ' + transcript : transcript));
      }
    };
    recognition.onerror = () => {
      // Fails quietly — you can try again or just type.
    };
    recognition.onend = () => setListening(null);

    try {
      recognition.start();
    } catch (e) {
      setListening(null);
    }
  }

  const [logMode, setLogMode] = useState('item'); // 'item' or 'box'

  // Distinct box/location names already in use, most recent first.
  const recentBoxes = Array.from(
    new Set(items.map((i) => (i.box || '').trim()).filter(Boolean))
  ).slice(0, 20);

  const [photos, setPhotos] = useState([null, null, null]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [box, setBox] = useState('');
  const [notes, setNotes] = useState('');
  const [boxDescription, setBoxDescription] = useState('');

  const [openItem, setOpenItem] = useState(null);
  const [valuationLoading, setValuationLoading] = useState(false);
  const [askingPrice, setAskingPrice] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const res = await fetch('/api/items');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setItems(data.items || []);
    } catch (e) {
      setError('Could not load items: ' + e.message);
    }
    setLoaded(true);
  }

  async function handlePhotoChange(e, slot) {
    const file = e.target.files[0];
    if (!file) return;
    const dataUrl = await compressImage(file);
    setPhotos((prev) => {
      const next = [...prev];
      next[slot] = dataUrl;
      return next;
    });
  }

  function removePhoto(slot) {
    setPhotos((prev) => {
      const next = [...prev];
      next[slot] = null;
      return next;
    });
    setError(null);
  }

  async function removeSavedPhoto(item, index) {
    const next = (item.photos || []).filter((_, i) => i !== index);
    try {
      const res = await fetch('/api/items/' + item.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos: next }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setOpenItem(data.item);
      await loadItems();
    } catch (e) {
      setError('Could not remove photo: ' + e.message);
    }
  }

  async function addSavedPhoto(item, e) {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const current = item.photos || [];
    if (current.length >= 3) {
      setError('Three photos is the limit — remove one first.');
      return;
    }
    try {
      const dataUrl = await compressImage(file);
      const res = await fetch('/api/items/' + item.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos: [...current, dataUrl] }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setOpenItem(data.item);
      setError(null);
      await loadItems();
    } catch (err) {
      setError("Couldn't add that photo: " + err.message);
    }
  }

  function exportBackup() {
    const payload = {
      exportedAt: new Date().toISOString(),
      app: 'LogNList',
      itemCount: items.length,
      items,
    };
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().slice(0, 10);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lognlist-backup-' + dateStr + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    setNotice(`Exported ${items.length} item${items.length === 1 ? '' : 's'}.`);
  }

  async function submitLog(alsoList) {
    if (!box.trim()) {
      setError('Give the item a box or location before logging it.');
      return;
    }
    const hasPhoto = photos.some(Boolean);
    if (!name.trim() && !hasPhoto) {
      setError('Add a photo or type what it is.');
      return;
    }
    setError(null);
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'item',
          name: name.trim(),
          category: category.trim(),
          box: box.trim(),
          notes: notes.trim(),
          photos: photos.filter(Boolean),
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setPhotos([null, null, null]);
      setName('');
      setCategory('');
      setBox('');
      setNotes('');
      setTab('inventory');
      await loadItems();

      if (alsoList) setOpenItem(data.item);
    } catch (e) {
      setError('Save failed: ' + e.message);
    }
  }

  function resetLogForm() {
    setPhotos([null, null, null]);
    setName('');
    setCategory('');
    setBox('');
    setNotes('');
    setBoxDescription('');
  }

  async function submitLogBox() {
    if (!box.trim()) {
      setError('Give the box a location before logging it.');
      return;
    }
    const hasPhoto = photos.some(Boolean);
    if (!boxDescription.trim() && !hasPhoto) {
      setError("Add a photo or a quick description — I need one of the two to record what's in this box.");
      return;
    }
    setError(null);
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'box',
          name: '',
          category: '',
          box: box.trim(),
          notes: boxDescription.trim(),
          photos: photos.filter(Boolean),
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      resetLogForm();
      setTab('inventory');
      await loadItems();
    } catch (e) {
      setError('Save failed: ' + e.message);
    }
  }

  async function runValuation(item, mode) {
    setValuationLoading(true);
    try {
      const res = await fetch('/api/valuate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: item.name,
          category: item.category,
          notes: item.notes,
          photos: item.photos,
          mode: mode || 'deep',
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const estimate = {
        low: data.result.estimate_low,
        high: data.result.estimate_high,
        currency: data.result.currency || 'NZD',
        suggested: data.result.suggested_price,
        newPrice: data.result.new_price,
        sourcesChecked: data.result.sources_checked || [],
        reasoning: data.result.reasoning,
      };
      const listing = {
        title: data.result.listing_title,
        description: data.result.listing_description,
      };

      const patchRes = await fetch(`/api/items/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: item.name || data.result.identified_item,
          category: item.category || data.result.identified_category,
          estimate,
          listing,
        }),
      });
      const patched = await patchRes.json();
      setOpenItem(patched.item);
      await loadItems();
    } catch (e) {
      setError('Valuation failed: ' + e.message);
    }
    setValuationLoading(false);
  }

  async function confirmListing(item, price) {
    try {
      const listing = { ...item.listing, price };
      const res = await fetch(`/api/items/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'listed', listing }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setOpenItem(data.item);
      await loadItems();

      const photoCount = downloadItemPhotos(data.item);
      const text = `${data.item.listing.title || ''}\n\nPrice: $${price}\n\n${data.item.listing.description || ''}`;
      const copied = await copyToClipboard(text);
      setNotice(
        `Listed! Downloaded ${photoCount} photo${photoCount === 1 ? '' : 's'}` +
        (copied ? ' and copied the listing text to your clipboard.' : ' \u2014 clipboard copy failed, use the fields below instead.')
      );
      try { window.open('https://www.facebook.com/marketplace/create/item', '_blank'); } catch (e) {}
    } catch (e) {
      setError('Could not confirm listing: ' + e.message);
    }
  }

  async function markSold(item) {
    const res = await fetch(`/api/items/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'sold' }),
    });
    const data = await res.json();
    setOpenItem(data.item);
    await loadItems();
  }

  async function unlistItem(item) {
    const res = await fetch(`/api/items/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'logged' }),
    });
    const data = await res.json();
    setOpenItem(data.item);
    await loadItems();
  }

  async function copyField(item, field) {
    let value = '';
    if (field === 'title') value = item.listing.title || '';
    else if (field === 'price') value = String(item.listing.price ?? '');
    else if (field === 'description') value = item.listing.description || '';
    const ok = await copyToClipboard(value);
    setNotice(ok ? `${field.charAt(0).toUpperCase() + field.slice(1)} copied.` : "Couldn't copy \u2014 select the text manually.");
  }

  async function deleteItem(id) {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    setOpenItem(null);
    await loadItems();
  }

  const statusColors = {
    logged: { bg: colors.bgAlt, text: colors.inkSoft },
    listed: { bg: colors.successBg, text: colors.success },
    sold: { bg: '#FBEAEC', text: colors.accent },
    box: { bg: '#EFE9F7', text: '#6B4FA0' },
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', paddingBottom: 80, background: colors.bg, minHeight: '100vh' }}>
      <style>{`
        @keyframes mic-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(227,25,55,0.35); }
          50%      { box-shadow: 0 0 0 7px rgba(227,25,55,0); }
        }
        .mic-btn.listening { animation: mic-pulse 1s ease-in-out infinite; }
        .mic-btn:not(.listening):hover { background: #E3E3E5; }
      `}</style>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: colors.bg }}>
        <header style={{ background: colors.ink, padding: '34px 24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <img
              src={LOGO_GRAPHIC}
              alt=""
              style={{ height: 56, width: 'auto', display: 'block', flexShrink: 0 }}
            />
            <img
              src={LOGO_WORDMARK}
              alt="LogNList"
              style={{ height: 34, width: 'auto', display: 'block' }}
            />
          </div>
          <div style={{ color: 'rgba(255,255,255,0.62)', fontSize: 13, letterSpacing: '0.01em', fontWeight: 400, textAlign: 'right' }}>Log it. List it. Find it again.</div>
        </header>

        <nav style={{ display: 'flex', background: colors.bg, borderBottom: `1px solid ${colors.line}` }}>
          {['log', 'inventory', 'find'].map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(null); }}
              style={{
                flex: 1, background: 'transparent', border: 'none',
                borderBottom: `2px solid ${tab === t ? colors.ink : 'transparent'}`,
                color: tab === t ? colors.ink : colors.inkFaint,
                fontWeight: 600, fontSize: 12.5, letterSpacing: '0.08em',
                padding: '15px 6px 13px', cursor: 'pointer',
                transition: 'color 0.15s ease',
              }}
            >
              {t === 'log' ? 'LOG IT' : t === 'inventory' ? 'LOGNLIST' : 'FIND IT'}
            </button>
          ))}
        </nav>
      </div>

      <main style={{ padding: 20 }}>
        {error && <p style={{ color: colors.accent, fontSize: 13, marginBottom: 14 }}>{error}</p>}
        {notice && <p style={{ color: colors.success, fontSize: 13, marginBottom: 14, fontWeight: 600 }}>{notice}</p>}

        {!loaded && <p style={{ color: colors.inkFaint, textAlign: 'center', marginTop: 40 }}>Loading...</p>}

        {loaded && tab === 'log' && (
          <div>
            <div style={{ display: 'flex', gap: 6, background: colors.bgAlt, borderRadius: 999, padding: 4, marginBottom: 18 }}>
              {[
                { key: 'item', label: 'Single Item' },
                { key: 'box', label: 'Log a Box' },
              ].map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => { setLogMode(m.key); setError(null); }}
                  style={{
                    flex: 1, padding: '10px 6px', borderRadius: 999, border: 'none', cursor: 'pointer',
                    fontSize: 13.5, fontWeight: 600,
                    background: logMode === m.key ? colors.ink : 'transparent',
                    color: logMode === m.key ? '#fff' : colors.inkFaint,
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 6 }}>
              {[0, 1, 2].map((slot) => (
                <div key={slot} style={{ position: 'relative', aspectRatio: '1' }}>
                  <label style={{ display: 'block', width: '100%', height: '100%', background: colors.bgAlt, borderRadius: 14, overflow: 'hidden', cursor: 'pointer' }}>
                    {photos[slot] ? (
                      <img src={photos[slot]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: colors.inkFaint, fontWeight: 500 }}>Add</div>
                    )}
                    <input type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={(e) => handlePhotoChange(e, slot)} />
                  </label>
                  {photos[slot] && (
                    <button
                      type="button"
                      onClick={() => removePhoto(slot)}
                      title="Remove this photo"
                      aria-label="Remove this photo"
                      style={photoRemoveBtn}
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: colors.inkFaint, margin: '0 0 18px' }}>
              {logMode === 'box'
                ? "A couple of photos of what's inside is plenty — this is a quick record, not a listing."
                : 'Up to 3 photos — different angles help give a more accurate valuation.'}
            </p>

            {logMode === 'item' ? (
              <>
                <div style={fieldWrap}>
                  <input placeholder="What is it? (leave blank to identify from photo)" value={name} onChange={(e) => setName(e.target.value)} style={micInputStyle} />
                  <MicButton active={listening === 'name'} onClick={() => startVoice('name', setName)} />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ ...fieldWrap, flex: 1 }}>
                    <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} style={micInputStyle} />
                    <MicButton active={listening === 'category'} onClick={() => startVoice('category', setCategory)} />
                  </div>
                  <div style={{ ...fieldWrap, flex: 1 }}>
                    <input placeholder="Box / location" value={box} onChange={(e) => setBox(e.target.value)} style={micInputStyle} list="box-suggestions" />
                    <MicButton active={listening === 'box'} onClick={() => startVoice('box', setBox)} />
                  </div>
                </div>
                <div style={fieldWrap}>
                  <textarea placeholder="Condition / notes" value={notes} onChange={(e) => setNotes(e.target.value)} style={{ ...micInputStyle, minHeight: 64, resize: 'vertical', display: 'block' }} />
                  <MicButton textarea active={listening === 'notes'} onClick={() => startVoice('notes', setNotes)} />
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                  <button onClick={() => submitLog(false)} style={outlineBtn}>Log it</button>
                  <button onClick={() => submitLog(true)} style={primaryBtn}>Log N List</button>
                </div>
                <p style={{ fontSize: 12, color: colors.inkFaint, textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
                  <strong>Log it</strong> just records what it is and where it lives. <strong>Log N List</strong> saves it and opens it so you can run a valuation.
                </p>
              </>
            ) : (
              <>
                <div style={fieldWrap}>
                  <input placeholder="Box 3, garage shelf..." value={box} onChange={(e) => setBox(e.target.value)} style={micInputStyle} list="box-suggestions" />
                  <MicButton active={listening === 'box'} onClick={() => startVoice('box', setBox)} />
                </div>
                <div style={fieldWrap}>
                  <textarea placeholder="What's in this box?" value={boxDescription} onChange={(e) => setBoxDescription(e.target.value)} style={{ ...micInputStyle, minHeight: 88, resize: 'vertical', display: 'block' }} />
                  <MicButton textarea active={listening === 'boxDescription'} onClick={() => startVoice('boxDescription', setBoxDescription)} />
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                  <button onClick={submitLogBox} style={primaryBtn}>Log the box</button>
                </div>
                <p style={{ fontSize: 12, color: colors.inkFaint, textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
                  A box is a quick record of what&apos;s where — no valuation, no listing. Log the whole lot in one go.
                </p>
              </>
            )}

            <datalist id="box-suggestions">
              {recentBoxes.map((b) => <option key={b} value={b} />)}
            </datalist>
          </div>
        )}

        {loaded && tab === 'inventory' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>LogNList ({items.length})</h2>
            {items.length === 0 && <p style={{ color: colors.inkFaint, textAlign: 'center', marginTop: 30 }}>Nothing logged yet.</p>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14 }}>
              {items.map((item) => {
                const isBox = item.type === 'box';
                const sc = isBox ? statusColors.box : (statusColors[item.status] || statusColors.logged);
                return (
                  <div
                    key={item.id}
                    onClick={() => { setOpenItem(item); setNotice(null); }}
                    style={{ background: '#fff', border: `1px solid ${colors.line}`, borderRadius: 14, padding: 12, cursor: 'pointer', position: 'relative', boxShadow: '0 1px 3px rgba(23,26,32,0.04)' }}
                  >
                    {item.status === 'listed' && item.listing?.price != null && (
                      <div style={{ position: 'absolute', top: 10, right: 10, background: colors.success, color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999 }}>
                        ${item.listing.price}
                      </div>
                    )}
                    {item.photos?.[0] ? (
                      <img src={item.photos[0]} alt="" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 9, marginBottom: 10, background: colors.bgAlt }} />
                    ) : (
                      <div style={{ width: 50, height: 50, background: colors.bgAlt, borderRadius: 9, marginBottom: 10 }} />
                    )}
                    <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 4 }}>
                      {isBox
                        ? limitWords(item.notes || 'Mixed box', 6)
                        : limitWords(item.name || 'Unidentified item', 6)}
                    </div>
                    <div style={{ fontSize: 12, color: colors.inkFaint, fontWeight: 500 }}>BOX: {item.box}</div>
                    <span style={{ display: 'inline-block', marginTop: 8, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', padding: '3px 8px', borderRadius: 999, background: sc.bg, color: sc.text }}>
                      {isBox ? 'MIXED BOX' : item.status?.toUpperCase()}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: 28, paddingTop: 18, borderTop: `1px solid ${colors.line}` }}>
              <button
                type="button"
                onClick={exportBackup}
                disabled={items.length === 0}
                style={{
                  background: 'none', border: 'none',
                  color: colors.inkFaint, fontSize: 12,
                  cursor: items.length === 0 ? 'default' : 'pointer',
                  padding: '4px 6px', textDecoration: 'underline', textUnderlineOffset: 2,
                  opacity: items.length === 0 ? 0.5 : 1,
                }}
              >
                Export backup
              </button>
            </div>
          </div>
        )}
        {loaded && tab === 'find' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Find it</h2>
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => { setOpenItem(item); setNotice(null); }}
                style={{ background: '#fff', border: `1px solid ${colors.line}`, borderRadius: 12, padding: '12px 14px', marginBottom: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}
              >
                {item.photos?.[0] ? (
                  <img src={item.photos[0]} alt="" style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 8, background: colors.bgAlt }} />
                ) : (
                  <div style={{ width: 44, height: 44, background: colors.bgAlt, borderRadius: 8 }} />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name || 'Unidentified item'}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 700, color: colors.accent }}>{item.box}</div>
                  <div style={{ fontSize: 10, color: colors.inkFaint, textTransform: 'uppercase' }}>location</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {openItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(23,26,32,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 640, maxHeight: '88vh', overflowY: 'auto', borderRadius: '24px 24px 0 0', padding: 0 }}>
            <div style={{ background: colors.ink, padding: '14px 16px', borderRadius: '24px 24px 0 0' }}>
              <button
                onClick={() => { setOpenItem(null); setNotice(null); }}
                style={{ background: 'transparent', border: 'none', color: '#fff', fontWeight: 600, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                &larr; Back
              </button>
            </div>

            <div style={{ padding: 20 }}>
              {(() => {
                const pics = openItem.photos || [];
                return (
                  <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
                    {pics.map((p, i) => (
                      <div key={i} style={{ position: 'relative', flex: pics.length === 1 ? '1 1 100%' : '1 1 0', minWidth: 120 }}>
                        <img src={p} alt="" style={{ width: '100%', height: 180, borderRadius: 16, objectFit: 'cover', display: 'block' }} />
                        <button
                          type="button"
                          onClick={() => removeSavedPhoto(openItem, i)}
                          title="Remove this photo"
                          aria-label="Remove this photo"
                          style={photoRemoveBtn}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    {pics.length < 3 && (
                      <label
                        style={{
                          flex: pics.length === 0 ? '1 1 100%' : '0 0 120px',
                          height: 180, borderRadius: 16, background: colors.bgAlt,
                          border: `1.5px dashed ${colors.line}`, cursor: 'pointer',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          gap: 4, color: colors.inkFaint, fontSize: 13, fontWeight: 600,
                        }}
                      >
                        <span style={{ fontSize: 22, lineHeight: 1 }}>+</span>
                        {pics.length === 0 ? 'Add a photo' : 'Add'}
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          style={{ display: 'none' }}
                          onChange={(e) => addSavedPhoto(openItem, e)}
                        />
                      </label>
                    )}
                  </div>
                );
              })()}

              <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 6px' }}>{openItem.name || 'Unidentified item'}</h3>
              <p style={{ color: colors.inkFaint, fontSize: 13, marginBottom: 16 }}>
                Box: {openItem.box} &middot; {openItem.category || 'uncategorised'}
              </p>

              {openItem.estimate ? (
                <div style={{ background: colors.bgAlt, borderRadius: 14, padding: 16, marginBottom: 14 }}>
                  <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: colors.inkFaint, fontWeight: 600, marginBottom: 4 }}>Estimated resale range</div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: colors.success }}>
                    ${openItem.estimate.low} &ndash; ${openItem.estimate.high} {openItem.estimate.currency}
                  </div>
                  {openItem.estimate.newPrice && (
                    <div style={{ fontSize: 13, color: colors.inkSoft, marginTop: 8, fontWeight: 600 }}>New today (RRP): ~${openItem.estimate.newPrice} {openItem.estimate.currency}</div>
                  )}
                  {openItem.estimate.reasoning && (
                    <div style={{ fontSize: 13, color: colors.inkSoft, marginTop: 10, lineHeight: 1.55 }}>{openItem.estimate.reasoning}</div>
                  )}

                  {openItem.listing && (
                    <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginTop: 14 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{openItem.listing.title}</div>
                      <div style={{ fontSize: 13.5, color: colors.inkSoft, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{openItem.listing.description}</div>
                    </div>
                  )}

                  {openItem.status !== 'listed' && openItem.status !== 'sold' && (
                    <div style={{ marginTop: 14 }}>
                      <div style={{ fontSize: 12, color: colors.inkFaint, marginBottom: 8, fontWeight: 600 }}>Ready to sell? Pick a price:</div>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                        <button onClick={() => confirmListing(openItem, openItem.estimate.low)} style={priceChoiceBtn}>${openItem.estimate.low}<div style={priceChoiceLabel}>Min</div></button>
                        <button onClick={() => confirmListing(openItem, Math.round((openItem.estimate.low + openItem.estimate.high) / 2))} style={{ ...priceChoiceBtn, background: colors.ink, color: '#fff' }}>${Math.round((openItem.estimate.low + openItem.estimate.high) / 2)}<div style={{ ...priceChoiceLabel, color: 'rgba(255,255,255,0.7)' }}>Mid</div></button>
                        <button onClick={() => confirmListing(openItem, openItem.estimate.high)} style={priceChoiceBtn}>${openItem.estimate.high}<div style={priceChoiceLabel}>Max</div></button>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input
                          type="number"
                          placeholder="Or set your own price"
                          value={askingPrice}
                          onChange={(e) => setAskingPrice(e.target.value)}
                          style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                        />
                        <button
                          onClick={() => { if (askingPrice) confirmListing(openItem, Number(askingPrice)); }}
                          style={{ ...outlineBtn, flex: '0 0 auto', width: 'auto', padding: '0 18px' }}
                        >
                          Set
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                  <button disabled={valuationLoading} onClick={() => runValuation(openItem, 'deep')} style={primaryBtn}>
                    {valuationLoading ? 'Working...' : 'Deep Dive'}
                  </button>
                  <button disabled={valuationLoading} onClick={() => runValuation(openItem, 'quick')} style={outlineBtn}>
                    Quick Valuation
                  </button>
                </div>
              )}

              {openItem.status === 'listed' && openItem.listing && (
                <div style={{ background: colors.bgAlt, borderRadius: 14, padding: 16, marginBottom: 14 }}>
                  <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: colors.inkFaint, fontWeight: 600, marginBottom: 10 }}>Sell on Facebook Marketplace</div>
                  <p style={{ fontSize: 12, color: colors.inkFaint, margin: '0 0 10px' }}>Copy each field into the matching box on Facebook's create-listing form.</p>

                  {['title', 'price', 'description'].map((field) => (
                    <div key={field} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 10, padding: '10px 12px', marginBottom: 8 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em', color: colors.inkFaint, fontWeight: 600, marginBottom: 2 }}>{field}</div>
                        <div style={{ fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          {field === 'price' ? `$${openItem.listing.price ?? ''}` : openItem.listing[field]}
                        </div>
                      </div>
                      <button onClick={() => copyField(openItem, field)} style={{ ...outlineBtn, width: 'auto', flex: '0 0 auto', padding: '8px 14px', fontSize: 13 }}>Copy</button>
                    </div>
                  ))}

                  <a
                    href="https://www.facebook.com/marketplace/create/item"
                    target="_blank"
                    rel="noopener"
                    style={{ display: 'block', textAlign: 'center', marginTop: 10, padding: 14, background: colors.ink, color: '#fff', borderRadius: 999, fontWeight: 600, textDecoration: 'none', fontSize: 14.5 }}
                  >
                    Open Facebook Marketplace &#8599;
                  </a>
                </div>
              )}

              {openItem.status === 'listed' && (
                <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                  <button onClick={() => markSold(openItem)} style={outlineBtn}>Mark as sold</button>
                  <button onClick={() => unlistItem(openItem)} style={outlineBtn}>Unlist</button>
                </div>
              )}

              <button
                onClick={() => deleteItem(openItem.id)}
                style={{ ...outlineBtn, color: colors.accent, borderColor: colors.accent }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MicButton({ active, onClick, textarea }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Speak to fill this in"
      aria-label="Speak to fill this in"
      className={active ? 'mic-btn listening' : 'mic-btn'}
      style={{
        position: 'absolute',
        right: 6,
        ...(textarea ? { top: 14 } : { top: '50%', transform: 'translateY(-50%)' }),
        width: 32, height: 32, borderRadius: '50%', border: 'none',
        background: active ? colors.accent : colors.bgAlt,
        color: active ? '#fff' : colors.inkSoft,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', padding: 0, zIndex: 2,
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 16, height: 16 }}>
        <rect x="9" y="2" width="6" height="12" rx="3" />
        <path d="M5 10a7 7 0 0 0 14 0" />
        <path d="M12 17v5M8 22h8" />
      </svg>
    </button>
  );
}

const photoRemoveBtn = {
  position: 'absolute', top: 6, right: 6, width: 26, height: 26,
  borderRadius: '50%', border: 'none', cursor: 'pointer',
  background: 'rgba(0,0,0,0.6)', color: '#fff',
  fontSize: 17, lineHeight: 1, fontWeight: 700,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 0, zIndex: 2,
};
const fieldWrap = { position: 'relative', marginBottom: 12 };
const inputStyle = {
  width: '100%', padding: 12, marginBottom: 12, border: `1.5px solid ${colors.line}`,
  borderRadius: 10, background: colors.bgAlt, fontSize: 14, boxSizing: 'border-box',
};
const micInputStyle = { ...inputStyle, marginBottom: 0, paddingRight: 44 };
const primaryBtn = {
  flex: 1, padding: 14, background: colors.ink, color: '#fff', border: 'none',
  borderRadius: 999, fontWeight: 600, cursor: 'pointer', fontSize: 14.5,
};
const outlineBtn = {
  flex: 1, padding: 14, background: 'transparent', color: colors.ink, border: `1.5px solid ${colors.line}`,
  borderRadius: 999, fontWeight: 600, cursor: 'pointer', fontSize: 14.5,
};
const priceChoiceBtn = {
  flex: 1, padding: '12px 8px', background: '#fff', color: colors.ink, border: `1.5px solid ${colors.line}`,
  borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: 15, textAlign: 'center',
};
const priceChoiceLabel = {
  fontSize: 10, fontWeight: 600, color: colors.inkFaint, marginTop: 2, textTransform: 'uppercase',
};
