import moment from 'moment';

export interface Event {
    id: string;
    title: string;
    location: string;
    price: number;
    imageUrl: string;
    description: string;
    date?: moment.Moment;
}

export const events: Event[] = [
    {
        id: "1",
        title: "Tech Summit 2024",
        location: "Москва",
        price: 15000,
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
        description: "Крупнейшая технологическая конференция года. Встреча с ведущими экспертами индустрии, обсуждение последних трендов в AI, облачных технологиях и кибербезопасности.",
        date: moment('2025-06-15')
    },
    {
        id: "2",
        title: "Startup Weekend",
        location: "Санкт-Петербург",
        price: 5000,
        imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop",
        description: "54 часа на создание стартапа с нуля. Объединитесь с единомышленниками, разработайте MVP и представьте его инвесторам.",
        date: moment('2025-07-20')
    },
    {
        id: "3",
        title: "Design Conference",
        location: "Казань",
        price: 8000,
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
        description: "Конференция для дизайнеров всех направлений. Мастер-классы по UI/UX, типографике, брендингу и дизайн-мышлению.",
        date: moment('2025-08-10')
    },
    {
        id: "4",
        title: "AI Workshop",
        location: "Новосибирск",
        price: 12000,
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
        description: "Практический воркшоп по искусственному интеллекту. Изучите основы машинного обучения и создайте свой первый AI-проект.",
        date: moment('2025-09-05')
    },
    {
        id: "5",
        title: "Blockchain Meetup",
        location: "Екатеринбург",
        price: 0,
        imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=600&auto=format&fit=crop",
        description: "Ежемесячная встреча блокчейн-энтузиастов. Обсуждение последних трендов в DeFi, NFT и Web3 технологиях.",
        date: moment('2025-10-15')
    },
    {
        id: "6",
        title: "Digital Marketing Forum",
        location: "Сочи",
        price: 20000,
        imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=600&auto=format&fit=crop",
        description: "Форум для маркетологов и владельцев бизнеса. Стратегии продвижения, SMM, контент-маркетинг и аналитика.",
        date: moment('2025-11-20')
    }
]; 