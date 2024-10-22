import React, { useEffect, useState } from 'react';
import TodoList from '../components/todoList/TodoList';
import Button from '../components/button/Button';
import Modal from '../components/modal/Modal';
import axios from 'axios';

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

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/todos');
            setTodoList(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleAdd = async () => {
        try {
            const newId = (todoList.length === 0 ? 1 : Math.max(...todoList.map(todo => Number(todo.id))) + 1).toString(); // Преобразуем в строку
    
            const newTodo = {
                id: newId,
                title: inputValue,
                completed: false
            };
    
            const response = await axios.post('http://localhost:5000/todos', newTodo);
            setTodoList([...todoList, response.data]);
            setInputValue('');
            setShow(false);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };    

    const handleDone = async (id) => {
        try {
            const todo = todoList.find(todo => todo.id === id);
            const updatedTodo = { ...todo, completed: !todo.completed };
            await axios.patch(`http://localhost:5000/todos/${id}`, updatedTodo);
            setTodoList(todoList.map(todo => (todo.id === id ? updatedTodo : todo)));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/todos/${id}`); 
            setTodoList(todoList.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleEdit = async (todoEdit) => {
        try {
            await axios.patch(`http://localhost:5000/todos/${todoEdit.id}`, { title: todoEdit.title });
            setTodoList(todoList.map(todo => (todo.id === todoEdit.id ? todoEdit : todo)));
        } catch (error) {
            console.error('Error editing todo:', error);
        }
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
