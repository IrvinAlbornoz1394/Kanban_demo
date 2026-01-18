import styled, { css } from 'styled-components';

export const Card = styled.div<{ isAdd?: boolean }>`
  height: 96px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  display: flex;
  align-items: flex-end;

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
