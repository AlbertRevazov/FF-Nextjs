export const DateFormate = (props: string) => {
  // Создание объекта Date из строки UTC
  const date = new Date(props);

  // Форматирование даты и времени в читаемый формат с учетом временной зоны Москвы
  const formattedDateTime = date.toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return formattedDateTime;
};
