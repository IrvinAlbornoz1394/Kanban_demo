import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { store } from './app/store';
import App from './App';
import { GlobalStyles } from './styles/globalStyles';
import { lightTheme, darkTheme } from './styles/theme';
import { useAppSelector } from './app/hooks';
import { ToastProvider } from './components/ui/Toast/ToastProvider';

function ThemedApp() {
  const themeMode = useAppSelector((state) => state.ui.theme);

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <ThemedApp />
      </ToastProvider>
    </Provider>
  </React.StrictMode>
);
