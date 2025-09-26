import React, { useState } from "react";

function StudyHoursForm({ setDailyHours }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    setDailyHours(Number(input));
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white mt-3 p-6 rounded-2xl shadow-md mb-6 flex flex-col gap-3"
    >
      <h2 className="text-lg font-semibold text-gray-700">🕒 Set Daily Study Hours</h2>
      <input
        type="number"
        placeholder="Enter hours (e.g. 4)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        min="1"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
      >
        Save Hours
      </button>
    </form>
  );
}

export default StudyHoursForm;
