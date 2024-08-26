import moment from 'moment';
moment.locale('ko');

export const formatChatDate = (dateString: string) => {
  const date = moment(dateString);
  const formattedDate = date.format('M월 D일');
  const formattedTime = date.format('h:mm A');

  return `${formattedDate} ${formattedTime}`;
};
