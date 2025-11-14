import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';
import * as api from '../../api';

jest.mock('../../api');

describe('App Integration Test', () => {
  it('loads bugs and displays them', async () => {
    api.fetchBugs.mockResolvedValue([
      { _id: '1', title: 'Bug A', description: 'Desc A', status: 'open' }
    ]);

    render(<App />);

    expect(screen.getByText(/loading bugs/i)).toBeInTheDocument();

    expect(await screen.findByText(/bug a/i)).toBeInTheDocument();
  });

  it('creates a new bug and adds it to the list', async () => {
    api.fetchBugs.mockResolvedValue([]);
    api.createBug.mockResolvedValue({
      _id: '2',
      title: 'New Bug',
      description: 'New Desc',
      status: 'open'
    });

    render(<App />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Bug' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'New Desc' } });

    fireEvent.click(screen.getByText(/create bug/i));

    expect(await screen.findByText(/new bug/i)).toBeInTheDocument();
  });

  it('deletes a bug', async () => {
    api.fetchBugs.mockResolvedValue([
      { _id: '1', title: 'Bug A', description: 'Desc A', status: 'open' }
    ]);

    api.deleteBug.mockResolvedValue({});

    render(<App />);

    const deleteBtn = await screen.findByText(/delete/i);
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(screen.queryByText(/bug a/i)).not.toBeInTheDocument();
    });
  });
});
