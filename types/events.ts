import { CategoryType } from "./categories";

export type Event = {
    id: string;
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    capacity: number;
    category: CategoryType;
    address: String;
    image: any;
}