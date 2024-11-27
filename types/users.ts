export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
}

export type UserInfo = {
    firstName: string;
    lastName: string;
    email: string;
    image?: string | null;
}

export type UserSession = {
    accessToken: string;
    user: UserInfo;
}