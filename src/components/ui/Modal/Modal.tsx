import { ReactNode } from 'react';
import { Overlay, Container } from './Modal.styles';

export function Modal({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        {children}
      </Container>
    </Overlay>
  );
}
