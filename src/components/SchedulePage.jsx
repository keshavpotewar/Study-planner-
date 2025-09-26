import React from "react";
function SchedulePage({ tasks, dailyHours }) {
  const subjects = [...new Set(tasks.map((t) => t.subject).filter(Boolean))];
  const timePerSubject =
    subjects.length > 0 ? (dailyHours / subjects.length).toFixed(1) : 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">📅 Study Schedule</h2>
      <p className="mb-4 text-gray-600">Total Study Time: <b>{dailyHours} hrs/day</b></p>

      {subjects.length === 0 ? (
        <p className="text-gray-500">No subjects found. Add tasks first.</p>
      ) : (
        <div className="space-y-5">
          {subjects.map((subject, idx) => {
            const subjectTasks = tasks.filter((t) => t.subject === subject);
            const completedCount = subjectTasks.filter((t) => t.completed).length;
            const totalCount = subjectTasks.length;
            const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

            return (
              <div key={idx} className="p-5 rounded-xl border bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">{subject}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      progress === 100
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {progress === 100 ? "✅ Completed" : "⏳ In Progress"}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  {completedCount}/{totalCount} tasks • {timePerSubject} hrs allocated
                </p>

                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      progress === 100 ? "bg-green-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SchedulePage;
