import React from "react";

function TaskList({ tasks, toggleTask }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800"> Task List</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Add some to get started!</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-4 rounded-xl border transition ${
                task.completed
                  ? "bg-green-50 border-green-300"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <div>
                <p
                  className={`text-lg font-medium ${
                    task.completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {task.title}
                </p>
                <p className="text-sm text-gray-500">Subject: {task.subject}</p>
                <p className="text-xs text-gray-400">{task.deadline}</p>
              </div>
              <button
                onClick={() => toggleTask(task.id)}
                className={`px-4 py-2 rounded-lg font-medium text-white ${
                  task.completed ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {task.completed ? "Completed" : "Mark Done"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
