import { CategoryType } from "./categories";

export type Address = {
    street: string;
    city: string;
    zip: string;
    country: string;
}

export type Event = {
    id: string;
    name: string;
    description?: string | null;
    image?: string | null;
    startDate: Date;
    endDate: Date;
    capacity: number;
    category: CategoryType;
    organiserId: string;
    address: Address;
    numParticipants: number;
    participating: boolean;
}
