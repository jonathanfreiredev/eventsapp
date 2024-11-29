import { apiClient } from "@/api/client";
import { useSession } from "@/components/common/AuthContext";
import { Comment } from "@/types/comments";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../lib/getAccessToken";

export const useGetEventComments = (eventId: string) => {
    const { session } = useSession();

    return useQuery<Comment[]>(
        {
            queryKey: ['getEventComments', eventId],
            queryFn: async () => {
                if (!session) {
                    throw new Error("You must be logged in to view comments");
                }

                const accessToken = getAccessToken(session);

                const { data } = await apiClient.get(`/events/${eventId}/comments`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                return data;
            },
        },
    );
}