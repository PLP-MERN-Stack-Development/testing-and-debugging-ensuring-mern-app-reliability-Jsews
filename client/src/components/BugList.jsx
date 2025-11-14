import React from 'react';
import BugCard from './BugCard';

export default function BugList({ bugs, onUpdate, onDelete }) {
  if (!bugs || bugs.length === 0) {
    return <div>No bugs reported yet.</div>;
  }
  return (
    <div>
      {bugs.map((b) => (
        <BugCard key={b._id} bug={b} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}
