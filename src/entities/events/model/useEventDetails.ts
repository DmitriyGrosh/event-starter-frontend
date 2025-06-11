import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { message } from 'antd';
import { eventService } from '@/shared/api/events/service';
import { Event } from '@/shared/api/events/types';
import {useAuth} from "@/entities/viewer";

export const useEventDetails = () => {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eventDetails, setEventDetails] = useState<Event | null>(null);
  const eventId = params?.id as string;

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        const data = await eventService.getEventById(eventId);
        setEventDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching event details');
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  const handleRegister = () => {
    if (!isAuthenticated) {
      message.info('Пожалуйста, войдите в систему для регистрации на мероприятие');
      router.push('/login');
      return;
    }

    setIsRegistered(true);
    message.success('Успешная регистрация на мероприятие!');
  };

  const handleUnregister = () => {
    setIsRegistered(false);
    message.success('Регистрация на мероприятие отменена');
  };

  return {
    eventDetails,
    isLoading,
    error,
    isRegistered,
    handleRegister,
    handleUnregister,
  };
}; 