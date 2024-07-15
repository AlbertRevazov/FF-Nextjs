import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { getMatchesListByDate } from '@/redux/Slices/Games';
import { getCompetitionByYear } from '@/redux/Slices/Competitions';

interface IUseDateFilterHookReturn {
  days: {
    date: string;
    formattedDate: string;
  }[];
  years: string[];
  selected: string;
  handleDays: React.MouseEventHandler<HTMLDivElement>;
  handleYear: (id: string) => React.MouseEventHandler<HTMLDivElement>;
}

export const useDateFilterHook = (): IUseDateFilterHookReturn => {
  const [selected, setSelected] = useState<string>('');
  const dispatch = useAppDispatch();

  const getDateBlocks = () => {
    const daysRange = 3;
    const dateBlocks: {
      date: string;
      formattedDate: string;
    }[] = [];

    for (let i = -daysRange; i <= daysRange; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const formattedDate = date.toLocaleDateString('ru-RU', {
        month: 'long',
        day: 'numeric',
      });
      dateBlocks.push({ date: date.toISOString().split('T')[0], formattedDate });
    }

    return dateBlocks;
  };

  const getYearBlocks = () => {
    const yearsRange = 5;
    const yearBlocks: string[] = [];

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    for (let i = 0; i < yearsRange; i++) {
      const year = currentYear - i;
      const formattedYear = year.toString();
      yearBlocks.push(formattedYear);
    }

    return yearBlocks;
  };
  
  const years = getYearBlocks();
  const days = getDateBlocks();

  const handleDays: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const currentTarget = e.currentTarget as HTMLElement;
    const date = currentTarget.getAttribute('data-date') as string;
    setSelected(date);
    dispatch(getMatchesListByDate(date));
  };

  const handleYear =
    (id: string): React.MouseEventHandler<HTMLDivElement> =>
    (e) => {
      e.preventDefault();
      const currentTarget = e.currentTarget as HTMLElement;
      const date = currentTarget.getAttribute('data-date') as string;
      setSelected(date);
      dispatch(getCompetitionByYear({ id, date }));
    };

  return { days, years, selected, handleDays, handleYear };
};