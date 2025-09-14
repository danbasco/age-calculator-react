import type { UseFormRegister, FieldErrors } from "react-hook-form";

type FormFields = {
  day: string;
  month: string;
  year: string;
};

interface Props {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
}

const DateInput: React.FC<Props> = ({ register, errors }) => {
  const labelErr = "text-red-500";
  const inputErr = "border-red-500";
  const base =
    "p-3 border rounded-lg w-full sm:w-28 text-2xl font-bold focus:outline-none focus:border-violet-600";

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* DAY */}
      <div className="flex flex-col">
        <label
          htmlFor="day"
          className={`text-xs font-bold tracking-widest mb-2 ${
            errors.day ? labelErr : "text-stone-500"
          }`}
        >
          DAY
        </label>
        <input
          id="day"
          placeholder="DD"
          inputMode="numeric"
          {...register("day")}
          className={`${base} ${errors.day ? inputErr : "border-stone-300"}`}
        />
        {errors.day && (
          <p className="text-red-500 italic text-xs mt-1">
            {errors.day.message as string}
          </p>
        )}
      </div>

      {/* MONTH */}
      <div className="flex flex-col">
        <label
          htmlFor="month"
          className={`text-xs font-bold tracking-widest mb-2 ${
            errors.month ? labelErr : "text-stone-500"
          }`}
        >
          MONTH
        </label>
        <input
          id="month"
          placeholder="MM"
          inputMode="numeric"
          {...register("month")}
          className={`${base} ${errors.month ? inputErr : "border-stone-300"}`}
        />
        {errors.month && (
          <p className="text-red-500 italic text-xs mt-1">
            {errors.month.message as string}
          </p>
        )}
      </div>

      {/* YEAR */}
      <div className="flex flex-col">
        <label
          htmlFor="year"
          className={`text-xs font-bold tracking-widest mb-2 ${
            errors.year ? labelErr : "text-stone-500"
          }`}
        >
          YEAR
        </label>
        <input
          id="year"
          placeholder="YYYY"
          inputMode="numeric"
          {...register("year")}
          className={`${base} ${errors.year ? inputErr : "border-stone-300"}`}
        />
        {errors.year && (
          <p className="text-red-500 italic text-xs mt-1">
            {errors.year.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default DateInput;
