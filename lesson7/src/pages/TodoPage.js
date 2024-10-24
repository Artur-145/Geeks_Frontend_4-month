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
            const response = await axios.get('http://localhost:5000/todos/');
            setTodoList(response.data);
            localStorage.setItem('todos', JSON.stringify(response.data));
        } catch (error) {
            console.error('Ошибка при получении задач:', error);
        }
    };

    const handleAdd = async () => {
        const newTodo = {
            title: inputValue,
            completed: false
        };

        try {
            const response = await axios.post('http://localhost:5000/todos/', newTodo);
            const updatedTodoList = [...todoList, response.data];
            setTodoList(updatedTodoList);
            localStorage.setItem('todos', JSON.stringify(updatedTodoList));
            setInputValue('');
            setShow(false);
        } catch (error) {
            console.error('Ошибка при добавлении задачи:', error);
        }
    };

    const handleDone = async (id) => {
        const todo = todoList.find(todo => todo.id === id);
        const updatedTodo = { ...todo, completed: !todo.completed };

        try {
            await axios.patch(`http://localhost:5000/todos/${id}`, updatedTodo);
            const updatedTodoList = todoList.map(todo => (todo.id === id ? updatedTodo : todo));
            setTodoList(updatedTodoList);
            localStorage.setItem('todos', JSON.stringify(updatedTodoList));
        } catch (error) {
            console.error('Ошибка при обновлении задачи:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/todos/${id}`);
            const updatedTodoList = todoList.filter(todo => todo.id !== id);
            setTodoList(updatedTodoList);
            localStorage.setItem('todos', JSON.stringify(updatedTodoList));
        } catch (error) {
            console.error('Ошибка при удалении задачи:', error);
        }
    };

    const handleEdit = async (todoEdit) => {
        try {
            await axios.patch(`http://localhost:5000/todos/${todoEdit.id}`, todoEdit);
            const updatedTodoList = todoList.map(todo => (todo.id === todoEdit.id ? todoEdit : todo));
            setTodoList(updatedTodoList);
            localStorage.setItem('todos', JSON.stringify(updatedTodoList));
        } catch (error) {
            console.error('Ошибка при редактировании задачи:', error);
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
