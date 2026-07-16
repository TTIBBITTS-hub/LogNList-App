'use client';

import { useState } from 'react';

// Wordmark and mark are copied from app/page.js so the two screens stay in step.
const LOGO_WORDMARK = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV0AAABMCAMAAAD5q5QPAAAA/1BMVEUAAAD///+KwjH///////////////////////////9/vj6JwTD//wCKwTF/fwB//wCJwy+KwTGqqlWIwDKGvTCGvS+JwTCHvi+JvzCPxzEA/wB//3+LvC+X1Taq/1WIvjBVqlVVqgBV/wB/f39/qip/1CoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIUhmzAAAAQHRSTlMA/v4DNMyylm5OBM4BZwICKpoDQi9Nsmz9DwECFP8DhgMDAwIGBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbN3ekQAAB+lJREFUeNrtnYd24yoQhrGHavvaTtbpZXdvef9XvKhYogwIZPCmaPbsOYmtxqfRMPMDCiHf2wAISLbSxgTVv5LFisKVq8EkLHjLwhUrwzjAgrccXdNzGxOL8xaES1eO0bJ4wbaP0ezng2GBbfbmNod9sEWQ4brf0Hl3FX2Xu3R5WbrUto9w557J0/Fsp+OJ7NGtjoadjkeDmdsi+HN0WdW4M8s25K+39WgP+gM/LpDt2rTtLkSM1qYbC0Qfk65F7o6816IrXLryO/iuRW59JL8r0b08ZwCiLLMP8Bnobje7Qw26/sb5KQM4BMVno/u4vj/cPlehC2C1n+XnpO75Ph1dbTduz1aGrv4KuFkIz+jTvgBdL3EoRLf5TvU7cDVHI/sSdN3EoRTdRsjpMmTofv5YdHPL54TNUbo6cfhVg+7INHphwWbWojsmz2kShb05lolH6W6fdvsKkWFKlDA+9rbpfnXoWoeaSXc8ifEDJHkITHkKTnd9T4zEoaDvJrZyvGCnoa7vXlxNtIcHKgVnrXEhW4UiiKyLbuftuVB9lLMlgTjd9U+jZyvmuxGZxW0l47qdCob2tFevqE2Q60/GY82h2xxa+SV6iyy0A5XuVTTXaH3E+r1DdM3EoVQ1QcMb461sBuC6hiIqhWXgVRopdMeBPu+8zcAUFroIFf7WTXbJMAUlSNdIHOrTDbZyzN4q0G0yxOBZmfTdV/8u8a2pffZJ312vT+TlOnS1R4Rb2Q/BVaBrVze4RybvQHPpbl/3u2vQBUQ+uwJdfT0sflrnEO7jH7EEujpx2FyB7iS5bsvSdBHNzjdFIKiTXEr3nDhUpjvluU0fUZxuEly7bwC+Kkq3Txyq0tUxN8GDStNNdsSxFgt1aPPp6p7t79p0J5vJ2uqiMF2S6Ih86Bzoqjjd9atOHGrSTXBdOZ3vsky6CWd1Qm/y7ciiu33a7+vSFW79IJtBnaZoMx5Oj91FvovGBX1iKRj65ITCNMd3SafbJA4V6XrtlOYEBcnPQph2NtkYczL+3lReJYy4Lu+lAcpR50W6XqYgtEs6XZ04/FuRLgFXU7R0L113UrMiLaPi+I+5HOVE6TsvluoKGAVIlUH30SuJd1ejK4mtmFp6XykF0n/MhSk8Sz8rw/cwSs1Uuj+2Nt7HJnG4Gt0VtYVeW0kppJ57ABkxJU+3URJBbg+5+p1HiO7x6AeHp/uKdB0oXFJL54UadEW4JNNnVUgxE9ujudBU3yV3fs9WM2fAdMdG26XgCf/FRn5YzBHdjpYhCaEj8Ljfh+nuycNEIK6akXlubI7+FKHrRSMeR7WCIL3xjohU3/2P3MSziLJ0ozUQE+YoQSW60qUrp5JpDhCN5BG6m1+b+6vRnS6CxPgUlqJL8+j6Eh0ns+ne7snr1gsH9XQGmNQZBpn9o9BlEO8nY3T1v9PVfDdBCxx6nT8YGZzegTqpotsRxujqT39cjW7CIAGvS1e4dIVPN7peySsn4nTjBXLxcbXYmGVMqJqbkXkpV9wRAREmaHTUYoKu/vzmanT78XYWjQ1Fqwkeec49JbetJtzOgdFREfEHM6fo7l6etlej2yVdQJUIIcbzi1KVsJUCeIEhoC+rUcvjq0y6RCcO60DiUN53wZiURZX0GSucLsToQtC8flSZOTVdYRW7ROZZtKdQIkPfPdONJA4RuuEGReNuN5vJmD8GiiHdejztZJgeFFDPGaKDBciz/trwkMXyxiYGuvqru/zIQObkDJIO8/HGm5FAtx836O+J01A5TDKzTaGeODznCl+ZlDVomUJXf/eQSTfWovB8BnoeGrCcnWFN9EJiP70PoRsbp0M8kcnm0pHcZbjrrCxd/eV9Ht1oi+LzGZi0J0UqNO66DiTb+Z68hZ9DN90T5ZiVF6b7/LLZ1qZr+BHjsusomuwhde5DG/na2Jjlu6meyIwJDaosXXIgT9XpprgRA7zKso6VQTfdE62JmrIsXTxxKOy7LOfxDJxQZNJN9URpZ8KyLF00cShJN62Vo4xDw8VcFt00VJ6+E5oJKwSaKk7RxUrisnQTDqGCCq+ZC+bRTcEriaeSg8AfnZl0kcShIN2k+CfNiYg0FBpy6U4/NsqvPAGre3U6CXwm3d3hdVuRLs+NfSo01ymX7sTkc46W9W35Irk5NkXDAsg0XZ04nOrRBTUBhSkv9gUcLZuuubQWOW0Abr86qZt5pfpx1YAe79G98+h6iUPZuBts4Llc8EZZKLYDn0G3JYWdvl0IE1xSZa+ha4ErPI9z3tyyfkPoNiWxsdHbeqTLLqXb/Q+Iu0xi68bQpTr6OZYizag9N6Q5vTmRsVvEhYp9ugln37X0qeB0hxdyvLHsRP7xD3tLHoxNfo50U1ukuqVelgEBdyGgNdbeazt47KNG7NM1Hp2/Dr0X5ilt31aCzFGxtLU2YnjOK6MTJCZtX3WhvSHuto0cFmJCcGhsAELpecIZpFp81Xd4GXYX8rkirvOqcOzZbywLvJHs3djkPbywOtqiWCv9Zk8thYastfxpy9yjC9wHccIRnPzVl/RDvsYu70WD134poZmttIJTq61KjnSwywsuZ9z6xD6cLnRnuG6ihrO47izXTcw+l/cKV3RdtbjuDLiQXQkuNidhWDy3QtxV0ykDW9KF+YCn+Irl7xBcEBx0zRt528HyNzQuDA6tA4vw25EWuAXkpv7NXv18islXmH0F+x8jjnsZi81RWwAAAABJRU5ErkJggg==';

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#171A20', padding: 20 }}>
      <BoxMark size={140} />
      <img
        src={LOGO_WORDMARK}
        alt="LogNList"
        style={{ height: 30, width: 'auto', display: 'block', margin: '16px 0 24px' }}
      />
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 16, padding: 32, width: '100%', maxWidth: 340, boxSizing: 'border-box' }}>
        <p style={{ fontSize: 13, color: '#666', marginBottom: 20, marginTop: 0 }}>Enter the password to continue.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          style={{ width: '100%', padding: 12, border: '1.5px solid #E7E7E8', borderRadius: 10, fontSize: 14, marginBottom: 12, boxSizing: 'border-box', fontFamily: 'inherit' }}
        />
        {error && <p style={{ color: '#E31937', fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: 14, background: '#171A20', color: '#fff', border: 'none', borderRadius: 999, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          {loading ? 'Checking...' : 'Enter'}
        </button>
      </form>
    </div>
  );
}
