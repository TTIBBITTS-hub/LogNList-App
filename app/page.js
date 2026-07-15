'use client';

import { useState, useEffect } from 'react';

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

export default function Home() {
  const [tab, setTab] = useState('log');
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  const [photos, setPhotos] = useState([null, null, null]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [box, setBox] = useState('');
  const [notes, setNotes] = useState('');

  const [openItem, setOpenItem] = useState(null);
  const [valuationLoading, setValuationLoading] = useState(false);

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

  async function deleteItem(id) {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    setOpenItem(null);
    await loadItems();
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', paddingBottom: 80 }}>
      <header style={{ background: '#171A20', padding: '24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#fff', fontWeight: 800, fontSize: 26 }}>Log&List</div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Log it. List it. Find it again.</div>
      </header>

      <nav style={{ display: 'flex', background: '#171A20' }}>
        {['log', 'inventory', 'find'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1, padding: '14px 6px', background: 'transparent', border: 'none',
              color: tab === t ? '#fff' : 'rgba(255,255,255,0.5)',
              borderBottom: tab === t ? '2px solid #E31937' : '2px solid transparent',
              fontWeight: 600, fontSize: 13, cursor: 'pointer',
            }}
          >
            {t === 'log' ? 'LOG IT' : t === 'inventory' ? 'LOG&LIST' : 'FIND IT'}
          </button>
        ))}
      </nav>

      <main style={{ padding: 20 }}>
        {error && <p style={{ color: '#E31937', fontSize: 13 }}>{error}</p>}

        {!loaded && <p>Loading...</p>}

        {loaded && tab === 'log' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
              {[0, 1, 2].map((slot) => (
                <label key={slot} style={{ display: 'block', aspectRatio: '1', background: '#F4F4F5', borderRadius: 14, overflow: 'hidden', cursor: 'pointer' }}>
                  {photos[slot] ? (
                    <img src={photos[slot]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#98999D' }}>Add</div>
                  )}
                  <input type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={(e) => handlePhotoChange(e, slot)} />
                </label>
              ))}
            </div>

            <input placeholder="What is it? (leave blank to identify from photo)" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
            <div style={{ display: 'flex', gap: 10 }}>
              <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle} />
              <input placeholder="Box / location" value={box} onChange={(e) => setBox(e.target.value)} style={inputStyle} />
            </div>
            <textarea placeholder="Condition / notes" value={notes} onChange={(e) => setNotes(e.target.value)} style={{ ...inputStyle, minHeight: 60 }} />

            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button onClick={() => submitLog(false)} style={outlineBtn}>Log it</button>
              <button onClick={() => submitLog(true)} style={primaryBtn}>Log N List</button>
            </div>
          </div>
        )}

        {loaded && tab === 'inventory' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
            {items.length === 0 && <p>Nothing logged yet.</p>}
            {items.map((item) => (
              <div key={item.id} onClick={() => setOpenItem(item)} style={{ background: '#fff', border: '1px solid #E7E7E8', borderRadius: 14, padding: 10, cursor: 'pointer' }}>
                {item.photos?.[0] ? (
                  <img src={item.photos[0]} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
                ) : (
                  <div style={{ width: 48, height: 48, background: '#F4F4F5', borderRadius: 8, marginBottom: 8 }} />
                )}
                <div style={{ fontWeight: 600, fontSize: 13 }}>{item.name || 'Unidentified item'}</div>
                <div style={{ fontSize: 11, color: '#98999D' }}>BOX: {item.box}</div>
              </div>
            ))}
          </div>
        )}

        {loaded && tab === 'find' && (
          <div>
            {items.map((item) => (
              <div key={item.id} onClick={() => setOpenItem(item)} style={{ padding: 12, borderLeft: '3px solid #171A20', marginBottom: 8, cursor: 'pointer' }}>
                <strong>{item.name || 'Unidentified item'}</strong> — Box {item.box}
              </div>
            ))}
          </div>
        )}
      </main>

      {openItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 640, maxHeight: '85vh', overflowY: 'auto', borderRadius: '20px 20px 0 0', padding: 20 }}>
            <button onClick={() => setOpenItem(null)} style={{ marginBottom: 12 }}>&larr; Back</button>
            <h3>{openItem.name || 'Unidentified item'}</h3>
            <p style={{ color: '#666', fontSize: 13 }}>Box: {openItem.box} &middot; {openItem.category}</p>

            {openItem.estimate ? (
              <div style={{ background: '#F4F4F5', borderRadius: 12, padding: 14, marginBottom: 12 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#0F7A54' }}>
                  ${openItem.estimate.low} &ndash; ${openItem.estimate.high} {openItem.estimate.currency}
                </div>
                {openItem.listing && (
                  <>
                    <p style={{ fontWeight: 700, marginTop: 10 }}>{openItem.listing.title}</p>
                    <p style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{openItem.listing.description}</p>
                  </>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 10 }}>
                <button disabled={valuationLoading} onClick={() => runValuation(openItem, 'deep')} style={primaryBtn}>
                  {valuationLoading ? 'Working...' : 'Deep Dive'}
                </button>
                <button disabled={valuationLoading} onClick={() => runValuation(openItem, 'quick')} style={outlineBtn}>
                  Quick Valuation
                </button>
              </div>
            )}

            <button onClick={() => deleteItem(openItem.id)} style={{ ...outlineBtn, color: '#E31937', borderColor: '#E31937', marginTop: 16 }}>
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: 12, marginBottom: 12, border: '1.5px solid #E7E7E8',
  borderRadius: 10, background: '#F4F4F5', fontSize: 14, boxSizing: 'border-box',
};
const primaryBtn = {
  flex: 1, padding: 14, background: '#171A20', color: '#fff', border: 'none',
  borderRadius: 999, fontWeight: 600, cursor: 'pointer',
};
const outlineBtn = {
  flex: 1, padding: 14, background: 'transparent', color: '#171A20', border: '1.5px solid #E7E7E8',
  borderRadius: 999, fontWeight: 600, cursor: 'pointer',
};
