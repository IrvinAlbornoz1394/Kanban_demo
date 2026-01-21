import { useState } from 'react';

export function useFormError() {
  const [error, setError] = useState<string | null>(null);
  const showError = (msg: string) => setError(msg);
  const clearError = () => setError(null);
  return { error, showError, clearError };
}
