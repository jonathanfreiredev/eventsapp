import { apiClient } from "@/api/client";
import { useSession } from "@/components/common/AuthContext";
import { Event } from "@/types/events";
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
                return data;
            },
        },
    );
};

export const useGetEvents = () => {
    const { session } = useSession();

    return useQuery<Event[]>(
        {
            queryKey: ['getEvents'],
            queryFn: async () => {
                if (!session) {
                    throw new Error("You must be logged in to view events");
                }

                const accessToken = getAccessToken(session);

                const { data } = await apiClient.get('/events', {
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
