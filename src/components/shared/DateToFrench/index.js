import moment from 'moment';
import { days, months } from './dictionary';

export const DateFr = (date) => {
  const dates = new Date(date);
  return `${days[dates.getDay()].abbr} ${dates.getDate()} ${
    months[dates.getMonth()]
  } ${dates.getFullYear()}`;
};

export const getAge = (date) => {
  let age = moment().diff(moment(date, 'YYYYMMDD'), 'years');
  if (age > 0) {
    return `${age} ans`;
  } else {
    age = moment().diff(moment(date, 'YYYYMMDD'), 'months');
    if (age > 0) {
      return `${age} mois`;
    } else {
      age = moment().diff(moment(date, 'YYYYMMDD'), 'days');
      if (age > 0) {
        return `${age} jour(s)`;
      }
    }
  }
};

export const getDiff = (initialDate, finalDate) => {
  let age = moment(finalDate, 'YYYYMMDD').diff(
    moment(initialDate, 'YYYYMMDD'),
    'years',
  );
  if (age > 0) {
    return `${age} ans`;
  } else {
    age = moment(finalDate, 'YYYYMMDD').diff(
      moment(initialDate, 'YYYYMMDD'),
      'months',
    );
    if (age > 0) {
      return `${age} mois`;
    } else {
      age = moment(finalDate, 'YYYYMMDD').diff(
        moment(initialDate, 'YYYYMMDD'),
        'days',
      );
      if (age > 0) {
        return `${age} jour(s)`;
      }
    }
  }
};

export const DateFrHrWithTime = (date) => {
  const dates = new Date(date);
  return `${days[dates.getDay()].abbr} ${dates.getDate()} ${
    months[dates.getMonth()]
  } ${dates.getFullYear()} à ${getHours(dates)}:${getMinutes(dates)}`;
};

export const DateFrHr = (date) => {
  const dates = new Date(date);
  return `${days[dates.getDay()].abbr} ${dates.getDate()} ${
    months[dates.getMonth()]
  } ${dates.getFullYear()}`;
};

export const getHours = (date) => {
  let hour = date.getHours().toString();
  if (hour.length === 1) {
    return `0${hour}`;
  }
  return hour;
};

export const getMinutes = (date) => {
  let minute = date.getMinutes().toString();
  if (minute.length === 1) {
    return `0${minute}`;
  }
  return minute;
};
