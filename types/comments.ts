import { User } from "./users";

export type Reply = {
    id: string;
    repliedBy: User;
    content: string;
}

export type Comment = {
    id: string;
    commentedBy: User;
    content: string;
    replies: Reply[];
}