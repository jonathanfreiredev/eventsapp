import { apiClient } from "@/api/client";
import { Event } from "@/types/events";
import { useQuery } from "@tanstack/react-query";


export const useGetEvent = (eventId: string) => {
    return useQuery<Event>(
        {
            queryKey: ['getEvent', eventId],
            queryFn: async () => {
                const { data } = await apiClient.get(`/events/${eventId}`);
                return data;
            },
        },
    );
};

export const useGetEvents = () => {
    return useQuery<Event[]>(
        {
            queryKey: ['getEvents'],
            queryFn: async () => {
                const { data } = await apiClient.get('/events');
                return data;
            },
        },
    );
}