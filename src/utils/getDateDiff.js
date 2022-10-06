import moment from 'moment';

export default function getDateDiff(date) {
  const currentDate = moment();
  const olderDate = moment(date);

  const diff = currentDate.diff(olderDate, 'minutes');

  if (diff < 60) {
    return `há ${diff} minutos`;
  } else if (diff < 1440) {
    return `há ${diff / 24} horas`;
  } else {
    return olderDate.format('DD/MM/YYYY HH[h]mm');
  }
}
