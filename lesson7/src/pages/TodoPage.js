import React, { useEffect, useState } from 'react';
import TodoList from '../components/todoList/TodoList';
import Button from '../components/button/Button';
import Modal from '../components/modal/Modal';

const TodoPage = () => {
    const [show, setShow] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [todoList, setTodoList] = useState([]);

    const handleShow = () => {
        setShow(prevState => !prevState);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const fetchTodos = () => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodoList(JSON.parse(storedTodos));
        }
    };
    
    const handleAdd = () => {
        const newId = (todoList.length === 0 ? 1 : Math.max(...todoList.map(todo => Number(todo.id))) + 1).toString();
        
        const newTodo = {
            id: newId,
            title: inputValue,
            completed: false
        };
    
        const updatedTodoList = [...todoList, newTodo];
        setTodoList(updatedTodoList);
        localStorage.setItem('todos', JSON.stringify(updatedTodoList));
        setInputValue('');
        setShow(false);
    };    

    const handleDone = (id) => {
        const todo = todoList.find(todo => todo.id === id);
        const updatedTodo = { ...todo, completed: !todo.completed };
        const updatedTodoList = todoList.map(todo => (todo.id === id ? updatedTodo : todo));
        
        setTodoList(updatedTodoList);
        localStorage.setItem('todos', JSON.stringify(updatedTodoList));
    };
    
    const handleDelete = (id) => {
        const updatedTodoList = todoList.filter(todo => todo.id !== id);
        setTodoList(updatedTodoList);
        localStorage.setItem('todos', JSON.stringify(updatedTodoList));
    };
    
    const handleEdit = (todoEdit) => {
        const updatedTodoList = todoList.map(todo => (todo.id === todoEdit.id ? todoEdit : todo));
        setTodoList(updatedTodoList);
        localStorage.setItem('todos', JSON.stringify(updatedTodoList));
    };
    

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <TodoList
                todoList={todoList}
                handleDone={handleDone}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
            <Button title={'Open'} action={handleShow} />
            {show && (
                <Modal
                    handleShow={handleShow}
                    handleChange={handleChange}
                    handleAdd={handleAdd}
                />
            )}
        </div>
    );
};

export default TodoPage;
