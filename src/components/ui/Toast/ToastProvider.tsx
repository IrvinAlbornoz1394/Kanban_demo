import { createContext, useContext } from 'react';
import { useToast } from './useToast';
import { Toast } from './Toast';

const ToastContext = createContext<{
  showToast: (message: string, type?: 'error' | 'success' | 'info') => void;
} | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toast, showToast, hideToast } = useToast();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          key={toast.key}
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastContext must be used within ToastProvider');
  return ctx;
}
