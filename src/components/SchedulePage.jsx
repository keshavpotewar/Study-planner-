import React from "react";

function SchedulePage({ tasks, dailyHours }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">📅 Study Schedule</h2>
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

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800"> Date-wise Study Schedule</h2>

      <div className="space-y-8">
        {Object.keys(groupedByDate)
          .sort()
          .map((date, idx) => {
            const dayTasks = groupedByDate[date];
            const hoursPerTask =
              dailyHours && dailyHours > 0
                ? (dailyHours / dayTasks.length).toFixed(1)
                : null;

            return (
              <div key={idx} className="border-b pb-5">
                <h3 className="text-lg font-bold text-blue-600 mb-4">
                  {date === "No Deadline" ? "📌 No Deadline" : ` ${date}`}
                </h3>

                <div className="space-y-3">
                  {dayTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-xl border bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-700">
                          {task.title}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            task.completed
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {task.completed ? "✅ Done" : "⏳ Pending"}
                        </span>
                      </div>
                      {task.subject && (
                        <p className="text-sm text-gray-600 mb-1">
                          Subject: {task.subject}
                        </p>
                      )}
                      {hoursPerTask && (
                        <p className="text-sm text-gray-500">
                          ⏰ Allocated: {hoursPerTask} hrs
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SchedulePage;
