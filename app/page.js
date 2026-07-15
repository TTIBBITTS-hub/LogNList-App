'use client';

import { useState, useEffect } from 'react';

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
  return words.slice(0, maxWords).join(' ') + '&hellip;';
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
        (copied ? ' and copied the listing text to your clipboard.' : ' &mdash; clipboard copy failed, use the fields below instead.')
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
    setNotice(ok ? `${field.charAt(0).toUpperCase() + field.slice(1)} copied.` : "Couldn't copy &mdash; select the text manually.");
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
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', paddingBottom: 80, background: colors.bg, minHeight: '100vh' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: colors.bg }}>
        <header style={{ background: colors.ink, padding: '26px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ color: '#fff', fontWeight: 800, fontSize: 26, letterSpacing: '-0.01em' }}>LogNList</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Log it. List it. Find it again.</div>
        </header>

        <nav style={{ display: 'flex', background: colors.ink, padding: '0 12px 12px' }}>
          {['log', 'inventory', 'find'].map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(null); }}
              style={{
                flex: 1, padding: '10px 6px', margin: '0 3px', background: tab === t ? 'rgba(255,255,255,0.12)' : 'transparent',
                border: 'none', borderRadius: 999,
                color: tab === t ? '#fff' : 'rgba(255,255,255,0.5)',
                fontWeight: 600, fontSize: 12.5, letterSpacing: '0.04em', cursor: 'pointer',
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
                <input placeholder="What is it? (leave blank to identify from photo)" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
                <div style={{ display: 'flex', gap: 10 }}>
                  <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle} />
                  <input placeholder="Box / location" value={box} onChange={(e) => setBox(e.target.value)} style={inputStyle} list="box-suggestions" />
                </div>
                <textarea placeholder="Condition / notes" value={notes} onChange={(e) => setNotes(e.target.value)} style={{ ...inputStyle, minHeight: 64, resize: 'vertical' }} />

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
                <input placeholder="Box 3, garage shelf..." value={box} onChange={(e) => setBox(e.target.value)} style={inputStyle} list="box-suggestions" />
                <textarea placeholder="What's in this box?" value={boxDescription} onChange={(e) => setBoxDescription(e.target.value)} style={{ ...inputStyle, minHeight: 88, resize: 'vertical' }} />

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
                const sc = statusColors[item.status] || statusColors.logged;
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
                    <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 4 }}>{limitWords(item.name || 'Unidentified item', 6)}</div>
                    <div style={{ fontSize: 12, color: colors.inkFaint, fontWeight: 500 }}>BOX: {item.box}</div>
                    <span style={{ display: 'inline-block', marginTop: 8, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', padding: '3px 8px', borderRadius: 999, background: sc.bg, color: sc.text }}>
                      {item.status?.toUpperCase()}
                    </span>
                  </div>
                );
              })}
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
              {openItem.photos?.length > 0 && (
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
                  {openItem.photos.map((p, i) => (
                    <div key={i} style={{ position: 'relative', flex: openItem.photos.length === 1 ? '1 1 100%' : '1 1 0' }}>
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
                </div>
              )}

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

const photoRemoveBtn = {
  position: 'absolute', top: 6, right: 6, width: 26, height: 26,
  borderRadius: '50%', border: 'none', cursor: 'pointer',
  background: 'rgba(0,0,0,0.6)', color: '#fff',
  fontSize: 17, lineHeight: 1, fontWeight: 700,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 0, zIndex: 2,
};
const inputStyle = {
  width: '100%', padding: 12, marginBottom: 12, border: `1.5px solid ${colors.line}`,
  borderRadius: 10, background: colors.bgAlt, fontSize: 14, boxSizing: 'border-box',
};
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
