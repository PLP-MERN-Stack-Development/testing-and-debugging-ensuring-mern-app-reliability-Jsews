import React from 'react';
import { render, screen } from '@testing-library/react';
import BugList from '../../components/BugList';

describe('BugList Component', () => {
  it('shows empty message when no bugs', () => {
    render(<BugList bugs={[]} />);
    expect(screen.getByText(/no bugs reported yet/i)).toBeInTheDocument();
  });

  it('renders bug cards', () => {
    const bugs = [
      { _id: '1', title: 'Bug 1', description: 'Desc 1', status: 'open' },
      { _id: '2', title: 'Bug 2', description: 'Desc 2', status: 'resolved' }
    ];

    render(<BugList bugs={bugs} />);

    expect(screen.getByText(/bug 1/i)).toBeInTheDocument();
    expect(screen.getByText(/bug 2/i)).toBeInTheDocument();
  });
});
