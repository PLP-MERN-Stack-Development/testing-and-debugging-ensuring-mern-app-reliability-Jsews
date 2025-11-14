import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BugCard from '../../components/BugCard';

describe('BugCard Component', () => {
  const mockBug = {
    _id: '123',
    title: 'Login Crash',
    description: 'App crashes after login',
    status: 'open'
  };

  it('renders bug details', () => {
    render(<BugCard bug={mockBug} />);

    expect(screen.getByText(/login crash/i)).toBeInTheDocument();
    expect(screen.getByText(/app crashes after login/i)).toBeInTheDocument();
    expect(screen.getByText(/open/i)).toBeInTheDocument();
  });

  it('calls onUpdate when buttons clicked', () => {
    const onUpdate = jest.fn();

    render(<BugCard bug={mockBug} onUpdate={onUpdate} />);

    fireEvent.click(screen.getByText(/start/i));
    expect(onUpdate).toHaveBeenCalledWith('123', { status: 'in-progress' });

    fireEvent.click(screen.getByText(/resolve/i));
    expect(onUpdate).toHaveBeenCalledWith('123', { status: 'resolved' });
  });

  it('calls onDelete when delete clicked', () => {
    const onDelete = jest.fn();

    render(<BugCard bug={mockBug} onDelete={onDelete} />);
    fireEvent.click(screen.getByText(/delete/i));

    expect(onDelete).toHaveBeenCalledWith('123');
  });
});
