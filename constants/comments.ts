import { Comment } from "@/types/comments";
import { UsersMock } from "./users";

export const CommentsMock: Comment[] = [
    {
        id: "1",
        commentedBy: UsersMock[0],
        content: "lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet",
        replies: [
            {
                id: "1",
                repliedBy: UsersMock[1],
                content: "This is a reply",
            },
        ],
    },
    {
        id: "2",
        commentedBy: UsersMock[1],
        content: "This is another comment",
        replies: [],
    },
];
