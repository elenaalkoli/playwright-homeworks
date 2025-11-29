import numeral from 'numeral';

export function convertNumberToFormat(value: number, format: string): string {
  return numeral(value).format(format);
}
