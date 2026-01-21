import styled from 'styled-components'

export const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 22px;
  font-size: 14px;
`;

export const BreadcrumbRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
`

interface BreadcrumbItemProps {
  $isActive?: boolean
}

export const BreadcrumbItem = styled.li<BreadcrumbItemProps>`
  display: flex;
  align-items: center;
  gap: 8px;

  &:not(:last-child)::after {
    content: '/';
  }
`

export const BreadcrumbLink = styled.p`
  color: #1976d2;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
  font-weight: 500;

  &:hover {
    color: #1565c0;
    text-decoration: underline;
  }

  &:focus {
    outline: 2px solid #1976d2;
    outline-offset: 2px;
    border-radius: 2px;
  }
`

export const BreadcrumbText = styled.span`
  font-weight: 500;
  cursor: default;
`