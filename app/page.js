'use client';

import { useState, useEffect } from 'react';

// LogNList wordmark, inlined so there's no public/ folder to get wrong.
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

  const [knownPrice, setKnownPrice] = useState('');
  const [logDocument, setLogDocument] = useState(null); // {name, dataUrl, mime}
  const [searchQuery, setSearchQuery] = useState('');
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

  // Search matches name, category, box and notes — same fields as the artifact.
  // A "file" is just a row with type 'file'. Real items are everything else.
  const files = items.filter((i) => i.type === 'file');
  const realItems = items.filter((i) => i.type !== 'file');
  const itemsInFile = (fileId) =>
    realItems.filter((i) => String(i.file_id || '') === String(fileId));

  const searchResults = (() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return realItems;
    return realItems.filter((i) =>
      (i.name || '').toLowerCase().includes(q) ||
      (i.category || '').toLowerCase().includes(q) ||
      (i.box || '').toLowerCase().includes(q) ||
      (i.notes || '').toLowerCase().includes(q)
    );
  })();

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

  // File-it
  const [newFileName, setNewFileName] = useState('');
  const [showNewFile, setShowNewFile] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState('unfiled'); // 'unfiled' or a file id
  const [renameValue, setRenameValue] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [dragItemId, setDragItemId] = useState(null);
  const [dragOverFile, setDragOverFile] = useState(null);

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

  const MAX_DOC_BYTES = 1024 * 1024; // 1MB of raw file. Base64 makes it ~1.33MB in the row.

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Could not read that file'));
      reader.readAsDataURL(file);
    });
  }

  async function handleDocumentChange(e) {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      let dataUrl;
      if (file.type.startsWith('image/')) {
        // A photo of a receipt is just a photo — squash it like any other.
        dataUrl = await compressImage(file);
      } else {
        if (file.size > MAX_DOC_BYTES) {
          setError(
            `That file is ${(file.size / 1024 / 1024).toFixed(1)}MB — the limit is 1MB. ` +
            'Try photographing the receipt instead, or shrink the PDF.'
          );
          return;
        }
        dataUrl = await readFileAsDataURL(file);
      }
      setLogDocument({ name: file.name, dataUrl, mime: file.type || 'application/octet-stream' });
      setError(null);
    } catch (err) {
      setError("Couldn't attach that file: " + err.message);
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
          document: logDocument,
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
      setLogDocument(null);
      setTab('inventory');
      await loadItems();

      if (alsoList) setOpenItem(data.item);
    } catch (e) {
      setError('Save failed: ' + e.message);
    }
  }

  function resetLogForm() {
    setLogDocument(null);
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

  // You already know the price. Skip the research, just identify it and write the ad.
  async function listAtKnownPrice(item) {
    const price = Number(knownPrice);
    if (!knownPrice.trim() || !Number.isFinite(price) || price <= 0) {
      setError('Put in a price first.');
      return;
    }
    setValuationLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/valuate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: item.name,
          category: item.category,
          notes: item.notes,
          photos: item.photos,
          mode: 'known',
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

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
          listing,
        }),
      });
      const patched = await patchRes.json();
      if (patched.error) throw new Error(patched.error);

      setKnownPrice('');
      await confirmListing(patched.item, price);
    } catch (e) {
      setError('Could not build the listing: ' + e.message);
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

  // ── Fileit ──────────────────────────────────────────────
  async function createFile() {
    const nm = newFileName.trim();
    if (!nm) return;
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'file', name: nm }),
    });
    const data = await res.json();
    setNewFileName('');
    setShowNewFile(false);
    if (data.item?.id) setSelectedFileId(data.item.id);
    setNotice(`Tab "${nm}" created.`);
    await loadItems();
  }

  async function renameFile(file, nm) {
    const v = (nm || '').trim();
    if (!v) return;
    const res = await fetch(`/api/items/${file.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: v }),
    });
    const data = await res.json();
    setEditingName(false);
    setNotice('File renamed.');
    await loadItems();
  }

  async function deleteFile(file) {
    // Move any items out of the file first so nothing gets stranded.
    const inside = items.filter(
      (i) => i.type !== 'file' && String(i.file_id || '') === String(file.id)
    );
    for (const it of inside) {
      await fetch(`/api/items/${it.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file_id: null }),
      });
    }
    await fetch(`/api/items/${file.id}`, { method: 'DELETE' });
    setSelectedFileId('unfiled');
    setNotice('File deleted. Its items were kept.');
    await loadItems();
  }

  // Drag an item tile onto a tab to file it there ('unfiled' clears the file).
  async function moveItemToFile(itemId, fileId) {
    if (!itemId) return;
    await fetch(`/api/items/${itemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file_id: fileId === 'unfiled' ? null : fileId }),
    });
    await loadItems();
  }

  async function assignFile(item, fileId) {
    const res = await fetch(`/api/items/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file_id: fileId || null }),
    });
    const data = await res.json();
    setOpenItem(data.item);
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

        /* Any button that DOES something flashes brand green while held.
           !important because these sit against inline styles. */
        .act:active:not(:disabled) {
          background: #7CCB2B !important;
          border-color: #7CCB2B !important;
          color: #171A20 !important;
          transform: scale(0.98);
        }
        .act:active:not(:disabled) * { color: #171A20 !important; }
        .act { transition: background 0.08s ease, border-color 0.08s ease, transform 0.08s ease; }

        @keyframes rain-in { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: colors.bg }}>
        <header style={{ background: colors.ink, padding: '30px 24px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <BoxMark size={72} />
            <img
              src={LOGO_WORDMARK}
              alt="LogNList"
              style={{ height: 38, width: 'auto', display: 'block' }}
            />
          </div>
          <div style={{ color: 'rgba(255,255,255,0.62)', fontSize: 13, letterSpacing: '0.01em', fontWeight: 400, textAlign: 'right' }}>Log it. List it. Find it again.</div>
        </header>

        <nav style={{ display: 'flex', background: colors.bg, borderBottom: `1px solid ${colors.line}` }}>
          {['log', 'inventory', 'fileit', 'find'].map((t) => (
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
              {t === 'log' ? 'LOG IT' : t === 'inventory' ? 'LOGNLIST' : t === 'fileit' ? 'FILE-IT' : 'FIND IT'}
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

                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10, color: colors.inkFaint, fontWeight: 600, letterSpacing: '0.05em', marginBottom: 6 }}>
                    RECEIPT / DOCUMENT (OPTIONAL)
                  </div>
                  {logDocument ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: colors.bgAlt, border: `1.5px solid ${colors.line}`, borderRadius: 10 }}>
                      {logDocument.mime.startsWith('image/') ? (
                        <img src={logDocument.dataUrl} alt="" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6 }} />
                      ) : (
                        <DocIcon />
                      )}
                      <span style={{ flex: 1, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{logDocument.name}</span>
                      <button
                        type="button"
                        onClick={() => { setLogDocument(null); setError(null); }}
                        title="Remove this document"
                        aria-label="Remove this document"
                        style={{ background: 'none', border: 'none', color: colors.inkFaint, fontSize: 20, lineHeight: 1, cursor: 'pointer', padding: '0 4px' }}
                      >
                        &times;
                      </button>
                    </div>
                  ) : (
                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 12, background: colors.bgAlt, border: `1.5px dashed ${colors.line}`, borderRadius: 10, cursor: 'pointer', fontSize: 13, color: colors.inkFaint, fontWeight: 600 }}>
                      <span style={{ fontSize: 17, lineHeight: 1 }}>+</span> Attach a receipt
                      <input type="file" accept="image/*,application/pdf" style={{ display: 'none' }} onChange={handleDocumentChange} />
                    </label>
                  )}
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                  <button className="act" onClick={() => submitLog(false)} style={outlineBtn}>Log it</button>
                  <button className="act" onClick={() => submitLog(true)} style={primaryBtn}>Log N List</button>
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
                  <button className="act" onClick={submitLogBox} style={primaryBtn}>Log the box</button>
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
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>LogNList ({realItems.length})</h2>
            {realItems.length === 0 && <p style={{ color: colors.inkFaint, textAlign: 'center', marginTop: 30 }}>Nothing logged yet.</p>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14 }}>
              {realItems.map((item) => {
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
        {loaded && tab === 'fileit' && (() => {
          const selectedFile = files.find((f) => String(f.id) === String(selectedFileId));
          const unfiledItems = realItems.filter((i) => !i.file_id);
          const shownItems = selectedFileId === 'unfiled' ? unfiledItems : itemsInFile(selectedFileId);
          const tabPill = (id, label, count) => {
            const active = String(selectedFileId) === String(id);
            const over = dragOverFile === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => { setSelectedFileId(id); setEditingName(false); setNotice(null); }}
                onDragOver={(e) => { e.preventDefault(); if (dragOverFile !== id) setDragOverFile(id); }}
                onDragLeave={() => setDragOverFile((p) => (p === id ? null : p))}
                onDrop={(e) => { e.preventDefault(); moveItemToFile(dragItemId, id); setDragOverFile(null); setDragItemId(null); }}
                style={{
                  flex: '0 0 auto', whiteSpace: 'nowrap', cursor: 'pointer',
                  padding: '9px 15px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                  border: over ? `2px dashed ${colors.success}` : `1.5px solid ${active ? colors.ink : colors.line}`,
                  background: over ? colors.successBg : (active ? colors.ink : '#fff'),
                  color: over ? colors.success : (active ? '#fff' : colors.inkSoft),
                  transition: 'background 0.12s ease, color 0.12s ease',
                }}
              >
                {label} ({count})
              </button>
            );
          };
          return (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>File-it</h2>
              <p style={{ color: colors.inkFaint, fontSize: 13, marginBottom: 14 }}>
                Make a tab, then drag any item onto it to file it away.
              </p>

              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, marginBottom: 4, borderBottom: `1px solid ${colors.line}` }}>
                {tabPill('unfiled', 'Unfiled', unfiledItems.length)}
                {files.map((f) => tabPill(f.id, f.name || 'Untitled', itemsInFile(f.id).length))}
                <button
                  type="button"
                  onClick={() => { setShowNewFile(true); setNewFileName(''); }}
                  style={{ flex: '0 0 auto', whiteSpace: 'nowrap', cursor: 'pointer', padding: '9px 15px', borderRadius: 999, fontSize: 13, fontWeight: 600, border: `1.5px dashed ${colors.line}`, background: colors.bgAlt, color: colors.inkSoft }}
                >
                  + New tab
                </button>
              </div>

              {showNewFile && (
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  <input
                    type="text"
                    autoFocus
                    placeholder="Name the tab &mdash; e.g. Books, Sold, Kids' art"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') createFile(); if (e.key === 'Escape') { setShowNewFile(false); setNewFileName(''); } }}
                    style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                  />
                  <button type="button" onClick={createFile} disabled={!newFileName.trim()} style={{ ...primaryBtn, flex: '0 0 auto', width: 'auto', padding: '0 18px', opacity: newFileName.trim() ? 1 : 0.5 }}>Add</button>
                  <button type="button" onClick={() => { setShowNewFile(false); setNewFileName(''); }} style={{ ...outlineBtn, flex: '0 0 auto', width: 'auto', padding: '0 16px' }}>Cancel</button>
                </div>
              )}

              {selectedFile && (
                <div style={{ marginTop: 16, marginBottom: 4 }}>
                  {editingName ? (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input
                        type="text"
                        autoFocus
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') renameFile(selectedFile, renameValue); if (e.key === 'Escape') setEditingName(false); }}
                        style={{ ...inputStyle, marginBottom: 0, flex: 1, fontWeight: 700 }}
                      />
                      <button type="button" onClick={() => renameFile(selectedFile, renameValue)} disabled={!renameValue.trim()} style={{ ...primaryBtn, flex: '0 0 auto', width: 'auto', padding: '0 18px', opacity: renameValue.trim() ? 1 : 0.5 }}>Save</button>
                      <button type="button" onClick={() => setEditingName(false)} style={{ ...outlineBtn, flex: '0 0 auto', width: 'auto', padding: '0 16px' }}>Cancel</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <button type="button" onClick={() => { setEditingName(true); setRenameValue(selectedFile.name || ''); }} style={{ background: 'none', border: 'none', color: colors.inkSoft, fontSize: 12.5, cursor: 'pointer', padding: '2px 0', textDecoration: 'underline', textUnderlineOffset: 2 }}>Rename tab</button>
                      <button type="button" onClick={() => { if (confirm(`Delete the "${selectedFile.name}" tab? The items in it are kept, just moved back to Unfiled.`)) deleteFile(selectedFile); }} style={{ background: 'none', border: 'none', color: colors.accent, fontSize: 12.5, cursor: 'pointer', padding: '2px 0', textDecoration: 'underline', textUnderlineOffset: 2 }}>Delete tab</button>
                    </div>
                  )}
                </div>
              )}

              <div style={{ marginTop: 18 }}>
                {shownItems.length === 0 ? (
                  <p style={{ color: colors.inkFaint, textAlign: 'center', padding: '30px 0', fontSize: 13.5 }}>
                    {selectedFileId === 'unfiled'
                      ? 'Nothing loose here \u2014 every item is filed.'
                      : `Nothing in this tab yet. Open the Unfiled tab, then drag items up onto "${selectedFile?.name}".`}
                  </p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14 }}>
                    {shownItems.map((item) => {
                      const isBox = item.type === 'box';
                      const sc = isBox ? statusColors.box : (statusColors[item.status] || statusColors.logged);
                      return (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={(e) => { setDragItemId(item.id); e.dataTransfer.effectAllowed = 'move'; try { e.dataTransfer.setData('text/plain', String(item.id)); } catch (_) {} }}
                          onDragEnd={() => { setDragItemId(null); setDragOverFile(null); }}
                          onClick={() => { if (!dragItemId) { setOpenItem(item); setNotice(null); } }}
                          style={{ background: '#fff', border: `1px solid ${colors.line}`, borderRadius: 14, padding: 12, cursor: 'grab', position: 'relative', boxShadow: '0 1px 3px rgba(23,26,32,0.04)', opacity: dragItemId === item.id ? 0.4 : 1 }}
                        >
                          {item.photos?.[0] ? (
                            <img src={item.photos[0]} alt="" draggable={false} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 9, marginBottom: 10, background: colors.bgAlt }} />
                          ) : (
                            <div style={{ width: 50, height: 50, background: colors.bgAlt, borderRadius: 9, marginBottom: 10 }} />
                          )}
                          <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 4 }}>
                            {isBox ? limitWords(item.notes || 'Mixed box', 6) : limitWords(item.name || 'Unidentified item', 6)}
                          </div>
                          <span style={{ display: 'inline-block', marginTop: 6, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', padding: '3px 8px', borderRadius: 999, background: sc.bg, color: sc.text }}>
                            {isBox ? 'MIXED BOX' : item.status?.toUpperCase()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {loaded && tab === 'find' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Find it</h2>

            <div style={{ ...fieldWrap, marginBottom: 16 }}>
              <input
                type="text"
                placeholder="Search name, category, box or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={micInputStyle}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                  aria-label="Clear search"
                  style={{
                    position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                    width: 32, height: 32, borderRadius: '50%', border: 'none',
                    background: colors.bgAlt, color: colors.inkSoft,
                    fontSize: 17, lineHeight: 1, cursor: 'pointer', padding: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  &times;
                </button>
              )}
            </div>

            {searchResults.length === 0 ? (
              <p style={{ fontSize: 13.5, color: colors.inkFaint, textAlign: 'center', padding: '28px 0' }}>
                {searchQuery.trim() ? 'Nothing matches that yet.' : 'Nothing logged yet.'}
              </p>
            ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14 }}>
              {searchResults.map((item) => {
                const isBox = item.type === 'box';
                return (
                  <div
                    key={item.id}
                    onClick={() => { setOpenItem(item); setNotice(null); }}
                    style={{ background: '#fff', border: `1px solid ${colors.line}`, borderRadius: 14, padding: 12, cursor: 'pointer', boxShadow: '0 1px 3px rgba(23,26,32,0.04)' }}
                  >
                    {item.photos?.[0] ? (
                      <img src={item.photos[0]} alt="" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 9, marginBottom: 10, background: colors.bgAlt }} />
                    ) : (
                      <div style={{ width: 50, height: 50, background: colors.bgAlt, borderRadius: 9, marginBottom: 10 }} />
                    )}
                    <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 8 }}>
                      {isBox
                        ? limitWords(item.notes || 'Mixed box', 6)
                        : limitWords(item.name || 'Unidentified item', 6)}
                    </div>
                    <div style={{ fontSize: 10, color: colors.inkFaint, fontWeight: 600, letterSpacing: '0.05em' }}>LOCATION</div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: colors.ink, marginTop: 1 }}>{item.box}</div>
                  </div>
                );
              })}
            </div>
            )}
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
              {openItem.document && (
                <a
                  href={openItem.document.dataUrl}
                  target="_blank"
                  rel="noopener"
                  download={openItem.document.name}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, marginBottom: 12, background: colors.bgAlt, border: `1px solid ${colors.line}`, borderRadius: 10, textDecoration: 'none', color: colors.ink }}
                >
                  {openItem.document.mime?.startsWith('image/') ? (
                    <img src={openItem.document.dataUrl} alt="" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6 }} />
                  ) : (
                    <DocIcon />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: colors.inkFaint, fontWeight: 600, letterSpacing: '0.05em' }}>RECEIPT</div>
                    <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{openItem.document.name}</div>
                  </div>
                  <span style={{ fontSize: 12, color: colors.inkFaint }}>Open &#8599;</span>
                </a>
              )}

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

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: colors.inkFaint }}>FILE</span>
                <select
                  value={openItem.file_id || ''}
                  onChange={(e) => assignFile(openItem, e.target.value)}
                  style={{ flex: 1, padding: '10px 12px', border: `1.5px solid ${colors.line}`, borderRadius: 10, background: colors.bgAlt, fontSize: 14, color: colors.ink, cursor: 'pointer', boxSizing: 'border-box' }}
                >
                  <option value="">&mdash; Not filed &mdash;</option>
                  {files.map((f) => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>

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
                        <button className="act" onClick={() => confirmListing(openItem, openItem.estimate.low)} style={priceChoiceBtn}>${openItem.estimate.low}<div style={priceChoiceLabel}>Min</div></button>
                        <button className="act" onClick={() => confirmListing(openItem, Math.round((openItem.estimate.low + openItem.estimate.high) / 2))} style={{ ...priceChoiceBtn, background: colors.ink, color: '#fff' }}>${Math.round((openItem.estimate.low + openItem.estimate.high) / 2)}<div style={{ ...priceChoiceLabel, color: 'rgba(255,255,255,0.7)' }}>Mid</div></button>
                        <button className="act" onClick={() => confirmListing(openItem, openItem.estimate.high)} style={priceChoiceBtn}>${openItem.estimate.high}<div style={priceChoiceLabel}>Max</div></button>
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
              ) : valuationLoading ? (
                <div>
                  <MatrixRain />
                  <p style={{ fontSize: 12, color: colors.inkFaint, textAlign: 'center', marginTop: -4, marginBottom: 14 }}>
                    Working out what it's worth&#8230;
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                    <button className="act" onClick={() => runValuation(openItem, 'deep')} style={primaryBtn}>
                      Deep Dive
                    </button>
                    <button className="act" onClick={() => runValuation(openItem, 'quick')} style={outlineBtn}>
                      Quick Valuation
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <div style={{ position: 'relative', flex: '0 0 110px' }}>
                      <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: colors.inkFaint, fontWeight: 600 }}>$</span>
                      <input
                        type="number"
                        inputMode="decimal"
                        min="1"
                        placeholder="10"
                        value={knownPrice}
                        onChange={(e) => setKnownPrice(e.target.value)}
                        style={{ ...inputStyle, marginBottom: 0, paddingLeft: 24, fontWeight: 600 }}
                      />
                    </div>
                    <button
                      className="act"
                      onClick={() => listAtKnownPrice(openItem)}
                      style={{ ...outlineBtn, flex: 1 }}
                    >
                      I know the price &#8594; list it
                    </button>
                  </div>
                  <p style={{ fontSize: 12, color: colors.inkFaint, textAlign: 'center', margin: '0 0 14px', lineHeight: 1.5 }}>
                    Skips the price research &#8212; just works out what it is and writes the ad.
                  </p>
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
                      <button className="act" onClick={() => copyField(openItem, field)} style={{ ...outlineBtn, width: 'auto', flex: '0 0 auto', padding: '8px 14px', fontSize: 13 }}>Copy</button>
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
                  <button className="act" onClick={() => markSold(openItem)} style={outlineBtn}>Mark as sold</button>
                  <button className="act" onClick={() => unlistItem(openItem)} style={outlineBtn}>Unlist</button>
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

// The LogNList mark — phone outline, cardboard carton, two ticked rows.
// Inline SVG: vector, crisp at any size, no background dependency.
function BoxMark({ size = 72 }) {
  // viewBox is 378x628, so lock the width to that ratio.
  // NB: width="auto" on an <svg> resolves to 100%, not intrinsic — it hijacks the row.
  const w = Math.round((size * 378) / 628);
  const tickRow = (dy) => (
    <g transform={`translate(0,${dy})`}>
      <circle cx="28" cy="28" r="28" fill="#7CCB2B" />
      <path d="M14 28 l9 9 l19 -21" fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="78" y="18" width="180" height="20" rx="10" fill="#FFFFFF" />
    </g>
  );
  return (
    <svg viewBox="71 46 378 628" width={w} height={size} aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <g transform="translate(80,55)">
        <rect x="0" y="0" width="360" height="610" rx="56" fill="none" stroke="#FFFFFF" strokeWidth="18" />
        <rect x="128" y="24" width="104" height="12" rx="6" fill="#FFFFFF" />
        <g fill="none" stroke="#7CCB2B" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
          <path d="M52 148 v-34 h34" />
          <path d="M308 148 v-34 h-34" />
          <path d="M52 372 v34 h34" />
          <path d="M308 372 v34 h-34" />
        </g>
        <g transform="translate(45,113) scale(1.35)">
          <path d="M100 20 L180 62 L100 104 L20 62 Z" fill="#F9B769" />
          <path d="M20 62 L100 104 L100 190 L20 148 Z" fill="#E5A754" />
          <path d="M180 62 L100 104 L100 190 L180 148 Z" fill="#D7974F" />
          <path d="M48 47.3 L60.8 40.6 L140.8 82.6 L128 89.3 Z" fill="#FFDBB8" />
          <path d="M128 89.3 L140.8 82.6 L140.8 168.6 L128 175.3 Z" fill="#F4C79A" />
          <path d="M30 110 L46 118.4 L46 137.4 L30 129 Z" fill="#FFF1DC" />
          <path d="M34 118.5 L42 122.7 M34 125 L42 129.2" stroke="#D7974F" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g transform="translate(52,438)">
          {tickRow(0)}
          {tickRow(80)}
        </g>
      </g>
    </svg>
  );
}

// Something has to move while the API thinks, or it looks broken.
function MatrixRain() {
  const COLS = 18;
  const ROWS = 8;
  const CHARS = '0123456789$';
  const pick = () => CHARS[Math.floor(Math.random() * CHARS.length)];
  const [grid, setGrid] = useState(() =>
    Array.from({ length: COLS }, () => Array.from({ length: ROWS }, pick))
  );

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setGrid((g) =>
        // stagger the columns so they don't all fall in lockstep
        g.map((col, i) => ((n + i) % (1 + (i % 3)) === 0 ? [...col.slice(1), pick()] : col))
      );
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        background: colors.ink, borderRadius: 14, padding: '14px 10px', marginBottom: 14,
        display: 'flex', gap: 3, justifyContent: 'center', overflow: 'hidden',
        animation: 'rain-in 0.2s ease',
      }}
    >
      {grid.map((col, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', fontFamily: 'monospace', fontSize: 12, lineHeight: '15px' }}>
          {col.map((c, j) => (
            <span key={j} style={{ color: '#7CCB2B', opacity: 0.15 + (j / ROWS) * 0.85 }}>{c}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

function FolderIcon({ size = 34 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={colors.ink} strokeWidth="1.5" style={{ width: size, height: size, display: 'block' }}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
  );
}

function DocIcon({ size = 36 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 6, background: colors.line, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg viewBox="0 0 24 24" fill="none" stroke={colors.inkSoft} strokeWidth="1.6" style={{ width: size * 0.55, height: size * 0.55 }}>
        <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <path d="M14 3v5h5M9 13h6M9 17h6" />
      </svg>
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
