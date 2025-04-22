export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: 'Token dan password wajib diisi.' });
  }

  try {
    const response = await fetch('https://sbpbctyscfdfssperdxj.supabase.co/auth/v1/user', {
      method: 'PUT',
      headers: {
        apikey: process.env.SUPABASE_API_KEY,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    });

    let result = {};
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: result?.message || 'Gagal update password.' });
    }

    return res.status(200).json({ message: 'Password berhasil diupdate.' });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
