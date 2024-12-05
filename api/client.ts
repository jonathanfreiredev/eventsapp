import axios from "axios";
import { Platform } from "react-native";

const ip = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";

export const apiClient = axios.create({
    baseURL: `http://${ip}:4000`,
    headers: {
        "Content-Type": "application/json",
    },
});