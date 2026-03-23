import { useState } from "react";
import { useEffect } from "react";

import checkIcon from "../assets/icons/check.svg";
import leftArrow from "../assets/icons/left-arrow.svg";
import rightArrow from "../assets/icons/right-arrow.svg";
import leftArrowClicked from "../assets/icons/left-arrow-clicked.svg";
import rightArrowClicked from "../assets/icons/right-arrow-clicked.svg";

import { apiFetch } from "../utils/api";

const MARCH_2026 = { month: 2, year: 2026 };
// I have set a fixed start month because this is the month I started tracking.

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}
// This creates a date for the 0th day of the next month, which effectively gives us the last day of the current month, thus telling us how many days are in that month.

function getFirstDayOfMonth(month, year) {
  return new Date(year, month, 1).getDay();
}
// This gives us the day of the week for the first day of the month. We need this to know how many empty cells to render at the start of the calendar grid.

export default function Calendar({ title, type }) {
  const [current, setCurrent] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [checkedDays, setCheckedDays] = useState({});
  const [pressLeft, setPressLeft] = useState(false);
  const [pressRight, setPressRight] = useState(false);

  useEffect(() => {
    async function fetchHabits() {
      const response = await apiFetch(
        `/api/habits?month=${current.month}&year=${current.year}&type=${type}`,
      );
      if (!response) return;
      const habits = await response.json();
      const checked = {};
      habits.forEach((habit) => {
        const key = `${habit.year}-${habit.month}-${habit.day}`;
        checked[key] = true;
      });
      setCheckedDays(checked);
    }

    fetchHabits();
  }, [current.month, current.year]);

  const daysInMonth = getDaysInMonth(current.month, current.year);
  const firstDay = getFirstDayOfMonth(current.month, current.year);

  const achieved = Object.keys(checkedDays).filter(
    (key) =>
      checkedDays[key] && key.startsWith(`${current.year}-${current.month}-`),
  ).length;
  // This gives us an array of keys that are checked and belong to the current month, and we take its length to get the count of achieved days.

  async function toggleDay(day) {
    const key = `${current.year}-${current.month}-${day}`;

    const response = await apiFetch("/api/habits/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        day,
        month: current.month,
        year: current.year,
      }),
    });
    if (!response) return;
    if (response.ok) {
      setCheckedDays((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  }
  // The spread operator copies the existing state, and then we overwrite the specific day key with its toggled value.

  function prevMonth() {
    if (current.year === MARCH_2026.year && current.month === MARCH_2026.month)
      return;
    setCurrent((prev) => {
      if (prev.month === 0) return { month: 11, year: prev.year - 1 };
      return { month: prev.month - 1, year: prev.year };
    });
  }
  // Logic of previous month. With one edge case: if we're at the start month, we don't allow going back further. If we're at January, we roll back to December of the previous year.

  function nextMonth() {
    setCurrent((prev) => {
      if (prev.month === 11) return { month: 0, year: prev.year + 1 };
      return { month: prev.month + 1, year: prev.year };
    });
  }
  // Logic of next month. With one edge case: if we're at December, we roll over to January of the next year.

  const isStart =
    current.month === MARCH_2026.month && current.year === MARCH_2026.year;
  // This is used to disable the previous month button when we're at the start month.

  // Build grid cells: empty cells for offset + day cells
  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 w-full">
      {/* Header */}
      <h2 className="text-xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        {title}
      </h2>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          disabled={isStart}
          className="disabled:opacity-30 disabled:cursor-not-allowed transition"
          onMouseDown={() => setPressLeft(true)}
          onMouseUp={() => setTimeout(() => setPressLeft(false), 100)}
          onTouchEnd={() => setTimeout(() => setPressLeft(false), 100)}
          onTouchStart={() => setPressLeft(true)}
        >
          {pressLeft ? (
            <img src={leftArrowClicked} className="w-17" />
          ) : (
            <img src={leftArrow} className="w-17" />
          )}
        </button>
        <span className="text-gray-900 dark:text-white font-semibold">
          {MONTH_NAMES[current.month]} {current.year}
        </span>
        <button
          onClick={nextMonth}
          onMouseDown={() => setPressRight(true)}
          onMouseUp={() => setTimeout(() => setPressRight(false), 100)}
          onTouchEnd={() => setTimeout(() => setPressRight(false), 100)}
          onTouchStart={() => setPressRight(true)}
        >
          {pressRight ? (
            <img src={rightArrowClicked} className="w-17" />
          ) : (
            <img src={rightArrow} className="w-17" />
          )}
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="text-center text-xs text-gray-500 dark:text-gray-400 font-medium py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} />;
          }
          const key = `${current.year}-${current.month}-${day}`;
          const checked = !!checkedDays[key];
          return (
            <button
              key={key}
              onClick={() => toggleDay(day)}
              className={`
                aspect-square rounded-lg text-sm font-medium transition
                flex items-center justify-center
                ${
                  checked
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }
              `}
            >
              {checked ? <img src={checkIcon} className="w-5" /> : day}
            </button>
          );
        })}
      </div>

      {/* Stats */}
      <div className="flex justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
        <span>
          Goal:{" "}
          <span className="text-gray-900 dark:text-white font-semibold">
            {daysInMonth} days
          </span>
        </span>
        <span>
          Achieved:{" "}
          <span className="text-green-600 dark:text-green-400 font-semibold">
            {achieved} days
          </span>
        </span>
      </div>
    </div>
  );
}
