import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa o BrowserRouter
import Login from '../Login';

// Mock do hook useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Login component', () => {
    beforeEach(() => {
      render(
        <Router>
          <Login />
        </Router>
      );
    });

    test('renders login form elements', () => {
        const emailInput = screen.getByLabelText('Email:');
        const passwordInput = screen.getByLabelText('Senha:');
        const submitButton = screen.getByRole('button', { name: 'Login' });
        const toggleLink = screen.getByText('Não tem uma conta? Crie agora');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(toggleLink).toBeInTheDocument();
    });

    test('allows user to toggle between login and create account', () => {
        expect(screen.getAllByText('Login')[0]).toBeInTheDocument();

        fireEvent.click(screen.getByText('Não tem uma conta? Crie agora'));

        expect(screen.getAllByText('Criar Conta')[0]).toBeInTheDocument();

        fireEvent.click(screen.getByText('Já tem uma conta? Faça Login'));

        expect(screen.getAllByText('Login')[0]).toBeInTheDocument();
    });

    test('performs login with correct credentials', async () => {
        fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'user@example.com' } });
        fireEvent.change(screen.getByLabelText('Senha:'), { target: { value: '123456' } });
        fireEvent.click(screen.getByRole('button', { name: 'Login' }));

        expect(mockNavigate).toHaveBeenCalledWith('/profile', { state: { email: 'user@example.com' } });
    }); 
});