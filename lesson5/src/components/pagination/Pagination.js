import React from 'react';
import classes from './pagination.module.css';

const Pagination = ({ totalPages, currentPage, paginate }) => {
  return (
    <div className={classes.pagination}>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span>
        {currentPage}
      </span> 
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages} 
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
