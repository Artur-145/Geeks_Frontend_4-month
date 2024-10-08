import React from 'react';
import classes from './button.module.scss';

const Button = ({ title, onClick }) => {
    return (
        <button className={classes.btn} onClick={onClick}>
            {title}
        </button>
    );
};

export default Button;
