import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '../components/contact/ContactForm';
import '@testing-library/jest-dom';

describe('ContactForm', () => {
  it('renders input fields and button', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /envoyer/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));

    expect(await screen.findByText(/l'email est obligatoire/i)).toBeInTheDocument();
    expect(await screen.findByText(/le message est obligatoire/i)).toBeInTheDocument();
  });

  it('shows error for invalid email format', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalidemail' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));

    expect(await screen.findByText(/email valide/i)).toBeInTheDocument();
  });

  it('displays validation error if message exceeds 300 characters on submit', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'a'.repeat(301) },
    });

    fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));

    // Wait for the error message to appear
    expect(await screen.findByText(/moins de 300 caractères/i)).toBeInTheDocument();

    // Confirm that the character counter is updated
    expect(screen.getByText('301/300')).toBeInTheDocument();
  });

  it('submits form successfully and resets fields', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });

    fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));

    expect(await screen.findByText(/envoi en cours/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText(/demande de contact envoyée/i)).toBeInTheDocument()
    );

    // Check if form reset
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/message/i)).toHaveValue('');
  });
});
