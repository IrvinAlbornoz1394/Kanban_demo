import styled from 'styled-components';

export const ColumnWrapper = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  padding: 12px;
  width: 260px;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  min-height: 300px;
  height: auto;
  .drag-handle {
    height: 6px;
    background: var(--accent);
    cursor: grab;
    border-radius: 8px 8px 0 0;
  }
`;

export const TasksScrollArea = styled.div`
  flex: 1;
  min-height: 40px;
  padding-top: 8px;
  overflow-y: auto;
  max-height: 60vh;
`;

export const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ColumnTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0px;
`;
