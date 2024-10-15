import React from 'react';
import classes from './input.module.css'

const Input = ({ value, onChange, placeholder }) => {
  return (
    <input 
		className={classes.input}
      	type="text"
      	value={value}
      	onChange={onChange}
      	placeholder={placeholder}
    />
  );
};

export default Input;
