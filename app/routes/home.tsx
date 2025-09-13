import type { DateForm } from "~/lib/model";
import type { Route } from "./+types/home";
import React, { useState } from "react";
import getAge from "~/lib/model";
import DateInput from "~/components/DateInput";
import SubmitButton from "~/components/SubmitButton";
import DateText from "~/components/DateText";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Age Calculator App" },
    { name: "description", content: "Calculate your age with React!" },
  ];
}

interface ErrorState {
  day?: string;
  month?: string;
  year?: string;
}

const Home: React.FC = () => {
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const [daysOld, setDaysOld] = useState<string>("--");
  const [monthsOld, setMonthsOld] = useState<string>("--");
  const [yearsOld, setYearsOld] = useState<string>("--");

  const [errors, setErrors] = useState<ErrorState>({});

  const onCalculate = () => {
    const newErrors: ErrorState = {};
    const today = new Date();

    // --- Validation Logic ---

    // 1. Check for empty fields first
    if (!day) newErrors.day = "This field is required";
    if (!month) newErrors.month = "This field is required";
    if (!year) newErrors.year = "This field is required";

    const inputDay = Number(day);
    const inputMonth = Number(month);
    const inputYear = Number(year);

    // 2. Check for non-numeric strings (results in NaN)
    if (day && isNaN(inputDay)) newErrors.day = "Must be a valid day";
    if (month && isNaN(inputMonth)) newErrors.month = "Must be a valid month";
    if (year && isNaN(inputYear)) newErrors.year = "Must be a valid year";

    // 3. Proceed with range validation only if fields are not empty and are numbers
    if (!newErrors.day && (inputDay < 1 || inputDay > 31)) {
      newErrors.day = "Must be a valid day";
    }
    if (!newErrors.month && (inputMonth < 1 || inputMonth > 12)) {
      newErrors.month = "Must be a valid month";
    }
    if (!newErrors.year && inputYear > today.getFullYear()) {
      newErrors.year = "Must be in the past";
    }

    // 4. Final date validation (for invalid dates like Feb 30)
    // This runs only if there are no prior errors
    if (Object.keys(newErrors).length === 0) {
      const date = new Date(inputYear, inputMonth - 1, inputDay);
      if (date.getMonth() !== inputMonth - 1 || date.getDate() !== inputDay) {
        newErrors.day = "Must be a valid date";
        newErrors.month = " "; // Add error to trigger red style
        newErrors.year = " "; // Add error to trigger red style
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const inputDate: DateForm = {
        day: inputDay,
        month: inputMonth,
        year: inputYear,
      };
      const age = getAge(inputDate);
      setDaysOld(String(age.day));
      setMonthsOld(String(age.month));
      setYearsOld(String(age.year));
    } else {
      setDaysOld("--");
      setMonthsOld("--");
      setYearsOld("--");
    }
  };

  return (
    <main className="bg-stone-200 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 sm:p-12 rounded-3xl rounded-br-[100px] sm:rounded-br-[150px] max-w-2xl w-full">
        <DateInput
          day={day}
          month={month}
          year={year}
          setDay={setDay}
          setMonth={setMonth}
          setYear={setYear}
          errors={errors}
        />
        <SubmitButton onCalculate={onCalculate} />
        <DateText daysOld={daysOld} yearsOld={yearsOld} monthsOld={monthsOld} />
      </div>
    </main>
  );
};

export default Home;
