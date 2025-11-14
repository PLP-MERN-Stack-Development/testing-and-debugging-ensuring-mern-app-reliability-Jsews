import React from 'react';
import Button from './Button';

export default function BugCard({ bug, onUpdate, onDelete }) {
  return (
    <div data-testid={`bug-${bug._id}`} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}>
      <h4>{bug.title}</h4>
      <p>{bug.description}</p>
      <div>
        Status: <strong>{bug.status}</strong>
      </div>
      <div style={{ marginTop: 8 }}>
        <Button variant="secondary" size="sm" onClick={() => onUpdate(bug._id, { status: 'in-progress' })}>
          Start
        </Button>{' '}
        <Button variant="danger" size="sm" onClick={() => onUpdate(bug._id, { status: 'resolved' })}>
          Resolve
        </Button>{' '}
        <Button className="ml-2" size="sm" onClick={() => onDelete(bug._id)}>
          Delete
        </Button>
      </div>
    </div>
  );
}
