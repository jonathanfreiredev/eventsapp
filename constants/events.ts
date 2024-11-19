import { CategoryType } from '@/types/categories';
import { Event } from '@/types/events';

export const EventsMock: Event[] = [
    {
        id: "1",
        name: "Festival de Techno gratis",
        description: "Ven a disfrutar de la mejor música electrónica",
        address: "Parque de Europa",
        startDate: new Date(2025, 0, 10),
        endDate: new Date(2025, 0, 10),
        capacity: 1000,
        image: require('@/assets/images/events/techno-festival.jpg'),
        category: CategoryType.Music,
    },
    {
        id: "2",
        name: "Jazz en vivo",
        description: "Ven a disfrutar de la mejor música de jazz",
        address: "Iglesias - Madrid",
        startDate: new Date(2024, 10, 20),
        endDate: new Date(2024, 10, 20),
        capacity: 500,
        image: require('@/assets/images/events/jazz.jpg'),
        category: CategoryType.Music,
    },
    {
        id: "3",
        name: "Indie Rock",
        description: "Ven a disfrutar de la mejor música indie",
        address: "La Latina - Madrid",
        startDate: new Date(2024, 10, 3),
        endDate: new Date(2024, 10, 3),
        capacity: 300,
        image: require('@/assets/images/events/indie-rock.jpg'),
        category: CategoryType.Music,
    }
];