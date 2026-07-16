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
        <header style={{ background: colors.ink, padding: '30px 24px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px 16px' }}>
          <img
            src={LOGO_GRAPHIC}
            alt=""
            style={{ height: 72, width: 'auto', display: 'block', flexShrink: 0 }}
          />
          <img
            src={LOGO_WORDMARK}
            alt="LogNList"
            style={{ height: 38, width: 'auto', display: 'block' }}
          />
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
