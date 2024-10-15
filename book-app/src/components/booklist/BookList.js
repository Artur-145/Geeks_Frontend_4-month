import React from 'react';
import classes from './booklist.module.css';

const BookList = ({ books, onDelete }) => {
  return (
    <div>
      <p className={classes.bookTitle}>Название</p>  
      <ul className={classes.list}>
        {books.map((book, index) => (
          <li key={index} className={classes.listItem}>
            <span>{book}</span>
            <button onClick={() => onDelete(index)} className={classes.deleteButton}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
