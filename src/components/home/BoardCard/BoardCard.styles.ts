import styled, { css } from 'styled-components';

export const Card = styled.div<{ isAdd?: boolean }>`
  height: 96px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  ${({ isAdd, theme }) =>
    isAdd
      ? css`
          background: transparent;
          border: 2px dashed ${theme.colors.border};
          color: ${theme.colors.text};
          align-items: center;
          justify-content: center;
        `
      : css`
          background: ${theme.colors.primary};
          color: white;
        `}
`;

export const BoardMenu = styled.div`
  position: absolute;
  top: 36px;
  right: 8px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
  min-width: 120px;

  > * {
    padding: 8px 16px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
  }
`;

