import { useSession } from "@/components/common/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { getAccessToken } from "../lib/getAccessToken";
import { apiClient } from "../client";

export type Image = {
    url: string;
}

export const useUploadImage = () => {
    const { session } = useSession();

    return useMutation<Image, Error, FormData>({
        mutationKey: ['uploadImage'],
        mutationFn: async (image: FormData): Promise<Image> => {
            if (!session) {
                throw new Error("You must be logged in to upload an image");
            }

            const accessToken = getAccessToken(session);

            console.log("Uploading image...");

            const { data } = await apiClient.post('/images/upload', image, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            return data;
        },
    });
}