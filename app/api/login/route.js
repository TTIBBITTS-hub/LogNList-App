export async function POST(request) {
  const { password } = await request.json();

  if (!process.env.ACCESS_PASSWORD || !process.env.SESSION_TOKEN) {
    return Response.json({ error: 'Server is not configured for login yet.' }, { status: 500 });
  }

  if (password !== process.env.ACCESS_PASSWORD) {
    return Response.json({ error: 'Wrong password.' }, { status: 401 });
  }

  const response = Response.json({ success: true });
  response.headers.set(
    'Set-Cookie',
    `auth_token=${process.env.SESSION_TOKEN}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`
  );
  return response;
}
