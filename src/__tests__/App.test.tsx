import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';

describe('App', () => {
  test('renders application title', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const title = screen.getByText(/kanban project management tool/i);
    expect(title).toBeInTheDocument();
  });
});
