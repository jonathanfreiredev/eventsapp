import { CategoryType } from '@/types/categories';
import { Event } from '@/types/events';

export const EventsMock: Event[] = [
    {
        id: "1",
        name: "Festival de Techno gratis",
        description: "Ven a disfrutar de la mejor música electrónica",
        address: {
            street: "Calle de la Princesa",
            city: "Madrid",
            zip: "28008",
            country: "España",
        },
        startDate: new Date(2025, 0, 10, 12),
        endDate: new Date(2025, 0, 10, 23),
        capacity: 1000,
        numParticipants: 234,
        image: require('@/assets/images/events/techno-festival.jpg'),
        category: CategoryType.Music,
        participating: true,
        organiserId: "1",
    },
    {
        id: "2",
        name: "Jazz en vivo",
        description: "Ven a disfrutar de la mejor música de jazz",
        address: {
            street: "Avenida de América",
            city: "Madrid",
            zip: "28002",
            country: "España",
        },
        startDate: new Date(2024, 10, 20, 20),
        endDate: new Date(2024, 10, 20, 23),
        capacity: 500,
        numParticipants: 152,
        image: require('@/assets/images/events/jazz.jpg'),
        category: CategoryType.Music,
        participating: false,
        organiserId: "2",
    },
    {
        id: "3",
        name: "Indie Rock",
        description: "Ven a disfrutar de la mejor música indie",
        address: {
            street: "Calle de Alcalá",
            city: "Madrid",
            zip: "28001",
            country: "España",
        },
        startDate: new Date(2024, 10, 3, 20),
        endDate: new Date(2024, 10, 3, 23),
        capacity: 300,
        numParticipants: 98,
        image: require('@/assets/images/events/indie-rock.jpg'),
        category: CategoryType.Music,
        participating: true,
        organiserId: "1",
    }
];