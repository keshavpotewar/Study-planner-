import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    addTask({
      id: uuidv4(),
      title,
      subject,
      deadline,
      hours: null, // always null -> later auto divided in Schedule
      completed: false,
    });

    // reset
    setTitle("");
    setSubject("");
    setDeadline("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md mb-6 flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
         Add a New Task
      </h2>

      <input
        type="text"
        placeholder="Task Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        required
      />

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition"
      >
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
