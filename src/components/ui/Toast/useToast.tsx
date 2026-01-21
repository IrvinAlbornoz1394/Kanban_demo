import { useState, useCallback } from 'react';

export function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    type?: 'error' | 'success' | 'info';
    key: number;
  } | null>(null);

  const showToast = useCallback((message: string, type?: 'error' | 'success' | 'info') => {
    setToast({ message, type, key: Date.now() });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return { toast, showToast, hideToast };
}
