import React from 'react';
import classes from './Todo.module.scss';
import Button from '../button/Button';

const Todo = ({ todo, handleDone, handleDelete }) => {
    const isCompleted = todo.completed;

    return (
        <li className={`${classes.li} ${isCompleted ? classes.completed : ''}`}>
            <div className={classes.info}>
                <p className={isCompleted ? classes.strikethrough : ''}>
                    id: {todo.id}
                </p>
                <p className={isCompleted ? classes.strikethrough : ''}>
                    title: {todo.title}
                </p>
            </div>
            <div className={classes.btns}>
                <Button 
                    title={<span className={isCompleted ? classes.strikethrough : ''}>Edit</span>} 
                    action={() => {}} 
                />
                <Button 
                    title={<span className={isCompleted ? classes.strikethrough : ''}>Done</span>} 
                    color={'Secondary'} 
                    action={() => handleDone(todo.id)} 
                />
                <Button 
                    title={<span className={isCompleted ? classes.strikethrough : ''}>Delete</span>} 
                    color={'error'} 
                    action={() => handleDelete(todo.id)} 
                />
            </div>
        </li>
    );
};

export default Todo;
