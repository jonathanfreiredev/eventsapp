export type UserInfo = {
    firstName: string;
    lastName: string;
    email: string;
    image?: string | null;
}

export type User = UserInfo & {
    id: string;
}

export type UserSession = {
    accessToken: string;
    user: UserInfo;
}