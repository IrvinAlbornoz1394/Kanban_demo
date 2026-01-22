import styled from 'styled-components';

export const ChartsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const ChartCard = styled.div`
  flex: 1 1 320px;
  min-width: 280px;
  max-width: 500px;
  background: #f5f6fa;
  padding: 16px;
  border-radius: 8px;
  box-sizing: border-box;
`;