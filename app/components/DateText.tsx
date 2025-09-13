import type { DateForm } from "~/lib/model";

export interface Props {
  daysOld: string;
  monthsOld: string;
  yearsOld: string;
}

const DateText: React.FC<Props> = ({ daysOld, monthsOld, yearsOld }: Props) => {
  return (
    <div className="mt-16 sm:mt-8">
      <h1 className="text-5xl sm:text-6xl font-extrabold italic">
        <span className="text-violet-600">{yearsOld}</span> years
      </h1>
      <h1 className="text-5xl sm:text-6xl font-extrabold italic">
        <span className="text-violet-600">{monthsOld}</span> months
      </h1>
      <h1 className="text-5xl sm:text-6xl font-extrabold italic">
        <span className="text-violet-600">{daysOld}</span> days
      </h1>
    </div>
  );
};

export default DateText;
