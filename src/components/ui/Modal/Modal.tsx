import type { ReactNode } from 'react';
import { Overlay, Container } from './Modal.styles';

export function Modal({
  children,
  onClose,
  style,
}: {
  children: ReactNode;
  onClose: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()} style={style}>
        {children}
      </Container>
    </Overlay>
  );
}
