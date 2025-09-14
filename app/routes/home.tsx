import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import getAge from "~/lib/model";
import DateInput from "~/components/DateInput";
import SubmitButton from "~/components/SubmitButton";
import DateText from "~/components/DateText";

const schema = z
  .object({
    day: z
      .string()
      .trim()
      .nonempty("This field is required")
      .regex(/^\d+$/, "Must be a valid day")
      .refine((v) => {
        const n = Number(v);
        return n >= 1 && n <= 31;
      }, "Must be a valid day"),
    month: z
      .string()
      .trim()
      .nonempty("This field is required")
      .regex(/^\d+$/, "Must be a valid month")
      .refine((v) => {
        const n = Number(v);
        return n >= 1 && n <= 12;
      }, "Must be a valid month"),
    year: z
      .string()
      .trim()
      .nonempty("This field is required")
      .regex(/^\d+$/, "Must be a valid year")
      .refine((v) => {
        const n = Number(v);
        return n <= new Date().getFullYear();
      }, "Must be in the past"),
  })
  .refine(
    (data) => {
      const day = Number(data.day);
      const month = Number(data.month);
      const year = Number(data.year);
      if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year))
        return false;
      const date = new Date(year, month - 1, day);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    },
    { message: "Must be a valid date", path: ["day"] }
  );

type FormFields = z.infer<typeof schema>;

const Home: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: { day: "", month: "", year: "" },
  });

  const [daysOld, setDaysOld] = useState("--");
  const [monthsOld, setMonthsOld] = useState("--");
  const [yearsOld, setYearsOld] = useState("--");

  const onSubmit = (data: FormFields) => {
    const age = getAge({
      day: Number(data.day),
      month: Number(data.month),
      year: Number(data.year),
    });
    setDaysOld(String(age.day));
    setMonthsOld(String(age.month));
    setYearsOld(String(age.year));
  };

  const onError = () => {
    setDaysOld("--");
    setMonthsOld("--");
    setYearsOld("--");
  };

  return (
    <main className="bg-stone-200 min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="bg-white p-8 sm:p-12 rounded-3xl rounded-br-[100px] sm:rounded-br-[150px] max-w-2xl w-full"
      >
        <div className="flex flex-col">
          <DateInput register={register} errors={errors} />
          <SubmitButton />
        </div>
        <DateText daysOld={daysOld} yearsOld={yearsOld} monthsOld={monthsOld} />
      </form>
    </main>
  );
};

export default Home;
