import { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function ToDoList({ email }) {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        // Fetch To Do list when the component mounts
        const fetchToDoList = async () => {
            try {
                if (email) {
                    const res = await axios.get('/api/todos', { params: { email } });
                    setTodos(res.data.todos || []);
                }
            } catch (error) {
                console.error('Error fetching to-do list:', error.response?.data?.message || error.message);
            }
        };

        fetchToDoList();
    }, [email]);

    const handleAddTask = async () => {
        if (!newTask.trim()) {
            console.error('Task cannot be empty');
            return;
        }

        if (!email) {
            console.error('Email is missing');
            return;
        }

        const updatedTodos = [...todos, newTask];
        setTodos(updatedTodos);
        setNewTask('');
        try {
            const res = await axios.post('/api/todos', { email, todos: updatedTodos });
            console.log('Successfully updated todos:', res.data);
        } catch (error) {
            console.error('Error updating todos:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg text-black">
            <div className="bg-[#19b2a3] p-4 flex items-center justify-center rounded-t-lg w-full max-w-4xl mx-auto">
                <img
                    src="https://cdn.sanity.io/images/0k2k2bbv/production/9d8447213a67ce12fcc4ccd186bf2403bbc62052-276x110.png"
                    alt="Icon"
                    className="h-auto w-32"
                />
            </div>
            <h2 className="text-2xl font-semibold">To Do List</h2>
            <div className="p-4 bg-gray-100 rounded-b-lg">
                <ul className="mb-4">
                    {todos.map((task, index) => (
                        <li key={index} className="border-b py-2">{task}</li>
                    ))}
                </ul>
                <div className="flex items-center">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="New task"
                        className="flex-grow p-2 border border-gray-300 rounded-l-lg"
                    />
                    <IconButton 
                        onClick={handleAddTask}
                        className="bg-blue-500 text-white rounded-r-lg"
                    >
                        <AddIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
