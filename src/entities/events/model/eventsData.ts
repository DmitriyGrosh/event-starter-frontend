import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export interface Event {
    id: string;
    title: string;
    location: string;
    price: number;
    imageUrl: string;
    description: string;
    date?: Dayjs;
    tags?: string[];
}

export const events: Event[] = [
    {
        id: "1",
        title: "Tech Summit 2024",
        location: "Москва",
        price: 15000,
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
        description: "Крупнейшая технологическая конференция года. Встреча с ведущими экспертами индустрии, обсуждение последних трендов в AI, облачных технологиях и кибербезопасности.",
        date: dayjs('2025-06-15'),
        tags: ['tech', 'business']
    },
    {
        id: "2",
        title: "Startup Weekend",
        location: "Санкт-Петербург",
        price: 5000,
        imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop",
        description: "54 часа на создание стартапа с нуля. Объединитесь с единомышленниками, разработайте MVP и представьте его инвесторам.",
        date: dayjs('2025-07-20'),
        tags: ['business', 'tech']
    },
    {
        id: "3",
        title: "Design Conference",
        location: "Казань",
        price: 8000,
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
        description: "Конференция для дизайнеров всех направлений. Мастер-классы по UI/UX, типографике, брендингу и дизайн-мышлению.",
        date: dayjs('2025-08-10'),
        tags: ['art', 'design']
    },
    {
        id: "4",
        title: "AI Workshop",
        location: "Новосибирск",
        price: 12000,
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
        description: "Практический воркшоп по искусственному интеллекту. Изучите основы машинного обучения и создайте свой первый AI-проект.",
        date: dayjs('2025-09-05'),
        tags: ['tech', 'ai']
    },
    {
        id: "5",
        title: "Blockchain Meetup",
        location: "Екатеринбург",
        price: 0,
        imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=600&auto=format&fit=crop",
        description: "Ежемесячная встреча блокчейн-энтузиастов. Обсуждение последних трендов в DeFi, NFT и Web3 технологиях.",
        date: dayjs('2025-10-15'),
        tags: ['tech', 'blockchain']
    },
    {
        id: "6",
        title: "Digital Marketing Forum",
        location: "Сочи",
        price: 20000,
        imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=600&auto=format&fit=crop",
        description: "Форум для маркетологов и владельцев бизнеса. Стратегии продвижения, SMM, контент-маркетинг и аналитика.",
        date: dayjs('2025-11-20'),
        tags: ['business', 'marketing']
    },
    // Today's events
    {
        id: "7",
        title: "Web Development Workshop",
        location: "Москва",
        price: 7500,
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
        description: "Практический воркшоп по современной веб-разработке. React, TypeScript и лучшие практики.",
        date: dayjs(),
        tags: ['tech', 'web']
    },
    {
        id: "8",
        title: "Business Networking",
        location: "Санкт-Петербург",
        price: 3000,
        imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=600&auto=format&fit=crop",
        description: "Вечер нетворкинга для предпринимателей и бизнес-профессионалов.",
        date: dayjs(),
        tags: ['business', 'networking']
    },
    {
        id: "9",
        title: "Art Exhibition Opening",
        location: "Казань",
        price: 1500,
        imageUrl: "https://images.unsplash.com/photo-1536924940846-227afc31b2f7?q=80&w=600&auto=format&fit=crop",
        description: "Открытие выставки современного искусства с участием молодых художников.",
        date: dayjs(),
        tags: ['art', 'exhibition']
    },
    // Tomorrow's events
    {
        id: "10",
        title: "Mobile App Development",
        location: "Москва",
        price: 10000,
        imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=600&auto=format&fit=crop",
        description: "Мастер-класс по разработке мобильных приложений на React Native.",
        date: dayjs().add(1, 'day'),
        tags: ['tech', 'mobile']
    },
    {
        id: "11",
        title: "Startup Pitch Night",
        location: "Санкт-Петербург",
        price: 5000,
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop",
        description: "Вечер презентаций стартапов перед инвесторами и экспертами индустрии.",
        date: dayjs().add(1, 'day'),
        tags: ['business', 'startup']
    },
    {
        id: "12",
        title: "Fitness Festival",
        location: "Сочи",
        price: 2500,
        imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop",
        description: "Фестиваль фитнеса с мастер-классами от ведущих тренеров и соревнованиями.",
        date: dayjs().add(1, 'day'),
        tags: ['sport', 'fitness']
    },
	{
		id: "13",
		title: "Защита Event-starter",
		location: "Ростов-на-Дону",
		price: 2500,
		imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop",
		description: "Фестиваль фитнеса с мастер-классами от ведущих тренеров и соревнованиями.",
		date: dayjs().add(1, 'day'),
		tags: ['startup']
	}
]; 