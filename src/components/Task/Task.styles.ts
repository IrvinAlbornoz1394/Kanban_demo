import styled from 'styled-components';

export const TaskCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 14px;
`;
