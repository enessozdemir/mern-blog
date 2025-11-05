import { render, screen, fireEvent } from '@testing-library/react';
import ForgotPassword from '../pages/ForgotPassword';
import { vi, describe, it, expect } from 'vitest';

// Mock firebase/auth sendPasswordResetEmail
vi.mock('firebase/auth', () => ({
  sendPasswordResetEmail: vi.fn(() => Promise.resolve()),
}));

describe('ForgotPassword', () => {
  it('renders and submits form', async () => {
    render(<ForgotPassword />);
    const input = screen.getByPlaceholderText(/you@example.com/i);
    const button = screen.getByRole('button', { name: /send reset link/i });

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(button);

    // wait for success message
    const message = await screen.findByText(/reset email sent/i);
    expect(message).toBeInTheDocument();
  });
});
