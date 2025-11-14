import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../../components/BugForm';

describe('BugForm Component', () => {
  it('renders form inputs', () => {
    render(<BugForm onCreate={() => {}} />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('shows error when fields are empty', async () => {
    render(<BugForm onCreate={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /create bug/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Title and description required'
    );
  });

  it('calls onCreate with input values', async () => {
    const onCreate = jest.fn().mockResolvedValue({});

    render(<BugForm onCreate={onCreate} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Crash on login' } });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Reproduce by clicking login twice' }
    });

    fireEvent.click(screen.getByRole('button', { name: /create bug/i }));

    expect(onCreate).toHaveBeenCalledWith({
      title: 'Crash on login',
      description: 'Reproduce by clicking login twice'
    });
  });
});
