import { UserSession } from "@/types/users";
import CryptoJS from "crypto-js";

export const getAccessToken = (session: UserSession) => {
    const code = process.env.SECRET || "";

    const accessToken = CryptoJS.AES.decrypt(session.accessToken, code).toString(CryptoJS.enc.Utf8);

    return accessToken;
}