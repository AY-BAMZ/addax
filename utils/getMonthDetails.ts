import getDaysInMonth from "./getDaysInMonth";

export const getMonthDetails = (currentMonth: number) => {
  const currentYear = new Date().getFullYear();
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  const daysInCurrentMonth = getDaysInMonth(currentMonth, currentYear);
  const daysInPrevMonth = getDaysInMonth(prevMonth, prevMonthYear);
  const daysInNextMonth = getDaysInMonth(nextMonth, nextMonthYear);

  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const prevMonthOverlap = daysInPrevMonth.slice(-firstDayOfWeek + 1) || [];

  const totalDays = daysInCurrentMonth.length + prevMonthOverlap.length;
  const nextMonthOverlap = daysInNextMonth.slice(0, 7 - (totalDays % 7)) || [];

  const monthNames = [
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

  const currentMonthName = `${monthNames[currentMonth]} ${currentYear}`;
  const prevMonthName = `${monthNames[prevMonth]}`;
  const nextMonthName = `${monthNames[nextMonth]}`;

  return {
    prevMonthOverlap,
    nextMonthOverlap,
    currentMonthName,
    prevMonthName,
    nextMonthName,
  };
};
