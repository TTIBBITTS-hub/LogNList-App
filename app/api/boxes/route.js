import { getSupabaseServerClient } from '../../../lib/supabaseServer';

export async function GET() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('boxes')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ boxes: data });
}

export async function POST(request) {
  const supabase = getSupabaseServerClient();
  const body = await request.json();
  const name = (body.name || '').trim();
  if (!name) return Response.json({ error: 'A box name is required' }, { status: 400 });

  const { data, error } = await supabase
    .from('boxes')
    .insert({ code: name, name })
    .select()
    .single();

  // 23505 = unique violation (a box with this name already exists) - treat as OK.
  if (error && error.code !== '23505') {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ box: data || { name } });
}
