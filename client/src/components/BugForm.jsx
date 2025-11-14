import React, { useState } from 'react';
import Button from './Button';

export default function BugForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !description.trim()) {
      setError('Title and description required');
      return;
    }
    setLoading(true);
    try {
      await onCreate({ title: title.trim(), description: description.trim() });
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err.message || 'Failed to create bug');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      {error && <div role="alert">{error}</div>}
      <div style={{ marginBottom: 8 }}>
        <label htmlFor="title">Title</label>
        <br />
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <label htmlFor="description">Description</label>
        <br />
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Bug'}
      </Button>
    </form>
  );
}
