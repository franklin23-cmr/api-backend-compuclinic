export const FormatDateTime = (
  days,
  months,
  years,
  hours,
  minutes,
  seconds,
) => {
  let month = '' + (months + 1);
  let day = '' + days;
  let year = '' + years;
  let hours_ = '' + hours;
  let minutes_ = '' + minutes;
  let seconds_ = '' + seconds;

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (hours_.length < 2) hours_ = '0' + hours_;
  if (minutes_.length < 2) minutes_ = '0' + minutes_;
  if (seconds_.length < 2) seconds_ = '0' + seconds_;

  return `${year}-${month}-${day}-${hours_}-${minutes_}-${seconds_}`;
};

export const FormatDate = (days, months, years) => {
  let month = '' + (months + 1);
  let day = '' + days;
  let year = years;

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${year}-${month}-${day}`;
};
