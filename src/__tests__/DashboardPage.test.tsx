import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('DashboardPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('muestra el botón para volver a Workspaces', () => {
    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/volver a workspaces/i)).toBeInTheDocument();
  });

  it('muestra el título del dashboard', () => {
    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/panel de analíticas/i)).toBeInTheDocument();
  });

  it('ejecuta la función de navegación al hacer clic en el botón', async () => {
    render(
      <BrowserRouter>
        <DashboardPage />
      </BrowserRouter>
    );

    const button = screen.getByText(/volver a workspaces/i);
    await userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});