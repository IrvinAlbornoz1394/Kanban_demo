import React from 'react'
import {
  BreadcrumbContainer,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbText
} from './Breadcrumb.styles'
import { useNavigate } from 'react-router-dom';


export interface BreadcrumbItemData {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItemData[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {

    const navigate = useNavigate();

  const isLastItem = (index: number) => index === items.length - 1
  const isSingleItem = items.length === 1

  return (
    <BreadcrumbContainer aria-label="breadcrumbs">
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index} $isActive={isLastItem(index) || isSingleItem}>
            {(isLastItem(index) || isSingleItem) ? (
              <BreadcrumbText>{item.label}</BreadcrumbText>
            ) : (
              <BreadcrumbLink onClick={() => navigate(item.href || '#')}>
                {item.label}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbContainer>
  )
}

export default Breadcrumb