import React, { useEffect, useState } from 'react';
import { fetchBugs, createBug, updateBug, deleteBug } from './api';
import BugForm from './components/BugForm';
import BugList from './components/BugList';

export default function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBugs();
      setBugs(data);
    } catch (err) {
      setError(err.message || 'Failed to load bugs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (payload) => {
    const created = await createBug(payload);
    setBugs((prev) => [created, ...prev]);
    return created;
  };

  const handleUpdate = async (id, payload) => {
    const updated = await updateBug(id, payload);
    setBugs((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
    return updated;
  };

  const handleDelete = async (id) => {
    await deleteBug(id);
    setBugs((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <h1>Bug Tracker</h1>
      <BugForm onCreate={handleCreate} />
      {loading && <div>Loading bugs...</div>}
      {error && <div role="alert">{error}</div>}
      <BugList bugs={bugs} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
}
