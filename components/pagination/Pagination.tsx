"use client"

import React, { useState } from 'react';
import styles from "./pagination.module.scss"

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number, itemsPerPage: number) => void;
}

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) => {
  const [showingItems, setShowingItems] = useState(itemsPerPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(e.target.value);
    setShowingItems(newItemsPerPage);
    onPageChange(1, newItemsPerPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pageNumbers.push(
          <button 
            key={i} 
            onClick={() => onPageChange(i, showingItems)}
            className={currentPage === i ? 'active' : ''}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push(<span key={i}>...</span>);
      }
    }
    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.showing}>
        <span>Showing</span>
        <select value={showingItems} onChange={handleItemsPerPageChange}>
          <option value={15}>15</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>out of {totalItems}</span>
      </div>
      <div className={styles.pageControls}>
        <button 
          onClick={() => onPageChange(currentPage - 1, showingItems)} 
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {renderPageNumbers()}
        <button 
          onClick={() => onPageChange(currentPage + 1, showingItems)} 
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;