'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      window.location.href = '/';
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#171A20', padding: 20 }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 16, padding: 32, width: '100%', maxWidth: 340 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Log&List</h1>
        <p style={{ fontSize: 13, color: '#666', marginBottom: 20 }}>Enter the password to continue.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          style={{ width: '100%', padding: 12, border: '1.5px solid #E7E7E8', borderRadius: 10, fontSize: 14, marginBottom: 12, boxSizing: 'border-box' }}
        />
        {error && <p style={{ color: '#E31937', fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: 14, background: '#171A20', color: '#fff', border: 'none', borderRadius: 999, fontWeight: 600, cursor: 'pointer' }}
        >
          {loading ? 'Checking...' : 'Enter'}
        </button>
      </form>
    </div>
  );
}
