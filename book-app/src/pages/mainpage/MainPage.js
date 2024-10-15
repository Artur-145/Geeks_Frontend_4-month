import React, { useState } from 'react';
import classes from './mainpage.module.css';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import BookList from '../../components/booklist/BookList';

const MainPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [books, setBooks] = useState(['Том Сойер', 'Том Сойер', 'Том Сойер', 'Том Сойер']);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddBook = () => {
    inputValue.trim() && (
      setBooks((prevBooks) => [...prevBooks, inputValue]) || setInputValue('')
    );
  };

  const handleDelete = (index) => {
    setBooks((prevBooks) => prevBooks.filter((_, i) => i !== index));
  };

  return (
    <div>
      <p className={classes.text}>Добавить книгу</p>
        <Input  
          value={inputValue}
          onChange={handleChange}
          placeholder="Введите название"
        />
        <Button 
        label="Добавить" 
        onClick={handleAddBook} 
        />
      <BookList 
        books={books} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default MainPage;
