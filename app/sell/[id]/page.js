'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const c = {
  ink: '#171A20',
  inkSoft: '#5C5E62',
  inkFaint: '#98999D',
  bgAlt: '#F4F4F5',
  line: '#E7E7E8',
  success: '#0F7A54',
  accent: '#E31937',
};

const field = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '13px 14px',
  border: `1.5px solid ${c.line}`,
  borderRadius: 12,
  fontSize: 16, // 16px stops iPhones zooming in when you tap a field
  fontFamily: 'inherit',
  marginBottom: 10,
  background: '#fff',
};

export default function SellItemPage() {
  const params = useParams();
  const id = params?.id;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [hero, setHero] = useState(0);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [method, setMethod] = useState('pickup');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/sell?id=${encodeURIComponent(id)}`);
        if (!res.ok) { setNotFound(true); return; }
        const data = await res.json();
        setItem(data.item);
      } catch (e) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function send(e) {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/sell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: id, name, phone, email, message, method }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Something went wrong.');
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return <Shell><p style={{ color: c.inkFaint, textAlign: 'center', marginTop: 40 }}>Loading…</p></Shell>;
  }

  if (notFound || !item) {
    return (
      <Shell>
        <p style={{ textAlign: 'center', marginTop: 40, fontSize: 15, lineHeight: 1.6 }}>
          This listing isn’t available any more.
        </p>
      </Shell>
    );
  }

  const photos = item.photos || [];

  return (
    <Shell>
      {photos.length > 0 && (
        <>
          <div style={{ width: '100%', aspectRatio: '4 / 3', background: c.bgAlt, borderRadius: 16, overflow: 'hidden' }}>
            <img src={photos[hero]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {photos.length > 1 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              {photos.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setHero(i)}
                  style={{
                    flex: '0 0 auto', width: 62, height: 62, padding: 0, borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
                    border: i === hero ? `2px solid ${c.ink}` : `1.5px solid ${c.line}`, background: 'none',
                  }}
                >
                  <img src={p} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <h1 style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.3, margin: '18px 0 6px' }}>{item.title}</h1>

      {item.sold ? (
        <div style={{ display: 'inline-block', background: c.bgAlt, color: c.inkSoft, fontWeight: 700, fontSize: 13, padding: '6px 14px', borderRadius: 999, marginBottom: 12 }}>
          SOLD
        </div>
      ) : item.price != null ? (
        <div style={{ fontSize: 28, fontWeight: 700, color: c.success, marginBottom: 12 }}>${item.price}</div>
      ) : null}

      {item.description && (
        <div style={{ fontSize: 15, color: c.inkSoft, lineHeight: 1.65, whiteSpace: 'pre-wrap', marginBottom: 20 }}>
          {item.description}
        </div>
      )}

      {item.sold ? (
        <p style={{ fontSize: 14, color: c.inkFaint, lineHeight: 1.6 }}>
          This one’s gone. Have a look at <a href="/sell" style={{ color: c.ink }}>everything else that’s for sale</a>.
        </p>
      ) : sent ? (
        <div style={{ background: '#E9F6F0', borderRadius: 14, padding: 18, textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: c.success, marginBottom: 6 }}>Thanks — that’s come through.</div>
          <div style={{ fontSize: 14, color: c.inkSoft, lineHeight: 1.6 }}>You’ll get a reply shortly about this one.</div>
        </div>
      ) : (
        <form onSubmit={send} style={{ background: c.bgAlt, borderRadius: 16, padding: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Interested?</div>
          <p style={{ fontSize: 13.5, color: c.inkFaint, margin: '0 0 14px', lineHeight: 1.55 }}>
            Leave your details and you’ll get a reply about payment and pickup.
          </p>

          <input style={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input style={field} type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input style={field} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            {[{ k: 'pickup', l: 'I’ll pick it up' }, { k: 'post', l: 'Post it to me' }].map((o) => (
              <button
                key={o.k}
                type="button"
                onClick={() => setMethod(o.k)}
                style={{
                  flex: 1, padding: '11px 6px', borderRadius: 12, fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
                  border: method === o.k ? `1.5px solid ${c.ink}` : `1.5px solid ${c.line}`,
                  background: method === o.k ? c.ink : '#fff',
                  color: method === o.k ? '#fff' : c.inkSoft,
                }}
              >
                {o.l}
              </button>
            ))}
          </div>

          <textarea
            style={{ ...field, minHeight: 88, resize: 'vertical' }}
            placeholder="Anything you want to ask? (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {error && <p style={{ color: c.accent, fontSize: 13.5, margin: '0 0 10px' }}>{error}</p>}

          <button
            type="submit"
            disabled={sending}
            style={{
              width: '100%', padding: 15, borderRadius: 999, border: 'none', cursor: 'pointer',
              background: c.ink, color: '#fff', fontWeight: 600, fontSize: 15.5, opacity: sending ? 0.6 : 1,
            }}
          >
            {sending ? 'Sending…' : 'Send enquiry'}
          </button>
          <p style={{ fontSize: 11.5, color: c.inkFaint, textAlign: 'center', margin: '10px 0 0', lineHeight: 1.5 }}>
            Your details are only used to reply about this item.
          </p>
        </form>
      )}
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 0 60px', minHeight: '100vh', background: '#fff', fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif', color: c.ink }}>
      <header style={{ background: c.ink, padding: '18px 20px' }}>
        <a href="/sell" style={{ color: '#fff', fontWeight: 800, fontSize: 17, letterSpacing: '0.02em', textDecoration: 'none' }}>
          LOG&amp;LIST
        </a>
      </header>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}
