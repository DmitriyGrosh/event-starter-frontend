import { Dayjs } from 'dayjs';

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Dayjs;
  price: number;
  imageUrl: string;
} 