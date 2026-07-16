import { getSupabaseServerClient } from '../../../lib/supabaseServer';

export async function GET() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from('items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ items: data });
}

export async function POST(request) {
  const supabase = getSupabaseServerClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from('items')
    .insert({
      type: body.type || 'item',
      name: body.name || '',
      category: body.category || '',
      box: body.box || '',
      notes: body.notes || '',
      photos: body.photos || [],
      document: body.document || null,
      status: 'logged',
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ item: data });
}
