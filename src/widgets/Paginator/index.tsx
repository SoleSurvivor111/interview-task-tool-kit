import React, { useMemo } from 'react';

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  maxVisibleItems?: number;
  maxPages?: number;
  onPageChange: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  maxVisibleItems = 10,
  isLoading,
  maxPages = 100,
  onPageChange,
}) => {
  const renderPageNumbers = useMemo(() => {
    const pageNumbers = [];
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(currentPage + 2, Math.min(totalPages, maxPages));

    if (currentPage > maxVisibleItems) {
      pageNumbers.push(1, '...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (currentPage < Math.min(totalPages, maxPages) - 2) {
      pageNumbers.push('...', Math.min(totalPages, maxPages));
    }

    return pageNumbers.map((page, index) =>
      typeof page === 'number' ? (
        <button
          key={index}
          onClick={() => onPageChange(page)}
          style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}
        >
          {page}
        </button>
      ) : (
        <span key={index}>...</span>
      ),
    );
  }, [currentPage, totalPages, maxVisibleItems, maxPages, onPageChange]);

  if (totalPages === 0) {
    return null;
  }

  return (
    <div>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1 || isLoading}>
        Previous
      </button>
      {renderPageNumbers}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages || isLoading}>
        Next
      </button>
    </div>
  );
};

export default React.memo(Paginator);
