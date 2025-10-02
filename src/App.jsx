import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ProgressChart from "./components/ProgressChart";
import SchedulePage from "./components/SchedulePage";
import StudyHoursForm from "./components/StudyHoursForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [dailyHours, setDailyHours] = useState(4); // default
  const location = useLocation();

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));

    const savedHours = localStorage.getItem("dailyHours");
    if (savedHours) setDailyHours(Number(savedHours));
  }, []);

  // Persist tasks & hourly setting
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("dailyHours", dailyHours);
  }, [tasks, dailyHours]);

  // Add / Toggle / Delete helpers
  const addTask = (task) => setTasks((prev) => [...prev, task]);

  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const deleteTask = (id) => {
    // update state (this will also be saved to localStorage by effect)
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-8 bg-white px-6 py-4 rounded-2xl shadow-md">
        <h1 className="text-2xl font-extrabold text-blue-700 tracking-wide"> Smart Study Planner</h1>
        <div className="flex gap-6">
          <Link
            to="/"
            className={`px-3 py-2 rounded-lg font-medium transition ${
              location.pathname === "/" ? "bg-blue-600 text-white shadow" : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Tasks
          </Link>
          <Link
            to="/schedule"
            className={`px-3 py-2 rounded-lg font-medium transition ${
              location.pathname === "/schedule" ? "bg-blue-600 text-white shadow" : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Schedule
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  
                  <TaskForm addTask={addTask} />
                  <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
                </div>
                <div>
                  <ProgressChart tasks={tasks} />
                  <StudyHoursForm setDailyHours={setDailyHours} />
                </div>
              </div>
            }
          />
          <Route
            path="/schedule"
            element={<SchedulePage tasks={tasks} dailyHours={dailyHours} deleteTask={deleteTask} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
