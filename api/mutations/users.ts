import { apiClient } from "@/api/client";
import { useSession } from "@/components/common/AuthContext";
import { User, UserSession } from "@/types/users";
import { useMutation } from "@tanstack/react-query";
import CryptoJS from "crypto-js";

export type SignupInput = {
    firstName: string;
    email: string;
    password: string;
}

export type LoginInput = {
    email: string;
    password: string;
}

export type EditProfileInput = {
    firstName: string;
    lastName: string;
    email: string;
}

export const useSignup = () => {
    return useMutation<UserSession, Error, SignupInput>({
        mutationKey: ['signup'],
        mutationFn: async (user: SignupInput): Promise<UserSession> => {
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

export const useEditProfile = () => {
    const { session } = useSession();

    const code = process.env.SECRET || "";

    return useMutation<User, Error, EditProfileInput>({
        mutationKey: ['editProfile'],
        mutationFn: async (user: EditProfileInput): Promise<User> => {
            if (!session) {
                throw new Error("You must be logged in to edit your profile");
            }

            const accessToken = CryptoJS.AES.decrypt(session.accessToken, code).toString(CryptoJS.enc.Utf8);

            const { data } = await apiClient.put('/users/update/me', user, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return data;
        },
    });
}