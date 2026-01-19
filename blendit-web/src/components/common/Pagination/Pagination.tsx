'use client';

import PageButton from '@/components/common/PageButton';
import PageInfo from '@/components/common/PageInfo';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className 
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex gap-[40px] items-center ${className || ''}`}>
      <PageButton 
        direction="left" 
        onClick={handlePrevious}
        disabled={currentPage === 1}
      />
      <PageInfo 
        currentPage={currentPage} 
        totalPages={totalPages} 
      />
      <PageButton 
        direction="right" 
        onClick={handleNext}
        disabled={currentPage === totalPages}
      />
    </div>
  );
}
