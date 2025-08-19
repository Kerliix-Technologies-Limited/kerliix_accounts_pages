const API_URL = 'http://localhost:5000';

export async function fetchTokensWithCode(code) {
  const url = `${API_URL}/auth/callback?code=${encodeURIComponent(code)}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to exchange code for tokens');
  }
  return res.json();
}

export async function refreshTokens(refreshToken) {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  if (!res.ok) {
    throw new Error('Failed to refresh tokens');
  }
  return res.json();
}
