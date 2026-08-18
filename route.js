import { getSupabaseServerClient } from '../../../lib/supabaseServer';

// Public endpoint — no password gate. Only ever returns the fields a buyer is
// meant to see: never the box/location, the valuation, or your own notes.
function publicView(item) {
  const l = item.listing || {};
  return {
    id: item.id,
    title: l.title || item.name || 'Item',
    price: l.price ?? null,
    description: l.description || '',
    photos: item.photos || [],
    sold: item.status === 'sold',
  };
}

export async function GET(request) {
  const supabase = getSupabaseServerClient();
  const id = new URL(request.url).searchParams.get('id');

  if (id) {
    const { data, error } = await supabase.from('items').select('*').eq('id', id).single();
    if (error || !data) return Response.json({ error: 'Not found' }, { status: 404 });
    if (data.status !== 'listed' && data.status !== 'sold') {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }
    return Response.json({ item: publicView(data) });
  }

  // The shopfront: everything currently up for sale, newest first.
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .eq('status', 'listed')
    .order('created_at', { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ items: (data || []).map(publicView) });
}

export async function POST(request) {
  const supabase = getSupabaseServerClient();
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return Response.json({ error: 'Bad request' }, { status: 400 });
  }

  const cap = (s, n) => String(s || '').trim().slice(0, n);
  const itemId = cap(body.itemId, 80);
  const name = cap(body.name, 80);
  const phone = cap(body.phone, 40);
  const email = cap(body.email, 120);
  const message = cap(body.message, 1500);
  const method = body.method === 'post' ? 'post' : 'pickup';

  if (!itemId) return Response.json({ error: 'Bad request' }, { status: 400 });
  if (!name) return Response.json({ error: 'Please put your name in.' }, { status: 400 });
  if (!phone && !email) {
    return Response.json({ error: 'Leave a phone number or an email so you can be contacted.' }, { status: 400 });
  }

  // Make sure they're enquiring about something that's actually for sale.
  const { data: item } = await supabase.from('items').select('id,status,name,listing').eq('id', itemId).single();
  if (!item || item.status !== 'listed') {
    return Response.json({ error: 'That listing has been taken down.' }, { status: 404 });
  }

  // An enquiry is stored as its own row: type 'enquiry', the item it's about in
  // `category`, and the buyer's details as JSON in `notes`. No new table needed.
  const { error } = await supabase.from('items').insert({
    type: 'enquiry',
    name,
    category: itemId,
    box: '',
    notes: JSON.stringify({ phone, email, message, method, at: new Date().toISOString() }),
    photos: [],
    status: 'new',
  });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
