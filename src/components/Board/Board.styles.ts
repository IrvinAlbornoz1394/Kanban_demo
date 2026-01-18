import styled from 'styled-components';

export const BoardHeader = styled.div`
  padding: 12px 16px;

  input {
    font-size: 18px;
    font-weight: 600;
    border: none;
    background: transparent;
    outline: none;
  }
`;

export const BoardWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  overflow-x: auto;
  padding: 16px;
  height: calc(100vh - 112px);
`;
