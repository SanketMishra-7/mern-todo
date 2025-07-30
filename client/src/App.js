import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);

  const handleSignup = async () => {
    await axios.post(`${API}/auth/signup`, { username, password });
    alert('Signup successful! Now log in.');
  };

  const handleLogin = async () => {
    const res = await axios.post(`${API}/auth/login`, { username, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  const fetchTodos = async () => {
    const res = await axios.get(`${API}/todos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(res.data);
  };

  const addTodo = async () => {
    const res = await axios.post(`${API}/todos`, { title, completed: false }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos([...todos, res.data]);
    setTitle('');
  };

  const toggleTodo = async (id, completed) => {
    const res = await axios.put(`${API}/todos/${id}`, { completed: !completed }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(todos.filter(todo => todo._id !== id));
  };

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex justify-center items-center p-4">
      <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 w-full max-w-md shadow-lg border border-white/40">
        <h1 className="text-3xl font-bold text-center text-white drop-shadow mb-6">📝 My ToDo List</h1>

        {!token && (
          <>
            <input
              type="text"
              className="border w-full mb-3 p-2 rounded"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="border w-full mb-3 p-2 rounded"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div className="flex gap-3 mb-6">
              <button onClick={handleSignup} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full">Sign Up</button>
              <button onClick={handleLogin} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">Log In</button>
            </div>
          </>
        )}

        {token && (
          <>
            <div className="flex gap-2 mb-4">
              <input
                className="border p-2 rounded flex-grow"
                placeholder="Add new task"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <button onClick={addTodo} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Add</button>
            </div>

            <ul className="space-y-3 max-h-96 overflow-y-auto">
              {todos.map(todo => (
                <li
                  key={todo._id}
                  className="flex justify-between items-center bg-white/80 p-3 rounded shadow-md"
                >
                  <span
                    onClick={() => toggleTodo(todo._id, todo.completed)}
                    className={`cursor-pointer ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800 font-medium'}`}
                  >
                    {todo.title}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="text-red-600 hover:text-red-800 text-xl font-bold"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
