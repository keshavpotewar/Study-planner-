import React from "react";

function SchedulePage({ tasks, dailyHours, deleteTask }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800"> Study Schedule</h2>
        <p className="text-gray-500">No tasks added yet.</p>
      </div>
    );
  }

  // Group tasks by deadline (date)
  const groupedByDate = tasks.reduce((acc, task) => {
    const dateKey = task.deadline || "No Deadline";
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(task);
    return acc;
  }, {});

  const today = new Date().toISOString().split("T")[0];

  // Separate past vs upcoming (today & future)
  const pastDates = [];
  const upcomingDates = [];

  Object.keys(groupedByDate)
    .sort()
    .forEach((date) => {
      if (date === "No Deadline") {
        upcomingDates.push(date);
      } else if (date < today) {
        pastDates.push(date); // past → archived
      } else {
        upcomingDates.push(date); // today + future
      }
    });

  // Delete handler with confirmation
  const handleDelete = (id) => {
    // confirm
    if (!window.confirm("Are you sure you want to delete this task? This cannot be undone.")) return;
    deleteTask(id);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800"> Date-wise Study Schedule</h2>

      {/* Upcoming (today + future + no deadline) */}
      <div className="space-y-8">
        {upcomingDates.map((date, idx) => {
          const dayTasks = groupedByDate[date];
          const hoursPerTask =
            dailyHours && dailyHours > 0 ? (dailyHours / dayTasks.length).toFixed(1) : null;

          return (
            <div key={idx} className="border-b pb-5">
              <h3 className="text-lg font-bold text-blue-600 mb-4">
                {date === "No Deadline" ? "📌 No Deadline" : `${date}`}
              </h3>

              <div className="space-y-3">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-xl border bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-700">{task.title}</h4>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            task.completed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {task.completed ? "✅ Done" : "⏳ Pending"}
                        </span>

                        <button
                          onClick={() => handleDelete(task.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm"
                        >
                           Delete
                        </button>
                      </div>
                    </div>

                    {task.subject && <p className="text-sm text-gray-600 mb-1">Subject: {task.subject}</p>}
                    {hoursPerTask && <p className="text-sm text-gray-500">⏰ Allocated: {hoursPerTask} hrs</p>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Archived past tasks */}
      {pastDates.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4"> Archived (Past Days)</h2>
          <div className="space-y-8">
            {pastDates.map((date, idx) => {
              const dayTasks = groupedByDate[date];
              return (
                <div key={idx} className="border-b pb-5">
                  <h3 className="text-lg font-bold text-gray-500 mb-4">{date}</h3>
                  <div className="space-y-3">
                    {dayTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-4 rounded-xl border bg-gray-100 text-gray-700 flex justify-between items-center"
                      >
                        <div>
                          <h4 className="font-semibold">{task.title}</h4>
                          {task.subject && <p className="text-sm text-gray-600">Subject: {task.subject}</p>}
                          <p className="text-sm mt-1">
                            Status: {task.completed ? "✅ Done" : "❌ Not Completed"}
                          </p>
                        </div>

                        <button
                          onClick={() => handleDelete(task.id)}
                          className="bg-red-100 hover:bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm"
                        >
                           Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SchedulePage;
