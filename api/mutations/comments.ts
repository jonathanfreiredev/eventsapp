import { apiClient } from "@/api/client";
import { useSession } from "@/components/common/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "../lib/getAccessToken";
import { Comment, Reply } from "@/types/comments";

export type CreateCommentInput = {
    content: string;
    eventId: string;
}

export type ReplyCommentInput = {
    content: string;
    commentId: string;
}

export const useCreateComment = () => {
    const { session } = useSession();

    return useMutation<Comment, Error, CreateCommentInput>({
        mutationKey: ['createComment'],
        mutationFn: async (comment: CreateCommentInput): Promise<Comment> => {
            if (!session) {
                throw new Error("You must be logged in to create a comment");
            }

            const accessToken = getAccessToken(session);

            const { data } = await apiClient.post(`/events/${comment.eventId}/comments`, {
                content: comment.content,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return data;
        },
    });
}

export const useReplyComment = () => {
    const { session } = useSession();

    return useMutation<Reply, Error, ReplyCommentInput>({
        mutationKey: ['replyComment'],
        mutationFn: async (reply: ReplyCommentInput): Promise<Reply> => {
            if (!session) {
                throw new Error("You must be logged in to reply to a comment");
            }

            const accessToken = getAccessToken(session);

            const { data } = await apiClient.post(`/comments/${reply.commentId}/replies`, {
                content: reply.content,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return data;
        },
    });
}