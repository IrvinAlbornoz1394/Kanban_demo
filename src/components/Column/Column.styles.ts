import styled from 'styled-components';

export const ColumnWrapper = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  padding: 12px;
  width: 260px;
  margin-right: 16px;
`;

export const ColumnTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0px;
`;
