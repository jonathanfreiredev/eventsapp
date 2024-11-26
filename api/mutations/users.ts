import { apiClient } from "@/api/client";
import { useMutation } from "@tanstack/react-query";

export type CreateUserInput = {
    firstName: string;
    email: string;
    password: string;
}

export type LoginInput = {
    email: string;
    password: string;
}

export type UserInfo = {
    firstName: string;
    lastName: string;
    email: string;
    image: string | null;
}

export type UserSession = {
    accessToken: string;
    user: UserInfo;
}

export const useSignup = () => {
    return useMutation<UserSession, Error, CreateUserInput>({
        mutationKey: ['signup'],
        mutationFn: async (user: CreateUserInput): Promise<UserSession> => {
            const { data } = await apiClient.post('/auth/signup', user);
            return data;
        },
    });
}

export const useLogin = () => {
    return useMutation<UserSession, Error, LoginInput>({
        mutationKey: ['login'],
        mutationFn: async (user: LoginInput): Promise<UserSession> => {
            const { data } = await apiClient.post('/auth/login', user);
            return data;
        },
    });
}
