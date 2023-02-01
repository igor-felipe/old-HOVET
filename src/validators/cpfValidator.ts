export default function cpfValidator(cpf: string) {
  function calculateDigit(substring: string) {
    let amount = 0;
    for (let i = 0; i < substring.length; i += 1) {
      amount += Number(substring[i]) * (substring.length + 1 - i);
    }
    const remainder = amount % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }
  // regex: only 11 digits, not all the same
  if (/^(\d)(?!\1+$)\d{10}$/.test(cpf) === false) return false;

  const tenth = calculateDigit(cpf.substring(0, 9));
  if (tenth !== Number(cpf[9])) return false;

  const eleventh = calculateDigit(cpf.substring(0, 9) + tenth);
  if (eleventh !== Number(cpf[10])) return false;

  return true;
}
