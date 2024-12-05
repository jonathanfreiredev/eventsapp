import { useSession } from "@/components/common/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../lib/getAccessToken";
import { apiClient } from "../client";
import { Event } from "@/types/events";

export const useGetFavouriteEvents = () => {
    const { session } = useSession();

    return useQuery<Event[]>(
        {
            queryKey: ['getFavouriteEvents'],
            queryFn: async () => {
                if (!session) {
                    throw new Error("You must be logged in to view events");
                }

                const accessToken = getAccessToken(session);

                const { data } = await apiClient.get(`/users/favourite-events`, {
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

export const useIsFavouriteEvent = (eventId: string) => {
    const { session } = useSession();

    return useQuery<boolean>(
        {
            queryKey: ['isFavouriteEvent', eventId],
            queryFn: async () => {
                if (!session) {
                    return false;
                }

                const accessToken = getAccessToken(session);

                const { data } = await apiClient.get(`/users/favourite-events/${eventId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                return data;
            },
        },
    );
}