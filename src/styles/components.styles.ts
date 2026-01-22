export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.white};
  th, td {
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 8px 12px;
    text-align: left;
  }
  th {
    background: ${({ theme }) => theme.colors.background};
    font-weight: 600;
  }
  tr:nth-child(even) {
    background: ${({ theme }) => theme.colors.backgroundAlt || '#f9f9f9'};
  }
`;
import styled, { css } from "styled-components";

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    &:hover { background-color: ${({ theme }) => theme.colors.primaryHover}; }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
    &:hover { background-color: ${({ theme }) => theme.colors.secondaryHover}; }
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.white};
    &:hover { background-color: ${({ theme }) => theme.colors.successHover}; }
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.white};
    &:hover { background-color: ${({ theme }) => theme.colors.errorHover}; }
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors.warning};
    color: ${({ theme }) => theme.colors.black};
    &:hover { background-color: ${({ theme }) => theme.colors.warningHover}; }
  `,
  info: css`
    background-color: ${({ theme }) => theme.colors.info};
    color: ${({ theme }) => theme.colors.white};
    &:hover { background-color: ${({ theme }) => theme.colors.infoHover}; }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.outline};
    border: 2px solid ${({ theme }) => theme.colors.outline};
    &:hover {
      color: ${({ theme }) => theme.colors.outlineHover};
      border-color: ${({ theme }) => theme.colors.outlineHover};
      background: ${({ theme }) => theme.colors.background};
    }
  `,
  text: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: none;
    &:hover { color: ${({ theme }) => theme.colors.primaryHover}; background: none; }
  `,
  icon: css`
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.text};
    padding: 4px;
    min-width: 0;
    min-height: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    &:hover { color: ${({ theme }) => theme.colors.error}; background: none; }
  `,
};

export const Button = styled.button<{
  variant?: keyof typeof variantStyles;
  fill?: boolean;
}>
  `
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s, color 0.3s, border-color 0.3s;
    ${({ variant = 'primary' }) => variantStyles[variant]}
    ${({ fill }) => fill === false && css`
      background: transparent;
      color: ${({ theme }) => theme.colors.primary};
      border: 2px solid ${({ theme }) => theme.colors.primary};
      &:hover {
        color: ${({ theme }) => theme.colors.primaryHover};
        border-color: ${({ theme }) => theme.colors.primaryHover};
        background: ${({ theme }) => theme.colors.background};
      }
    `}
  `;

export const ButtonIcon = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.error};
  padding: 4px;
  min-width: 0;
  min-height: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 18px;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.errorHover};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 80px;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.white};
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

