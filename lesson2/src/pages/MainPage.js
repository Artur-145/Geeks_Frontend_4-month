import React, { useState } from 'react';
import List from '../components/list/List';
import Button from '../components/button/Button';

const Main = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(prevState => !prevState);
    }; 

    const todoList = [
        {
            id: 1,
            title: 'coding',
            completed: false
        },
        {
            id: 2,
            title: 'eat',
            completed: false
        },
        {
            id: 3,
            title: 'sleep',
            completed: false
        }
    ];

    return (
        <div>
            <List list={todoList} />
            <Button title="ОТКРЫТЬ" onClick={handleShow} />
            {show && <Button title="ЗАКРЫТЬ" onClick={handleShow} />}
        </div>
    );
};

export default Main;
