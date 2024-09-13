"use client";

import { useState } from "react";
import LoginForm from "../components/LoginForm";
import ToDoList from "../components/ToDoList";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      {!loggedIn && (
        <header className="bg-[#0a4135] text-white p-4 text-center shadow-md mb-1 rounded">
          <h1 className="text-3xl font-bold">Prueba Iris "To Do List"</h1>
        </header>
      )}

      {!loggedIn ? (
        <div className="w-full max-w-md">
          <LoginForm
            setLoggedIn={setLoggedIn}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <ToDoList email={email} />
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
