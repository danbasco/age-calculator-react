export interface DateForm {
  day: number;
  month: number;
  year: number;
}

const getAge = ({ day, month, year }: DateForm): DateForm => {
  const today = new Date();
  // O mês no construtor de Date é 0-indexed, então subtraímos 1
  const birthDate = new Date(year, month - 1, day);

  let calculatedYear = today.getFullYear() - birthDate.getFullYear();
  let calculatedMonth = today.getMonth() - birthDate.getMonth();
  let calculatedDay = today.getDate() - birthDate.getDate();

  // Se o mês do aniversário ainda não chegou este ano, ou se é o mês do aniversário
  // mas o dia ainda não chegou, então a pessoa ainda não completou o aniversário deste ano.
  if (calculatedMonth < 0 || (calculatedMonth === 0 && calculatedDay < 0)) {
    calculatedYear--;
    // Se o mês for negativo, adicionamos 12 para "emprestar" do ano.
    calculatedMonth += 12;
  }

  // Se o dia for negativo, significa que precisamos "emprestar" dias do mês anterior.
  if (calculatedDay < 0) {
    // Para obter os dias do mês anterior ao atual, setamos o dia para 0 no construtor da data.
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    calculatedDay += lastMonth.getDate();

    // Como emprestamos um mês, decrementamos o contador de meses.
    // Se o mês ficar negativo, ajustamos o ano e o mês novamente.
    calculatedMonth--;
    if (calculatedMonth < 0) {
      calculatedMonth = 11;
      calculatedYear--;
    }
  }

  return { day: calculatedDay, month: calculatedMonth, year: calculatedYear };
};

export default getAge;
