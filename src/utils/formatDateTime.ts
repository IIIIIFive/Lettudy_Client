import moment from 'moment';
import 'moment/locale/ko';

export function formatDateTime(date: string, time: string): string {
  if (!date || !time) {
    return '출석 일정 없음';
  }

  const formattedDate = moment(date).format('MM월 DD일');
  const formattedTime = moment(time, 'HH:mm:ss').format('HH시');

  return `${formattedDate} ${formattedTime}`;
}
