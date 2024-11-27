import { apiClient } from "@/api/client";
import { CategoryType } from "@/types/categories";
import { useMutation } from "@tanstack/react-query";
import { Event } from "@/types/events";

export type CreateAddressInput = {
    street: string;
    city: string;
    zip: string;
    country: string;
}

export type CreateEventInput = {
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    capacity: number;
    category: CategoryType;
    address: CreateAddressInput;
}

export const useCreateEvent = () => {
    return useMutation<Event, Error, CreateEventInput>({
      mutationKey: ['createEvent'],
      mutationFn: async (event: CreateEventInput): Promise<Event> => {
        const { data } = await apiClient.post('/events', event);
        return data;
      },
    });
  };