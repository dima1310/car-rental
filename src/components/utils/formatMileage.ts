export const formatMileage = (value: number): string => {
  // uk-UA ставить пробіл як роздільник тисяч
  return `${new Intl.NumberFormat("uk-UA").format(value)} km`;
};
