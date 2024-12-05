import { UserInfo, UserSession } from "@/types/users";
import CryptoJS from "crypto-js";
import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useReducer } from 'react';
import { Platform } from 'react-native';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
    initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
    return useReducer(
        (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
        initialValue
    ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
    if (Platform.OS === 'web') {
        try {
            if (value === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, value);
            }
        } catch (e) {
            console.error('Local storage is unavailable:', e);
        }
    } else {
        if (value == null) {
            await SecureStore.deleteItemAsync(key);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    }
}

export function useStorageState(key: string): [UseStateHook<UserSession>[0], UseStateHook<UserSession>[1], (user: UserInfo) => void] {
    // Public
    const [state, setState] = useAsyncState<UserSession>();

    // Get
    useEffect(() => {
        if (Platform.OS === 'web') {
            try {
                if (typeof localStorage !== 'undefined') {
                    const value = localStorage.getItem(key);
                    if (value) {
                        const jwtToken: UserSession = JSON.parse(value);

                        setState(jwtToken);
                    } else {
                        setState(null);
                    }
                }
            } catch (e) {
                console.error('Local storage is unavailable:', e);
            }
        } else {
            SecureStore.getItemAsync(key).then(value => {
                if (value) {
                    const jwtToken: UserSession = JSON.parse(value);

                    setState(jwtToken);
                } else {
                    setState(null);
                }
            });
        }
    }, [key]);

    // Set
    const setValue = useCallback(
        (data: UserSession | null) => {
            if (data) {
                const code = process.env.SECRET || "";

                data.accessToken = CryptoJS.AES.encrypt(data.accessToken, code).toString();
            }
            setState(data);

            setStorageItemAsync(key, data ? JSON.stringify(data) : null);
        },
        [key]
    );

    const updateToken = (user: UserInfo) => {
        const jwtToken = state[1];

        const data = {
            accessToken: jwtToken?.accessToken || "",
            user: user,
        };

        setState(data);

        setStorageItemAsync(key, JSON.stringify(data));
    }

    return [state, setValue, updateToken];
}