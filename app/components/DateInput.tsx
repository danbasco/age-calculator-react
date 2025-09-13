import React from "react";

interface ErrorState {
  day?: string;
  month?: string;
  year?: string;
}

export interface Props {
  day: string;
  month: string;
  year: string;
  setDay: React.Dispatch<React.SetStateAction<string>>;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  errors: ErrorState;
}

const DateInput: React.FC<Props> = ({
  day,
  setDay,
  month,
  setMonth,
  year,
  setYear,
  errors,
}) => {
  const labelErrorClass = "text-red-500";
  const inputErrorClass = "border-red-500";

  return (
    <div className="flex gap-4">
      <div className="flex flex-col">
        <label
          htmlFor="day"
          className={`text-xs font-bold tracking-widest mb-2 ${
            errors.day ? labelErrorClass : "text-stone-500"
          }`}
        >
          DAY
        </label>
        <input
          id="day"
          value={day}
          placeholder="DD"
          onChange={(e) => setDay(e.target.value)}
          className={`p-3 border rounded-lg w-full sm:w-28 text-2xl font-bold focus:outline-none focus:border-violet-600 ${
            errors.day ? inputErrorClass : "border-stone-300"
          }`}
        />
        {errors.day && (
          <p className="text-red-500 italic text-xs mt-1">{errors.day}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="month"
          className={`text-xs font-bold tracking-widest mb-2 ${
            errors.month ? labelErrorClass : "text-stone-500"
          }`}
        >
          MONTH
        </label>
        <input
          id="month"
          value={month}
          placeholder="MM"
          onChange={(e) => setMonth(e.target.value)}
          className={`p-3 border rounded-lg w-full sm:w-28 text-2xl font-bold focus:outline-none focus:border-violet-600 ${
            errors.month ? inputErrorClass : "border-stone-300"
          }`}
        />
        {errors.month && (
          <p className="text-red-500 italic text-xs mt-1">{errors.month}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="year"
          className={`text-xs font-bold tracking-widest mb-2 ${
            errors.year ? labelErrorClass : "text-stone-500"
          }`}
        >
          YEAR
        </label>
        <input
          id="year"
          value={year}
          placeholder="YYYY"
          onChange={(e) => setYear(e.target.value)}
          className={`p-3 border rounded-lg w-full sm:w-28 text-2xl font-bold focus:outline-none focus:border-violet-600 ${
            errors.year ? inputErrorClass : "border-stone-300"
          }`}
        />
        {errors.year && (
          <p className="text-red-500 italic text-xs mt-1">{errors.year}</p>
        )}
      </div>
    </div>
  );
};

export default DateInput;
