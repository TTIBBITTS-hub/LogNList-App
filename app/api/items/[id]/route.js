import { getSupabaseServerClient } from '../../../../lib/supabaseServer';

export async function PATCH(request, { params }) {
  const supabase = getSupabaseServerClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from('items')
    .update(body)
    .eq('id', params.id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ item: data });
}

export async function DELETE(request, { params }) {
  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from('items').delete().eq('id', params.id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}
