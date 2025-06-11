import { Event } from './types';

export const formatEventPrice = (price: number): string => {
  return price === 0 ? 'Бесплатно' : `${price.toLocaleString('ru-RU')}₽`;
};

export const getEventStatus = (event: Event): 'upcoming' | 'ongoing' | 'past' => {
  const now = new Date();
  const eventDate = event.date.toDate();
  
  if (eventDate < now) {
    return 'past';
  }
  
  if (eventDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000) {
    return 'ongoing';
  }
  
  return 'upcoming';
}; 