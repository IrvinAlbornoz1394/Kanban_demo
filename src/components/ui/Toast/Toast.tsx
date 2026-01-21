import { useEffect } from 'react';
import styled from 'styled-components';

export interface ToastProps {
  message: string;
  type?: 'error' | 'success' | 'info';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'info', onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <ToastContainer $type={type}>
      {message}
    </ToastContainer>
  );
}

const ToastContainer = styled.div<{ $type: string }>`
  position: fixed;
  bottom: 32px;
  right: 32px;
  min-width: 220px;
  background: ${({ $type, theme }) =>
    $type === 'error' ? '#d32f2f' : $type === 'success' ? '#388e3c' : theme.colors.primary};
  color: #fff;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  font-size: 16px;
  z-index: 9999;
`;
