/**
 * API helpers for client. Uses the proxy defined in client/package.json
 * so requests to /api will be forwarded to server during development.
 */

const apiBase = '/api';

async function handleResponse(res) {
  const text = await res.text();
  // try to parse JSON if possible
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    const message = (data && data.error) || res.statusText || 'API error';
    const err = new Error(message);
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data;
}

export async function fetchBugs({ page, limit, status } = {}) {
  const params = new URLSearchParams();
  if (page) params.append('page', page);
  if (limit) params.append('limit', limit);
  if (status) params.append('status', status);
  const q = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`${apiBase}/bugs${q}`, { method: 'GET' });
  return handleResponse(res);
}

export async function createBug(payload, token) {
  const res = await fetch(`${apiBase}/bugs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(payload)
  });
  return handleResponse(res);
}

export async function updateBug(id, payload, token) {
  const res = await fetch(`${apiBase}/bugs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(payload)
  });
  return handleResponse(res);
}

export async function deleteBug(id, token) {
  const res = await fetch(`${apiBase}/bugs/${id}`, {
    method: 'DELETE',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
  return handleResponse(res);
}
