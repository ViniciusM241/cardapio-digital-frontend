import moment from 'moment';

export default function getDateDiff(date) {
  const currentDate = moment();
  const olderDate = moment(date);

  const diff = currentDate.diff(olderDate, 'minutes');

  if (diff < 60) {
    return `há ${diff} minuto${diff > 1 ? 's' : ''}`;
  } else if (diff < 1440) {
    return `há ${Math.ceil(diff / 60)} horas`;
  } else {
    return olderDate.format('DD/MM/YYYY HH[h]mm');
  }
}
