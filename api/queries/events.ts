import { apiClient } from "@/api/client";
import { useSession } from "@/components/common/AuthContext";
import { Event } from "@/types/events";
import { User } from "@/types/users";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../lib/getAccessToken";

export const useGetEvent = (eventId: string) => {
    const { session } = useSession();

    return useQuery<Event>(
        {
            queryKey: ['getEvent', eventId],
            queryFn: async () => {
                if (!session) {
                    throw new Error("You must be logged in to view events");
                }

                const accessToken = getAccessToken(session);

                const { data } = await apiClient.get(`/events/${eventId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                return {
                    ...data,
                    startDate: new Date(data.startDate),
                    endDate: new Date(data.endDate),
                };
            },
        },
    );
};

export const useGetEvents = (category: string) => {
    const { session } = useSession();

    return useQuery<Event[]>(
        {
            queryKey: ['getEvents', category],
            queryFn: async () => {
                if (!session) {
                    throw new Error("You must be logged in to view events");
                }

                const accessToken = getAccessToken(session);

                const { data } = await apiClient.get(`/events?category=${category}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                return data.map((event: Event) => ({
                    ...event,
                    startDate: new Date(event.startDate),
                    endDate: new Date(event.endDate),
                }));
            },
        },
    );
}

export const useGetMyEvents = () => {
    const { session } = useSession();

    return useQuery<Event[]>(
        {
            queryKey: ['getMyEvents'],
            queryFn: async () => {
                if (!session) {
                    throw new Error("You must be logged in to view events");
                }

                const accessToken = getAccessToken(session);

                const { data } = await apiClient.get(`/events/my-events`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                return data.map((event: Event) => ({
                    ...event,
                    startDate: new Date(event.startDate),
                    endDate: new Date(event.endDate),
                }));
            },
        },
    );
}

export const useGetEventsParticipating = () => {
    const { session } = useSession();

    return useQuery<Event[]>(
        {
            queryKey: ['getEventsParticipating'],
            queryFn: async () => {
                if (!session) {
                    throw new Error("You must be logged in to view events");
                }

                const accessToken = getAccessToken(session);

                const { data } = await apiClient.get(`/events/participating`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                return data.map((event: Event) => ({
                    ...event,
                    startDate: new Date(event.startDate),
                    endDate: new Date(event.endDate),
                }));
            },
        },
    );
}

export const useGetEventParticipants = (eventId: string) => {
    const { session } = useSession();

    return useQuery<User[]>(
        {
            queryKey: ['getEventParticipants', eventId],
            queryFn: async () => {
                if (!session) {
                    throw new Error("You must be logged in to view events");
                }

                const accessToken = getAccessToken(session);

                const { data } = await apiClient.get(`/events/${eventId}/participants`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                return data;
            },
        },
    );
}
