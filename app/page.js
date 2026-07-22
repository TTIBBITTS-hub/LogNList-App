'use client';

import { useState, useEffect, useRef } from 'react';

// LogNList wordmark, inlined so there's no public/ folder to get wrong.
const LOGO_WORDMARK = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV0AAABMCAMAAAD5q5QPAAAA/1BMVEUAAAD///+KwjH///////////////////////////9/vj6JwTD//wCKwTF/fwB//wCJwy+KwTGqqlWIwDKGvTCGvS+JwTCHvi+JvzCPxzEA/wB//3+LvC+X1Taq/1WIvjBVqlVVqgBV/wB/f39/qip/1CoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIUhmzAAAAQHRSTlMA/v4DNMyylm5OBM4BZwICKpoDQi9Nsmz9DwECFP8DhgMDAwIGBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbN3ekQAAB+lJREFUeNrtnYd24yoQhrGHavvaTtbpZXdvef9XvKhYogwIZPCmaPbsOYmtxqfRMPMDCiHf2wAISLbSxgTVv5LFisKVq8EkLHjLwhUrwzjAgrccXdNzGxOL8xaES1eO0bJ4wbaP0ezng2GBbfbmNod9sEWQ4brf0Hl3FX2Xu3R5WbrUto9w557J0/Fsp+OJ7NGtjoadjkeDmdsi+HN0WdW4M8s25K+39WgP+gM/LpDt2rTtLkSM1qYbC0Qfk65F7o6816IrXLryO/iuRW59JL8r0b08ZwCiLLMP8Bnobje7Qw26/sb5KQM4BMVno/u4vj/cPlehC2C1n+XnpO75Ph1dbTduz1aGrv4KuFkIz+jTvgBdL3EoRLf5TvU7cDVHI/sSdN3EoRTdRsjpMmTofv5YdHPL54TNUbo6cfhVg+7INHphwWbWojsmz2kShb05lolH6W6fdvsKkWFKlDA+9rbpfnXoWoeaSXc8ifEDJHkITHkKTnd9T4zEoaDvJrZyvGCnoa7vXlxNtIcHKgVnrXEhW4UiiKyLbuftuVB9lLMlgTjd9U+jZyvmuxGZxW0l47qdCob2tFevqE2Q60/GY82h2xxa+SV6iyy0A5XuVTTXaH3E+r1DdM3EoVQ1QcMb461sBuC6hiIqhWXgVRopdMeBPu+8zcAUFroIFf7WTXbJMAUlSNdIHOrTDbZyzN4q0G0yxOBZmfTdV/8u8a2pffZJ312vT+TlOnS1R4Rb2Q/BVaBrVze4RybvQHPpbl/3u2vQBUQ+uwJdfT0sflrnEO7jH7EEujpx2FyB7iS5bsvSdBHNzjdFIKiTXEr3nDhUpjvluU0fUZxuEly7bwC+Kkq3Txyq0tUxN8GDStNNdsSxFgt1aPPp6p7t79p0J5vJ2uqiMF2S6Ih86Bzoqjjd9atOHGrSTXBdOZ3vsky6CWd1Qm/y7ciiu33a7+vSFW79IJtBnaZoMx5Oj91FvovGBX1iKRj65ITCNMd3SafbJA4V6XrtlOYEBcnPQph2NtkYczL+3lReJYy4Lu+lAcpR50W6XqYgtEs6XZ04/FuRLgFXU7R0L113UrMiLaPi+I+5HOVE6TsvluoKGAVIlUH30SuJd1ejK4mtmFp6XykF0n/MhSk8Sz8rw/cwSs1Uuj+2Nt7HJnG4Gt0VtYVeW0kppJ57ABkxJU+3URJBbg+5+p1HiO7x6AeHp/uKdB0oXFJL54UadEW4JNNnVUgxE9ujudBU3yV3fs9WM2fAdMdG26XgCf/FRn5YzBHdjpYhCaEj8Ljfh+nuycNEIK6akXlubI7+FKHrRSMeR7WCIL3xjohU3/2P3MSziLJ0ozUQE+YoQSW60qUrp5JpDhCN5BG6m1+b+6vRnS6CxPgUlqJL8+j6Eh0ns+ne7snr1gsH9XQGmNQZBpn9o9BlEO8nY3T1v9PVfDdBCxx6nT8YGZzegTqpotsRxujqT39cjW7CIAGvS1e4dIVPN7peySsn4nTjBXLxcbXYmGVMqJqbkXkpV9wRAREmaHTUYoKu/vzmanT78XYWjQ1Fqwkeec49JbetJtzOgdFREfEHM6fo7l6etlej2yVdQJUIIcbzi1KVsJUCeIEhoC+rUcvjq0y6RCcO60DiUN53wZiURZX0GSucLsToQtC8flSZOTVdYRW7ROZZtKdQIkPfPdONJA4RuuEGReNuN5vJmD8GiiHdejztZJgeFFDPGaKDBciz/trwkMXyxiYGuvqru/zIQObkDJIO8/HGm5FAtx836O+J01A5TDKzTaGeODznCl+ZlDVomUJXf/eQSTfWovB8BnoeGrCcnWFN9EJiP70PoRsbp0M8kcnm0pHcZbjrrCxd/eV9Ht1oi+LzGZi0J0UqNO66DiTb+Z68hZ9DN90T5ZiVF6b7/LLZ1qZr+BHjsusomuwhde5DG/na2Jjlu6meyIwJDaosXXIgT9XpprgRA7zKso6VQTfdE62JmrIsXTxxKOy7LOfxDJxQZNJN9URpZ8KyLF00cShJN62Vo4xDw8VcFt00VJ6+E5oJKwSaKk7RxUrisnQTDqGCCq+ZC+bRTcEriaeSg8AfnZl0kcShIN2k+CfNiYg0FBpy6U4/NsqvPAGre3U6CXwm3d3hdVuRLs+NfSo01ymX7sTkc46W9W35Irk5NkXDAsg0XZ04nOrRBTUBhSkv9gUcLZuuubQWOW0Abr86qZt5pfpx1YAe79G98+h6iUPZuBts4Llc8EZZKLYDn0G3JYWdvl0IE1xSZa+ha4ErPI9z3tyyfkPoNiWxsdHbeqTLLqXb/Q+Iu0xi68bQpTr6OZYizag9N6Q5vTmRsVvEhYp9ugln37X0qeB0hxdyvLHsRP7xD3tLHoxNfo50U1ukuqVelgEBdyGgNdbeazt47KNG7NM1Hp2/Dr0X5ilt31aCzFGxtLU2YnjOK6MTJCZtX3WhvSHuto0cFmJCcGhsAELpecIZpFp81Xd4GXYX8rkirvOqcOzZbywLvJHs3djkPbywOtqiWCv9Zk8thYastfxpy9yjC9wHccIRnPzVl/RDvsYu70WD134poZmttIJTq61KjnSwywsuZ9z6xD6cLnRnuG6ihrO47izXTcw+l/cKV3RdtbjuDLiQXQkuNidhWDy3QtxV0ykDW9KF+YCn+Irl7xBcEBx0zRt528HyNzQuDA6tA4vw25EWuAXkpv7NXv18islXmH0F+x8jjnsZi81RWwAAAABJRU5ErkJggg==';

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

function isBookIsbn(s) {
  if (/^(978|979)\d{10}$/.test(s)) return true;   // EAN-13 book barcode
  if (/^\d{9}[\dxX]$/.test(s)) return true;        // ISBN-10
  return false;
}

const EMPTY_MESSAGES = [
  'Suspiciously empty. Somewhere, a drawer of mystery cables awaits. \uD83D\uDCE6',
  'Blank slate. Every good collection starts with one thing logged.',
  'Nothing here yet \u2014 go give some clutter a home.',
  'All quiet. Log something and watch it show up.',
  'Empty box energy. Time to fill it up.',
  'Your future self, hunting for that one thing, will thank you.',
  'A clean slate. Rare and beautiful. Let\u2019s ruin it. \uD83D\uDE04',
  'Nothing logged. The garage isn\u2019t going to sort itself.',
  'Peaceful in here, isn\u2019t it? Log your first thing to get started.',
  'This space is a void. Add something to give it purpose.',
];

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
  const [emptyMsg, setEmptyMsg] = useState(() => EMPTY_MESSAGES[Math.floor(Math.random() * EMPTY_MESSAGES.length)]);
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
  // Tab order is stored as a number in each file's (otherwise unused) category field.
  const filePos = (f) => {
    const n = Number(f.category);
    return (f.category !== '' && f.category != null && !isNaN(n)) ? n : 1e9;
  };
  const files = items.filter((i) => i.type === 'file').sort((a, b) => filePos(a) - filePos(b));
  const realItems = items.filter((i) => i.type !== 'file' && i.type !== 'book');
  const books = items.filter((i) => i.type === 'book');
  const findableItems = items.filter((i) => i.type !== 'file');
  const unfiledItems = realItems.filter((i) => !i.file_id);
  const itemsInFile = (fileId) =>
    realItems.filter((i) => String(i.file_id || '') === String(fileId));

  const searchResults = (() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return findableItems;
    return findableItems.filter((i) =>
      (i.name || '').toLowerCase().includes(q) ||
      (i.author || '').toLowerCase().includes(q) ||
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
  const [pickedItemId, setPickedItemId] = useState(null);
  const [movingItem, setMovingItem] = useState(null);   // item shown in the "move to folder" sheet
  const [sheetNewName, setSheetNewName] = useState('');

  // Library / Add a book
  const [addingBook, setAddingBook] = useState(false);
  const [bookStep, setBookStep] = useState('scan');       // 'scan' | 'search' | 'confirm'
  const [bookBusy, setBookBusy] = useState(false);
  const [bookError, setBookError] = useState(null);
  const [bookDraft, setBookDraft] = useState(null);       // {title, author, year, isbn, cover}
  const [bookBox, setBookBox] = useState('');
  const [bookOwnPhoto, setBookOwnPhoto] = useState(null); // base64 second photo
  const [bookIsbnInput, setBookIsbnInput] = useState('');
  const [bookSearchQuery, setBookSearchQuery] = useState('');
  const [bookSearchResults, setBookSearchResults] = useState([]);
  const [librarySearch, setLibrarySearch] = useState('');
  const [scanActive, setScanActive] = useState(false);
  const [scanSupported, setScanSupported] = useState(true);
  const videoRef = useRef(null);
  const scannerRef = useRef(null);
  const scanLastRef = useRef(null);
  const [dragTabId, setDragTabId] = useState(null);
  const [dragOverTab, setDragOverTab] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  // Open a specific item if the URL asks for it (e.g. /?item=<id> from a box page).
  useEffect(() => {
    if (!loaded) return;
    try {
      const wanted = new URLSearchParams(window.location.search).get('item');
      if (wanted) {
        const it = items.find((i) => String(i.id) === String(wanted));
        if (it) setOpenItem(it);
      }
    } catch (e) {}
  }, [loaded]);

  useEffect(() => {
    if (addingBook && bookStep === 'scan') { startScan(); }
    return () => { stopScan(); };
  }, [addingBook, bookStep]);

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

  async function setItemStatus(item, status) {
    const res = await fetch(`/api/items/${item.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    setOpenItem(data.item);
    await loadItems();
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
      body: JSON.stringify({ type: 'file', name: nm, category: String(files.length) }),
    });
    const data = await res.json();
    setNewFileName('');
    setShowNewFile(false);
    if (data.item?.id) setSelectedFileId(data.item.id);
    setNotice(`File "${nm}" created.`);
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

  // Drag/tap an item onto a tab to file it there ('unfiled' clears the file).
  // Optimistic: update the screen immediately, then save in the background.
  async function moveItemToFile(itemId, fileId) {
    if (!itemId) return;
    const target = fileId === 'unfiled' ? null : fileId;
    setItems((prev) => prev.map((i) => (String(i.id) === String(itemId) ? { ...i, file_id: target } : i)));
    try {
      await fetch(`/api/items/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file_id: target }),
      });
    } catch (e) {
      await loadItems(); // put it back if the save failed
    }
  }

  // Persist a new tab order by writing each file's position into its category field.
  async function reorderFiles(orderedIds) {
    setItems((prev) => prev.map((i) => {
      if (i.type !== 'file') return i;
      const pos = orderedIds.findIndex((x) => String(x) === String(i.id));
      return pos >= 0 ? { ...i, category: String(pos) } : i;
    }));
    try {
      await Promise.all(orderedIds.map((id, idx) =>
        fetch(`/api/items/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: String(idx) }),
        })
      ));
    } catch (e) {
      await loadItems();
    }
  }

  // Sheet actions: file an item into a folder (or take it out, back to LOGNLIST).
  async function fileInto(item, fileId) {
    setMovingItem(null);
    await moveItemToFile(item.id, fileId);
  }

  async function createFolderInto(name, item) {
    const nm = (name || '').trim();
    if (!nm) return;
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'file', name: nm, category: String(files.length) }),
    });
    const data = await res.json();
    setSheetNewName('');
    setMovingItem(null);
    if (data.item?.id) await moveItemToFile(item.id, data.item.id);
    else await loadItems();
  }

  // ── Library / Add a book ─────────────────────────────────
  function openAddBook() {
    setBookDraft(null); setBookBox(''); setBookOwnPhoto(null);
    setBookIsbnInput(''); setBookSearchQuery(''); setBookSearchResults([]);
    setBookError(null); setBookStep('scan'); setScanSupported(true);
    setAddingBook(true);
  }
  function closeAddBook() { stopScan(); setAddingBook(false); }

  function loadZXing() {
    return new Promise((resolve, reject) => {
      if (window.ZXing) return resolve(window.ZXing);
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@zxing/library@0.21.3/umd/index.min.js';
      s.onload = () => resolve(window.ZXing);
      s.onerror = () => reject(new Error('scanner load failed'));
      document.head.appendChild(s);
    });
  }
  async function startScan() {
    setBookError(null);
    scanLastRef.current = null;
    stopAllScanners();
    try {
      const ZX = await loadZXing();
      const hints = new Map();
      hints.set(ZX.DecodeHintType.POSSIBLE_FORMATS, [ZX.BarcodeFormat.EAN_13, ZX.BarcodeFormat.EAN_8, ZX.BarcodeFormat.UPC_A]);
      hints.set(ZX.DecodeHintType.TRY_HARDER, true);
      const reader = new ZX.BrowserMultiFormatReader(hints);
      scannerRef.current = reader;
      setScanActive(true);
      await reader.decodeFromConstraints(
        { video: { facingMode: 'environment', width: { ideal: 1280 } } },
        videoRef.current,
        (result) => {
          if (!result) return;
          const raw = result.getText().replace(/[^0-9Xx]/g, '');
          if (!isBookIsbn(raw)) return;                                   // skip price / non-book barcodes (checksum already validated by the reader)
          stopScan();
          lookupIsbn(raw);
        }
      );
    } catch (e) {
      setScanSupported(false); setScanActive(false);
      setBookError("Camera scanning isn't available here \u2014 type the ISBN or search by title instead.");
    }
  }
  function stopScan() {
    try { if (scannerRef.current) scannerRef.current.reset(); } catch (_) {}
    scannerRef.current = null; scanLastRef.current = null; setScanActive(false);
  }

  // Decode a book barcode from a still photo. The native camera focuses properly and
  // shoots high-res, so a 1D barcode reads reliably here even when the live feed can't.
  async function decodeBarcodeFromPhoto(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    stopAllScanners();
    setBookError(null);
    setBookBusy(true);
    let url;
    try {
      url = URL.createObjectURL(file);
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
      await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error('image load failed')); });

      let raw = '';

      // 1) Use the phone's own barcode reader if it has one (much better at 1D barcodes).
      try {
        if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
          const det = new window.BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e'] });
          const codes = await det.detect(img);
          if (codes && codes.length) raw = (codes[0].rawValue || '').replace(/[^0-9Xx]/g, '');
        }
      } catch (_) {}

      // 2) Fall back to ZXing, trying the full photo and a downscaled copy.
      if (!isBookIsbn(raw)) {
        const ZX = await loadZXing();
        const hints = new Map();
        hints.set(ZX.DecodeHintType.POSSIBLE_FORMATS, [ZX.BarcodeFormat.EAN_13, ZX.BarcodeFormat.EAN_8, ZX.BarcodeFormat.UPC_A]);
        hints.set(ZX.DecodeHintType.TRY_HARDER, true);
        const reader = new ZX.BrowserMultiFormatReader(hints);
        const tries = [img];
        try {
          const w = img.naturalWidth || img.width, h = img.naturalHeight || img.height;
          const maxDim = Math.max(w, h);
          if (maxDim > 1600) {
            const s = 1600 / maxDim;
            const c = document.createElement('canvas');
            c.width = Math.round(w * s); c.height = Math.round(h * s);
            c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
            const small = new Image();
            small.src = c.toDataURL('image/jpeg', 0.92);
            await new Promise((res) => { small.onload = res; small.onerror = res; });
            tries.push(small);
          }
        } catch (_) {}
        for (const cand of tries) {
          try {
            const result = await reader.decodeFromImageElement(cand);
            const v = (result.getText() || '').replace(/[^0-9Xx]/g, '');
            if (isBookIsbn(v)) { raw = v; break; }
          } catch (_) {}
        }
        try { reader.reset(); } catch (_) {}
      }

      if (!isBookIsbn(raw)) {
        setBookBusy(false);
        setBookError("Couldn't read that barcode \u2014 take the photo again with the barcode filling most of the frame and in focus, or type the ISBN.");
        return;
      }
      lookupIsbn(raw); // takes over: fetches the book and moves to the confirm step
    } catch (err) {
      setBookBusy(false);
      setBookError("Couldn't read the barcode from that photo \u2014 try again with the barcode filling the frame, or type the ISBN.");
    } finally {
      if (url) { try { URL.revokeObjectURL(url); } catch (_) {} }
    }
  }

  // ---- Scan a printed box QR to file the open item into that box ----
  const boxVideoRef = useRef(null);
  const boxScannerRef = useRef(null);
  const [scanningBoxItem, setScanningBoxItem] = useState(null);
  const [boxScanError, setBoxScanError] = useState(null);
  const [boxManual, setBoxManual] = useState('');

  // Scan a printed box QR to set a NEW book's location (before it's saved) ----
  const bookBoxVideoRef = useRef(null);
  const [scanningBookBox, setScanningBookBox] = useState(false);

  // Scan a printed box QR to SEE what's inside that box ----
  const viewBoxVideoRef = useRef(null);
  const [scanningBoxView, setScanningBoxView] = useState(false);
  const [viewBoxError, setViewBoxError] = useState(null);
  const [viewBoxManual, setViewBoxManual] = useState('');
  const [viewingBox, setViewingBox] = useState(null); // box name currently being viewed

  // --- Camera teardown shared by every scanner ---
  // All four scanners (ISBN, file-into-box, book location, view box) use the one
  // phone camera. If any of them leaves the camera stream open, the next scanner
  // gets a "device busy" error and silently fails. So before starting ANY scanner
  // we fully release every reader and every video stream first.
  function killVideoStream(ref) {
    try {
      const v = ref && ref.current;
      if (v && v.srcObject) {
        v.srcObject.getTracks().forEach((t) => { try { t.stop(); } catch (_) {} });
        v.srcObject = null;
      }
    } catch (_) {}
  }
  function stopAllScanners() {
    try { if (scannerRef.current) scannerRef.current.reset(); } catch (_) {}
    try { if (boxScannerRef.current) boxScannerRef.current.reset(); } catch (_) {}
    scannerRef.current = null;
    boxScannerRef.current = null;
    killVideoStream(videoRef);
    killVideoStream(boxVideoRef);
    killVideoStream(bookBoxVideoRef);
    killVideoStream(viewBoxVideoRef);
  }

  function boxNameFromScan(text) {
    try {
      const u = new URL(text);
      const m = u.pathname.match(/\/box\/(.+)$/);
      if (m) return decodeURIComponent(m[1]);
    } catch (e) {}
    return null;
  }
  function stopBoxScan() {
    try { if (boxScannerRef.current) boxScannerRef.current.reset(); } catch (_) {}
    boxScannerRef.current = null;
  }
  async function startBoxScan() {
    setBoxScanError(null);
    stopAllScanners();
    try {
      const ZX = await loadZXing();
      const hints = new Map();
      hints.set(ZX.DecodeHintType.POSSIBLE_FORMATS, [ZX.BarcodeFormat.QR_CODE]);
      hints.set(ZX.DecodeHintType.TRY_HARDER, true);
      const reader = new ZX.BrowserMultiFormatReader(hints);
      boxScannerRef.current = reader;
      await reader.decodeFromConstraints(
        { video: { facingMode: 'environment' } },
        boxVideoRef.current,
        (result) => {
          if (!result) return;
          const name = boxNameFromScan(result.getText());
          if (!name) return; // not one of our labels, keep looking
          stopBoxScan();
          fileScannedBox(name);
        }
      );
    } catch (e) {
      setBoxScanError("Camera scanning isn't available here - type the box name below instead.");
    }
  }
  async function fileScannedBox(name) {
    const item = scanningBoxItem;
    if (!item || !name) return;
    try {
      const res = await fetch('/api/items/' + item.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ box: name }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setScanningBoxItem(null);
      setBoxManual('');
      setOpenItem(data.item);
      setNotice('Filed into "' + name + '".');
      await loadItems();
    } catch (e) {
      setBoxScanError('Could not file it: ' + e.message);
    }
  }
  useEffect(() => {
    if (scanningBoxItem) { startBoxScan(); }
    return () => { stopBoxScan(); };
  }, [scanningBoxItem]);

  // Scan a box label to fill in the location of a book being added.
  async function startBookBoxScan() {
    setBookError(null);
    stopAllScanners();
    try {
      const ZX = await loadZXing();
      const hints = new Map();
      hints.set(ZX.DecodeHintType.POSSIBLE_FORMATS, [ZX.BarcodeFormat.QR_CODE]);
      hints.set(ZX.DecodeHintType.TRY_HARDER, true);
      const reader = new ZX.BrowserMultiFormatReader(hints);
      boxScannerRef.current = reader;
      await reader.decodeFromConstraints(
        { video: { facingMode: 'environment' } },
        bookBoxVideoRef.current,
        (result) => {
          if (!result) return;
          const name = boxNameFromScan(result.getText());
          if (!name) return; // not one of our labels, keep looking
          stopBoxScan();
          setBookBox(name);
          setScanningBookBox(false);
        }
      );
    } catch (e) {
      setBookError("Camera scanning isn't available here \u2014 type the box name instead.");
      setScanningBookBox(false);
    }
  }
  useEffect(() => {
    if (scanningBookBox) { startBookBoxScan(); }
    return () => { stopBoxScan(); };
  }, [scanningBookBox]);

  // Scan a box label to open a read-out of everything inside that box.
  async function startBoxViewScan() {
    setViewBoxError(null);
    stopAllScanners();
    try {
      const ZX = await loadZXing();
      const hints = new Map();
      hints.set(ZX.DecodeHintType.POSSIBLE_FORMATS, [ZX.BarcodeFormat.QR_CODE]);
      hints.set(ZX.DecodeHintType.TRY_HARDER, true);
      const reader = new ZX.BrowserMultiFormatReader(hints);
      boxScannerRef.current = reader;
      await reader.decodeFromConstraints(
        { video: { facingMode: 'environment' } },
        viewBoxVideoRef.current,
        (result) => {
          if (!result) return;
          const name = boxNameFromScan(result.getText());
          if (!name) return; // not one of our labels, keep looking
          stopBoxScan();
          setScanningBoxView(false);
          setViewBoxManual('');
          setViewingBox(name);
        }
      );
    } catch (e) {
      setViewBoxError("Camera scanning isn't available here \u2014 type the box name below instead.");
    }
  }
  useEffect(() => {
    if (scanningBoxView) { startBoxViewScan(); }
    return () => { stopBoxScan(); };
  }, [scanningBoxView]);

  // Everything filed into the box we're viewing (forgiving on case / spacing).
  const viewingBoxItems = viewingBox
    ? items.filter(
        (i) => i.type !== 'file' && (i.box || '').trim().toLowerCase() === viewingBox.trim().toLowerCase()
      )
    : [];

  async function lookupIsbn(isbn) {
    const clean = String(isbn || '').replace(/[^0-9Xx]/g, '');
    if (!clean) return;
    setBookBusy(true); setBookError(null); setBookStep('confirm');
    try {
      const res = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${clean}&format=json&jscmd=data`);
      const data = await res.json();
      const rec = data[`ISBN:${clean}`];
      if (rec) {
        setBookDraft({
          title: rec.title || '',
          author: (rec.authors || []).map((a) => a.name).join(', '),
          year: ((rec.publish_date || '').match(/\d{4}/) || [''])[0],
          isbn: clean,
          cover: (rec.cover && (rec.cover.large || rec.cover.medium)) || `https://covers.openlibrary.org/b/isbn/${clean}-L.jpg`,
        });
      } else {
        setBookDraft({ title: '', author: '', year: '', isbn: clean, cover: '' });
        setBookError("Couldn't find that ISBN \u2014 fill in the details yourself, or search by title.");
      }
    } catch (e) {
      setBookDraft({ title: '', author: '', year: '', isbn: clean, cover: '' });
      setBookError('Lookup failed \u2014 check your connection, or enter details yourself.');
    } finally { setBookBusy(false); }
  }

  async function searchByTitle(q) {
    const query = (q || '').trim();
    if (!query) return;
    setBookBusy(true); setBookError(null);
    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=12`);
      const data = await res.json();
      setBookSearchResults((data.docs || []).map((d) => ({
        title: d.title || '',
        author: (d.author_name || []).join(', '),
        year: d.first_publish_year ? String(d.first_publish_year) : '',
        isbn: (d.isbn || [])[0] || '',
        cover: d.cover_i ? `https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg` : '',
      })));
    } catch (e) { setBookError('Search failed \u2014 check your connection.'); }
    finally { setBookBusy(false); }
  }
  function pickSearchResult(r) {
    setBookDraft({ title: r.title, author: r.author, year: r.year, isbn: r.isbn, cover: r.cover });
    setBookStep('confirm');
  }
  function startManualEntry(prefillTitle) {
    const title = typeof prefillTitle === 'string' ? prefillTitle.trim() : '';
    setBookDraft({ title, author: '', year: '', isbn: '', cover: '' });
    setBookStep('confirm');
  }

  async function handleBookOwnPhoto(e) {
    const file = e.target.files[0]; e.target.value = '';
    if (!file) return;
    try { const dataUrl = await compressImage(file); setBookOwnPhoto(dataUrl); } catch (_) {}
  }

  async function saveBook() {
    if (!bookDraft || !bookDraft.title.trim()) { setBookError('A title is needed.'); return; }
    if (!bookBox.trim()) { setBookError('Which box is it stored in?'); return; }
    setBookBusy(true); setBookError(null);
    const photos = [];
    if (bookDraft.cover) photos.push(bookDraft.cover);
    if (bookOwnPhoto) photos.push(bookOwnPhoto);
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'book', name: bookDraft.title.trim(), category: bookDraft.year || '', box: bookBox.trim(), photos }),
      });
      const data = await res.json();
      if (data.item && data.item.id) {
        await fetch(`/api/items/${data.item.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ author: (bookDraft.author || '').trim(), isbn: bookDraft.isbn || '' }),
        });
      }
      setNotice(`"${bookDraft.title.trim()}" added to your library.`);
      closeAddBook();
      await loadItems();
    } catch (e) { setBookError('Save failed \u2014 try again.'); }
    finally { setBookBusy(false); }
  }

  function reorderTabs(draggedId, targetId) {
    const ids = files.map((f) => String(f.id));
    const from = ids.indexOf(String(draggedId));
    const to = ids.indexOf(String(targetId));
    if (from === -1 || to === -1 || from === to) return;
    const next = [...ids];
    next.splice(from, 1);
    next.splice(to, 0, String(draggedId));
    reorderFiles(next);
  }

  function nudgeFile(file, dir) {
    const ids = files.map((f) => String(f.id));
    const i = ids.indexOf(String(file.id));
    const j = i + dir;
    if (i === -1 || j < 0 || j >= ids.length) return;
    const next = [...ids];
    [next[i], next[j]] = [next[j], next[i]];
    reorderFiles(next);
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
    <div
      onClickCapture={(e) => {
        const b = e.target.closest && e.target.closest('.act');
        if (b && !b.disabled) { b.classList.add('busy'); setTimeout(() => b.classList.remove('busy'), 350); }
      }}
      style={{ maxWidth: 640, margin: '0 auto', paddingBottom: 80, background: colors.bg, minHeight: '100vh' }}
    >
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
        .act { transition: background 0.22s ease, border-color 0.22s ease, transform 0.1s ease; }

        /* Held green pulse: added on click, removed after a beat, so a quick tap still shows clearly. */
        .act.busy:not(:disabled) {
          background: #7CCB2B !important;
          border-color: #7CCB2B !important;
          color: #171A20 !important;
        }
        .act.busy:not(:disabled) * { color: #171A20 !important; }

        @keyframes rain-in { from { opacity: 0; } to { opacity: 1; } }

        /* Brand-green scrollbars */
        ::-webkit-scrollbar { height: 12px; width: 10px; }
        ::-webkit-scrollbar-track { background: #F4F4F5; }
        ::-webkit-scrollbar-thumb { background: #7CCB2B; border-radius: 999px; border: 3px solid #F4F4F5; }
        ::-webkit-scrollbar-thumb:hover { background: #6FB824; }
        html { scrollbar-color: #7CCB2B #F4F4F5; }
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

        <nav style={{ display: 'flex', gap: 4, background: colors.bg, borderBottom: `1px solid ${colors.line}`, padding: '10px 8px 12px' }}>
          {[
            { key: 'log', label: 'Log it' },
            { key: 'inventory', label: 'Silo' },
            { key: 'library', label: 'Library' },
            { key: 'fileit', label: 'File-it' },
            { key: 'find', label: 'Find it' },
            { key: 'labels', label: 'Labels', nav: '/labels' },
          ].map((tItem) => {
            const t = tItem.key;
            const active = tItem.nav ? false : tab === t;
            return (
              <button
                key={t}
                onClick={() => {
                  if (tItem.nav) { window.location.href = tItem.nav; return; }
                  setTab(t); setError(null);
                  if (t === 'inventory') setEmptyMsg(EMPTY_MESSAGES[Math.floor(Math.random() * EMPTY_MESSAGES.length)]);
                }}
                style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}
              >
                <span style={{ width: 44, height: 44, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', background: active ? colors.ink : colors.bgAlt, color: active ? '#fff' : colors.inkSoft, transition: 'background 0.15s ease, color 0.15s ease' }}>
                  {tabIcon(t)}
                </span>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.01em', color: active ? colors.ink : colors.inkFaint }}>
                  {tItem.label}
                </span>
              </button>
            );
          })}
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
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Silo ({unfiledItems.length})</h2>
            {unfiledItems.length === 0 && <p style={{ color: colors.inkFaint, textAlign: 'center', marginTop: 40, fontSize: 15, lineHeight: 1.5, padding: '0 20px' }}>{emptyMsg}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14 }}>
              {unfiledItems.map((item) => {
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
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setSheetNewName(''); setMovingItem(item); }}
                      title="Move to a folder"
                      aria-label="Move to a folder"
                      style={{ position: 'absolute', bottom: 10, right: 10, padding: '4px 10px', borderRadius: 999, border: `1px solid ${colors.line}`, background: '#fff', color: colors.inkSoft, fontSize: 11, fontWeight: 700, letterSpacing: '0.03em', cursor: 'pointer', zIndex: 2 }}
                    >
                      Move
                    </button>
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
        {loaded && tab === 'library' && (() => {
          const q = librarySearch.trim().toLowerCase();
          const shown = q
            ? books.filter((b) => (b.name || '').toLowerCase().includes(q) || (b.author || '').toLowerCase().includes(q) || (b.box || '').toLowerCase().includes(q))
            : books;
          return (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700 }}>Library ({books.length})</h2>
                <button className="act" type="button" onClick={openAddBook} style={{ ...primaryBtn, flex: '0 0 auto', width: 'auto', padding: '10px 16px', fontSize: 13.5 }}>+ Add a book</button>
              </div>
              <p style={{ color: colors.inkFaint, fontSize: 13, marginBottom: 14 }}>Your books, boxed away but easy to find. Each one remembers which box it&rsquo;s in.</p>

              {books.length > 0 && (
                <input
                  type="text"
                  placeholder="Search title, author or box..."
                  value={librarySearch}
                  onChange={(e) => setLibrarySearch(e.target.value)}
                  style={{ ...inputStyle, marginBottom: 16 }}
                />
              )}

              {books.length === 0 ? (
                <p style={{ color: colors.inkFaint, textAlign: 'center', padding: '30px 20px', fontSize: 13.5, lineHeight: 1.5 }}>
                  No books yet. Tap <strong>+ Add a book</strong> and scan a barcode to get started.
                </p>
              ) : shown.length === 0 ? (
                <p style={{ color: colors.inkFaint, textAlign: 'center', padding: '30px 0', fontSize: 13.5 }}>Nothing matches that.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(104px, 1fr))', gap: 14 }}>
                  {shown.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => { setOpenItem(b); setNotice(null); }}
                      style={{ cursor: 'pointer' }}
                    >
                      {b.photos && b.photos[0] ? (
                        <img src={b.photos[0]} alt="" style={{ width: '100%', aspectRatio: '2 / 3', objectFit: 'cover', borderRadius: 8, background: colors.bgAlt, display: 'block', boxShadow: '0 1px 4px rgba(23,26,32,0.12)' }} />
                      ) : (
                        <div style={{ width: '100%', aspectRatio: '2 / 3', background: colors.bgAlt, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 8, fontSize: 12, fontWeight: 600, color: colors.inkFaint }}>{limitWords(b.name || 'Book', 6)}</div>
                      )}
                      <div style={{ fontWeight: 600, fontSize: 12.5, marginTop: 6, lineHeight: 1.25 }}>{limitWords(b.name || 'Untitled', 6)}</div>
                      <div style={{ fontSize: 11, color: colors.inkFaint, fontWeight: 600, marginTop: 2 }}>BOX: {b.box || '\u2014'}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })()}

        {loaded && tab === 'fileit' && (() => {
          const validFolder = files.find((f) => String(f.id) === String(selectedFileId));
          const showingSilo = selectedFileId === 'unfiled' || !validFolder;
          const activeId = showingSilo ? 'unfiled' : selectedFileId;
          const selectedFile = showingSilo ? null : validFolder;
          const shownItems = showingSilo ? unfiledItems : itemsInFile(selectedFileId);
          const picking = !!pickedItemId;
          const tabPill = (id, label, count, fileObj) => {
            const active = String(activeId) === String(id);
            const itemOver = ((dragOverFile === id) || picking) && !dragTabId;
            const tabOver = dragTabId && dragOverTab === id && String(dragTabId) !== String(id);
            return (
              <button
                key={id}
                type="button"
                draggable={!!fileObj}
                onClick={() => { if (pickedItemId) { moveItemToFile(pickedItemId, id); setPickedItemId(null); } else { setSelectedFileId(id); setEditingName(false); setNotice(null); } }}
                onDragStart={fileObj ? (e) => { setDragTabId(fileObj.id); e.dataTransfer.effectAllowed = 'move'; try { e.dataTransfer.setData('text/plain', 'tab:' + fileObj.id); } catch (_) {} } : undefined}
                onDragEnd={fileObj ? () => { setDragTabId(null); setDragOverTab(null); } : undefined}
                onDragOver={(e) => { e.preventDefault(); if (dragTabId) { if (dragOverTab !== id) setDragOverTab(id); } else if (dragOverFile !== id) setDragOverFile(id); }}
                onDragLeave={() => { if (dragTabId) setDragOverTab((p) => (p === id ? null : p)); else setDragOverFile((p) => (p === id ? null : p)); }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragTabId) { if (fileObj) reorderTabs(dragTabId, fileObj.id); setDragTabId(null); setDragOverTab(null); }
                  else { moveItemToFile(dragItemId, id); setDragOverFile(null); setDragItemId(null); }
                }}
                style={{
                  flex: '0 0 auto', whiteSpace: 'nowrap', cursor: fileObj ? 'grab' : 'pointer',
                  padding: '9px 15px', borderRadius: '11px 11px 3px 3px', fontSize: 13, fontWeight: 600,
                  border: tabOver ? `2px solid ${colors.ink}` : (itemOver ? `2px dashed ${colors.success}` : `1.5px solid ${active ? colors.ink : colors.line}`),
                  background: itemOver ? colors.successBg : (active ? colors.ink : '#fff'),
                  color: itemOver ? colors.success : (active ? '#fff' : colors.inkSoft),
                  transition: 'background 0.12s ease, color 0.12s ease',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
                  </svg>
                  {label} ({count})
                </span>
              </button>
            );
          };
          return (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>File-it</h2>
              <p style={{ color: colors.inkFaint, fontSize: 13, marginBottom: 14 }}>
                The <strong>Silo</strong> holds everything you&rsquo;ve logged. Hit <strong>Move</strong> on an item to file it into a folder. Drag folders to reorder.
              </p>

              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, marginBottom: 4, borderBottom: `1px solid ${colors.line}` }}>
                {tabPill('unfiled', 'Silo', unfiledItems.length)}
                {files.map((f) => tabPill(f.id, f.name || 'Untitled', itemsInFile(f.id).length, f))}
                <button
                  type="button"
                  onClick={() => { setShowNewFile(true); setNewFileName(''); }}
                  style={{ flex: '0 0 auto', whiteSpace: 'nowrap', cursor: 'pointer', padding: '9px 15px', borderRadius: '11px 11px 3px 3px', fontSize: 13, fontWeight: 600, border: `1.5px dashed ${colors.line}`, background: colors.bgAlt, color: colors.inkSoft }}
                >
                  + New
                </button>
              </div>

              {showNewFile && (
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  <input
                    type="text"
                    autoFocus
                    placeholder="Name the file &mdash; e.g. Books, Sold, Kids' art"
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
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
                        {(() => {
                          const pos = files.findIndex((f) => String(f.id) === String(selectedFile.id));
                          const arrow = (label, dir, disabled) => (
                            <button type="button" disabled={disabled} onClick={() => nudgeFile(selectedFile, dir)} style={{ background: 'none', border: 'none', color: disabled ? colors.line : colors.inkSoft, fontSize: 12.5, fontWeight: 600, cursor: disabled ? 'default' : 'pointer', padding: '2px 0' }}>{label}</button>
                          );
                          return (<>
                            {arrow('\u25C0 Move left', -1, pos <= 0)}
                            {arrow('Move right \u25B6', 1, pos < 0 || pos >= files.length - 1)}
                          </>);
                        })()}
                        <button type="button" onClick={() => { setEditingName(true); setRenameValue(selectedFile.name || ''); }} style={{ background: 'none', border: 'none', color: colors.inkSoft, fontSize: 12.5, cursor: 'pointer', padding: '2px 0', textDecoration: 'underline', textUnderlineOffset: 2 }}>Rename file</button>
                      </div>
                      <div style={{ textAlign: 'center', marginTop: 18 }}>
                        <button type="button" onClick={() => { if (confirm(`Delete the "${selectedFile.name}" file? The items in it are kept, just moved back to the Silo.`)) deleteFile(selectedFile); }} style={{ background: 'none', border: `1px solid ${colors.line}`, color: colors.inkFaint, fontSize: 11.5, fontWeight: 600, cursor: 'pointer', padding: '6px 14px', borderRadius: 999 }}>Delete file</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div style={{ marginTop: 18 }}>
                {shownItems.length === 0 ? (
                  <p style={{ color: colors.inkFaint, textAlign: 'center', padding: '30px 20px', fontSize: 13.5, lineHeight: 1.5 }}>
                    {showingSilo
                      ? 'The Silo is empty \u2014 log something, or it\u2019s all been filed into folders.'
                      : <>Nothing in &ldquo;{selectedFile?.name}&rdquo; yet. In the <strong>Silo</strong>, hit <strong>Move</strong> on an item and pick this file.</>}
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
                          style={{ background: '#fff', border: `1px solid ${colors.line}`, borderRadius: 14, padding: 12, cursor: 'pointer', position: 'relative', boxShadow: '0 1px 3px rgba(23,26,32,0.04)', opacity: dragItemId === item.id ? 0.4 : 1 }}
                        >
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setSheetNewName(''); setMovingItem(item); }}
                            title="Move to a folder"
                            aria-label="Move to a folder"
                            style={{ position: 'absolute', bottom: 10, right: 10, padding: '4px 10px', borderRadius: 999, border: `1px solid ${colors.line}`, background: '#fff', color: colors.inkSoft, fontSize: 11, fontWeight: 700, letterSpacing: '0.03em', cursor: 'pointer', zIndex: 2 }}
                          >
                            Move
                          </button>
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

            <button
              type="button"
              onClick={() => { setViewBoxError(null); setViewBoxManual(''); setScanningBoxView(true); }}
              style={{ width: '100%', marginBottom: 20, padding: '13px 14px', borderRadius: 12, border: 'none', background: colors.brand, color: colors.ink, fontSize: 14.5, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.ink} strokeWidth="2" style={{ flexShrink: 0 }}>
                <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
                <path d="M7 12h10" />
              </svg>
              Scan a box to see what&rsquo;s inside
            </button>

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

      {addingBook && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(23,26,32,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 130 }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 560, maxHeight: '92vh', overflowY: 'auto', borderRadius: '20px 20px 0 0', padding: 0 }}>
            <div style={{ background: colors.ink, padding: '14px 16px', borderRadius: '20px 20px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Add a book</span>
              <button type="button" onClick={closeAddBook} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>&times;</button>
            </div>

            <div style={{ padding: 20 }}>
              {bookError && <p style={{ color: colors.accent, fontSize: 13, marginBottom: 12 }}>{bookError}</p>}

              {bookStep === 'scan' && (
                <div>
                  <p style={{ color: colors.inkSoft, fontSize: 13.5, marginBottom: 12 }}>Snap a photo of the barcode on the back &mdash; the long one starting <strong>978</strong>. Get in close so the barcode fills most of the photo and is sharp.</p>
                  <label style={{ ...primaryBtn, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', marginBottom: 16, opacity: bookBusy ? 0.6 : 1 }} onClick={() => stopScan()}>
                    {bookBusy ? 'Reading\u2026' : 'Snap the barcode'}
                    <input type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={decodeBarcodeFromPhoto} />
                  </label>

                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: colors.inkFaint, marginBottom: 8, textAlign: 'center' }}>OR HOLD IT UP TO THE LIVE CAMERA</div>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', background: '#000', borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
                    <video ref={videoRef} muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: '28% 12%', border: `2px solid rgba(124,203,43,0.9)`, borderRadius: 8 }} />
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="button" onClick={() => { stopScan(); setBookStep('search'); }} style={{ ...outlineBtn, flex: 1 }}>Search by title</button>
                    <button type="button" onClick={() => { stopScan(); setBookIsbnInput(''); setBookStep('isbn'); }} style={{ ...outlineBtn, flex: 1 }}>Type ISBN</button>
                  </div>
                </div>
              )}

              {bookStep === 'isbn' && (
                <div>
                  <p style={{ color: colors.inkSoft, fontSize: 13.5, marginBottom: 10 }}>Type or paste the ISBN (the number under the barcode).</p>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    <input type="text" inputMode="numeric" autoFocus placeholder="e.g. 9780143127796" value={bookIsbnInput} onChange={(e) => setBookIsbnInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') lookupIsbn(bookIsbnInput); }} style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
                    <button type="button" onClick={() => lookupIsbn(bookIsbnInput)} disabled={!bookIsbnInput.trim() || bookBusy} style={{ ...primaryBtn, flex: '0 0 auto', width: 'auto', padding: '0 18px', opacity: (bookIsbnInput.trim() && !bookBusy) ? 1 : 0.5 }}>{bookBusy ? '...' : 'Find'}</button>
                  </div>
                  <div style={{ display: 'flex', gap: 14 }}>
                    <button type="button" onClick={() => setBookStep('search')} style={{ background: 'none', border: 'none', color: colors.inkSoft, fontSize: 12.5, textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>Search by title instead</button>
                    <button type="button" onClick={startManualEntry} style={{ background: 'none', border: 'none', color: colors.inkSoft, fontSize: 12.5, textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>Enter it manually</button>
                  </div>
                </div>
              )}

              {bookStep === 'search' && (
                <div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                    <input type="text" autoFocus placeholder="Book title..." value={bookSearchQuery} onChange={(e) => setBookSearchQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') searchByTitle(bookSearchQuery); }} style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
                    <button type="button" onClick={() => searchByTitle(bookSearchQuery)} disabled={!bookSearchQuery.trim() || bookBusy} style={{ ...primaryBtn, flex: '0 0 auto', width: 'auto', padding: '0 18px', opacity: (bookSearchQuery.trim() && !bookBusy) ? 1 : 0.5 }}>{bookBusy ? '...' : 'Search'}</button>
                  </div>
                  {bookSearchResults.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                      {bookSearchResults.map((r, i) => (
                        <button key={i} type="button" onClick={() => pickSearchResult(r)} style={{ display: 'flex', gap: 12, alignItems: 'center', textAlign: 'left', padding: 8, border: `1px solid ${colors.line}`, borderRadius: 10, background: '#fff', cursor: 'pointer' }}>
                          {r.cover ? <img src={r.cover} alt="" style={{ width: 40, height: 58, objectFit: 'cover', borderRadius: 4, flexShrink: 0, background: colors.bgAlt }} /> : <div style={{ width: 40, height: 58, background: colors.bgAlt, borderRadius: 4, flexShrink: 0 }} />}
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 600, fontSize: 13.5, color: colors.ink }}>{r.title}</div>
                            <div style={{ fontSize: 12, color: colors.inkFaint }}>{r.author}{r.year ? ` \u00b7 ${r.year}` : ''}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  <button type="button" onClick={() => startManualEntry(bookSearchQuery)} style={{ background: 'none', border: 'none', color: colors.inkSoft, fontSize: 12.5, textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>Can&rsquo;t find it? Enter it manually</button>
                </div>
              )}

              {bookStep === 'confirm' && bookDraft && (
                <div>
                  {bookBusy && !bookDraft.title ? (
                    <p style={{ color: colors.inkFaint, textAlign: 'center', padding: '20px 0' }}>Looking it up...</p>
                  ) : (
                    <>
                      <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
                        {bookDraft.cover ? <img src={bookDraft.cover} alt="" style={{ width: 88, height: 128, objectFit: 'cover', borderRadius: 8, flexShrink: 0, background: colors.bgAlt, boxShadow: '0 1px 4px rgba(23,26,32,0.15)' }} /> : <div style={{ width: 88, height: 128, background: colors.bgAlt, borderRadius: 8, flexShrink: 0 }} />}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: colors.inkFaint }}>TITLE</label>
                          <input type="text" value={bookDraft.title} onChange={(e) => setBookDraft({ ...bookDraft, title: e.target.value })} style={{ ...inputStyle, marginBottom: 8, marginTop: 4 }} />
                          <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: colors.inkFaint }}>AUTHOR</label>
                          <input type="text" value={bookDraft.author} onChange={(e) => setBookDraft({ ...bookDraft, author: e.target.value })} style={{ ...inputStyle, marginBottom: 0, marginTop: 4 }} />
                        </div>
                      </div>

                      <div style={{ marginBottom: 12 }}>
                        <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: colors.inkFaint }}>WHICH BOX IS IT IN?</label>
                        <button
                          type="button"
                          onClick={() => { setBoxScanError(null); setScanningBookBox(true); }}
                          style={{ width: '100%', marginTop: 6, marginBottom: 8, padding: '12px 14px', borderRadius: 12, border: 'none', background: colors.brand, color: colors.ink, fontSize: 14.5, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.ink} strokeWidth="2" style={{ flexShrink: 0 }}>
                            <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
                            <path d="M7 12h10" />
                          </svg>
                          {bookBox.trim() ? `In "${bookBox.trim()}" \u2014 scan again` : 'Scan the box label'}
                        </button>
                        <input type="text" list="boxlist" placeholder={'\u2026 or type the box name'} value={bookBox} onChange={(e) => setBookBox(e.target.value)} style={{ ...inputStyle, marginBottom: 0, marginTop: 0, fontSize: 13.5 }} />
                        <datalist id="boxlist">{recentBoxes.map((b) => <option key={b} value={b} />)}</datalist>
                      </div>

                      <div style={{ marginBottom: 16 }}>
                        <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: colors.inkFaint }}>YOUR OWN PHOTO (optional \u2014 for special covers)</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
                          {bookOwnPhoto && <img src={bookOwnPhoto} alt="" style={{ width: 44, height: 62, objectFit: 'cover', borderRadius: 6 }} />}
                          <label style={{ ...outlineBtn, width: 'auto', padding: '10px 16px', fontSize: 13, cursor: 'pointer', display: 'inline-block' }}>
                            {bookOwnPhoto ? 'Retake' : 'Add a photo'}
                            <input type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={handleBookOwnPhoto} />
                          </label>
                          {bookOwnPhoto && <button type="button" onClick={() => setBookOwnPhoto(null)} style={{ background: 'none', border: 'none', color: colors.accent, fontSize: 12.5, cursor: 'pointer' }}>Remove</button>}
                        </div>
                      </div>

                      <button className="act" type="button" onClick={saveBook} disabled={bookBusy} style={{ ...primaryBtn, width: '100%', opacity: bookBusy ? 0.6 : 1 }}>{bookBusy ? 'Saving...' : 'Add to library'}</button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {movingItem && (
        <div
          onClick={() => setMovingItem(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(23,26,32,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 120 }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', width: '100%', maxWidth: 480, maxHeight: '80vh', overflowY: 'auto', borderRadius: '20px 20px 0 0', padding: 20 }}>
            <div style={{ fontSize: 12, color: colors.inkFaint, fontWeight: 600, marginBottom: 2 }}>MOVE TO</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>
              {movingItem.type === 'box' ? limitWords(movingItem.notes || 'Mixed box', 6) : limitWords(movingItem.name || 'Unidentified item', 6)}
            </div>

            {files.length === 0 && (
              <p style={{ color: colors.inkFaint, fontSize: 13, marginBottom: 14 }}>No folders yet &mdash; make one below.</p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
              {files.map((f) => {
                const here = String(movingItem.file_id || '') === String(f.id);
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => fileInto(movingItem, here ? 'unfiled' : f.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', padding: '12px 14px', borderRadius: 12, border: `1.5px solid ${here ? colors.ink : colors.line}`, background: here ? colors.bgAlt : '#fff', color: colors.ink, fontSize: 14.5, fontWeight: 600, cursor: 'pointer' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.inkSoft} strokeWidth="2" style={{ flexShrink: 0 }}>
                      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
                    </svg>
                    <span style={{ flex: 1 }}>{f.name || 'Untitled'}</span>
                    {here && <span style={{ fontSize: 12, color: colors.inkFaint, fontWeight: 600 }}>Here now &middot; tap to remove</span>}
                  </button>
                );
              })}
            </div>

            {movingItem.file_id && (
              <button
                type="button"
                onClick={() => fileInto(movingItem, 'unfiled')}
                style={{ width: '100%', textAlign: 'left', padding: '12px 14px', borderRadius: 12, border: `1.5px solid ${colors.line}`, background: '#fff', color: colors.inkSoft, fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 14 }}
              >
                &#8617; Take out &mdash; back to the Silo
              </button>
            )}

            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input
                type="text"
                placeholder="New folder name..."
                value={sheetNewName}
                onChange={(e) => setSheetNewName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') createFolderInto(sheetNewName, movingItem); }}
                style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
              />
              <button type="button" onClick={() => createFolderInto(sheetNewName, movingItem)} disabled={!sheetNewName.trim()} style={{ ...primaryBtn, flex: '0 0 auto', width: 'auto', padding: '0 18px', opacity: sheetNewName.trim() ? 1 : 0.5 }}>Create</button>
            </div>

            <button type="button" onClick={() => setMovingItem(null)} style={{ ...outlineBtn, width: '100%' }}>Cancel</button>
          </div>
        </div>
      )}

      {scanningBoxItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(23,26,32,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 140 }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 480, borderRadius: '20px 20px 0 0', padding: 0 }}>
            <div style={{ background: colors.ink, padding: '14px 16px', borderRadius: '20px 20px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Scan the box label</span>
              <button type="button" onClick={() => { stopBoxScan(); setScanningBoxItem(null); }} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>&times;</button>
            </div>
            <div style={{ padding: 20 }}>
              <p style={{ color: colors.inkSoft, fontSize: 13.5, margin: '0 0 12px' }}>
                Point the camera at the printed QR on the box. It files <strong>{scanningBoxItem.name || 'this item'}</strong> into that box.
              </p>
              {boxScanError && <p style={{ color: colors.accent, fontSize: 13, marginBottom: 12 }}>{boxScanError}</p>}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', background: '#000', borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
                <video ref={boxVideoRef} muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: '20%', border: '2px solid rgba(124,203,43,0.9)', borderRadius: 10 }} />
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: colors.inkFaint, marginBottom: 6 }}>OR TYPE THE BOX NAME</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="text" value={boxManual} onChange={(e) => setBoxManual(e.target.value)} placeholder="e.g. Box 3" style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
                <button type="button" onClick={() => { if (boxManual.trim()) { stopBoxScan(); fileScannedBox(boxManual.trim()); } }} disabled={!boxManual.trim()} style={{ ...primaryBtn, flex: '0 0 auto', width: 'auto', padding: '0 18px', opacity: boxManual.trim() ? 1 : 0.5 }}>File</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {scanningBookBox && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(23,26,32,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 160 }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 480, borderRadius: '20px 20px 0 0', padding: 0 }}>
            <div style={{ background: colors.ink, padding: '14px 16px', borderRadius: '20px 20px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Scan the box label</span>
              <button type="button" onClick={() => { stopBoxScan(); setScanningBookBox(false); }} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>&times;</button>
            </div>
            <div style={{ padding: 20 }}>
              <p style={{ color: colors.inkSoft, fontSize: 13.5, margin: '0 0 12px' }}>
                Point the camera at the printed QR on the box. That sets where this book is stored &mdash; no typing.
              </p>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', background: '#000', borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
                <video ref={bookBoxVideoRef} muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: '20%', border: '2px solid rgba(124,203,43,0.9)', borderRadius: 10 }} />
              </div>
              <button type="button" onClick={() => { stopBoxScan(); setScanningBookBox(false); }} style={{ ...outlineBtn, width: '100%' }}>Cancel &mdash; I&rsquo;ll type it</button>
            </div>
          </div>
        </div>
      )}

      {scanningBoxView && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(23,26,32,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 150 }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 480, borderRadius: '20px 20px 0 0', padding: 0 }}>
            <div style={{ background: colors.ink, padding: '14px 16px', borderRadius: '20px 20px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Scan a box</span>
              <button type="button" onClick={() => { stopBoxScan(); setScanningBoxView(false); }} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>&times;</button>
            </div>
            <div style={{ padding: 20 }}>
              <p style={{ color: colors.inkSoft, fontSize: 13.5, margin: '0 0 12px' }}>
                Point the camera at the printed QR on the box to see everything inside it.
              </p>
              {viewBoxError && <p style={{ color: colors.accent, fontSize: 13, marginBottom: 12 }}>{viewBoxError}</p>}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', background: '#000', borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
                <video ref={viewBoxVideoRef} muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: '20%', border: '2px solid rgba(124,203,43,0.9)', borderRadius: 10 }} />
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: colors.inkFaint, marginBottom: 6 }}>OR TYPE THE BOX NAME</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="text" list="boxlist" value={viewBoxManual} onChange={(e) => setViewBoxManual(e.target.value)} placeholder="e.g. Box 3" style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
                <button type="button" onClick={() => { if (viewBoxManual.trim()) { stopBoxScan(); setScanningBoxView(false); setViewingBox(viewBoxManual.trim()); setViewBoxManual(''); } }} disabled={!viewBoxManual.trim()} style={{ ...primaryBtn, flex: '0 0 auto', width: 'auto', padding: '0 18px', opacity: viewBoxManual.trim() ? 1 : 0.5 }}>Open</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewingBox && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(23,26,32,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 150 }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 560, maxHeight: '85vh', overflowY: 'auto', borderRadius: '20px 20px 0 0', padding: 0 }}>
            <div style={{ background: colors.ink, padding: '14px 16px', borderRadius: '20px 20px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ color: colors.inkFaint, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em' }}>INSIDE THIS BOX</div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{viewingBox} &middot; {viewingBoxItems.length} {viewingBoxItems.length === 1 ? 'item' : 'items'}</div>
              </div>
              <button type="button" onClick={() => setViewingBox(null)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', lineHeight: 1, flexShrink: 0, marginLeft: 12 }}>&times;</button>
            </div>
            <div style={{ padding: 20 }}>
              {viewingBoxItems.length === 0 ? (
                <p style={{ color: colors.inkFaint, textAlign: 'center', margin: '24px 0', fontSize: 14.5, lineHeight: 1.5 }}>
                  Nothing&rsquo;s filed into <strong>{viewingBox}</strong> yet. Open an item and tap <strong>Scan box QR to file it</strong> to drop things in here.
                </p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14 }}>
                  {viewingBoxItems.map((item) => {
                    const isBox = item.type === 'box';
                    const sc = isBox ? statusColors.box : (statusColors[item.status] || statusColors.logged);
                    return (
                      <div
                        key={item.id}
                        onClick={() => { setViewingBox(null); setOpenItem(item); setNotice(null); }}
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
                          {isBox ? limitWords(item.notes || 'Mixed box', 6) : limitWords(item.name || 'Unidentified item', 6)}
                        </div>
                        <span style={{ display: 'inline-block', marginTop: 4, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', padding: '3px 8px', borderRadius: 999, background: sc.bg, color: sc.text }}>
                          {isBox ? 'MIXED BOX' : item.status?.toUpperCase()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              <button type="button" onClick={() => { setViewingBox(null); setScanningBoxView(true); }} style={{ ...outlineBtn, width: '100%', marginTop: 18 }}>Scan another box</button>
            </div>
          </div>
        </div>
      )}

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
              {openItem.type === 'book' ? (
                <div style={{ marginBottom: 16 }}>
                  <p style={{ color: colors.inkSoft, fontSize: 14, margin: '0 0 8px' }}>
                    {openItem.author ? `by ${openItem.author}` : 'Unknown author'}{openItem.category ? ` \u00b7 ${openItem.category}` : ''}
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: colors.ink, background: colors.bgAlt, padding: '5px 10px', borderRadius: 999 }}>BOX: {openItem.box || '\u2014'}</span>
                    {openItem.isbn && <span style={{ fontSize: 12, fontWeight: 600, color: colors.inkFaint, background: colors.bgAlt, padding: '5px 10px', borderRadius: 999 }}>ISBN {openItem.isbn}</span>}
                  </div>
                </div>
              ) : (
                <p style={{ color: colors.inkFaint, fontSize: 13, marginBottom: 16 }}>
                  Box: {openItem.box} &middot; {openItem.category || 'uncategorised'}
                </p>
              )}

              <button
                type="button"
                onClick={() => { setBoxScanError(null); setBoxManual(''); setScanningBoxItem(openItem); }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: 13, marginBottom: 16, background: colors.brand, color: colors.ink, border: 'none', borderRadius: 999, fontWeight: 700, fontSize: 14.5, cursor: 'pointer' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <path d="M14 14h3M14 17v3M17 17h3v3M20 14v.01" />
                </svg>
                Scan box QR to file it
              </button>

              {openItem.type !== 'book' && (
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
              )}

              {openItem.type !== 'box' && openItem.type !== 'book' && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', color: colors.inkFaint, marginBottom: 8 }}>STATUS</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['logged', 'listed', 'sold'].map((s) => {
                      const on = (openItem.status || 'logged') === s;
                      const c = statusColors[s] || statusColors.logged;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setItemStatus(openItem, s)}
                          style={{
                            flex: 1, padding: '9px 6px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', cursor: 'pointer',
                            border: on ? `2px solid ${colors.ink}` : `1.5px solid ${colors.line}`,
                            background: on ? c.bg : '#fff',
                            color: on ? c.text : colors.inkFaint,
                          }}
                        >
                          {s.toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {openItem.type !== 'book' && (openItem.estimate ? (
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
              ))}

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
function tabIcon(key) {
  const p = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (key === 'log') {
    return (<svg {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>);
  }
  if (key === 'inventory') {
    return (<svg {...p}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>);
  }
  if (key === 'library') {
    return (<svg {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>);
  }
  if (key === 'fileit') {
    return (<svg {...p}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" /></svg>);
  }
  if (key === 'find') {
    return (<svg {...p}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>);
  }
  return (<svg {...p}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3M14 17v3M17 17h3v3M20 14v.01" /></svg>);
}

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
