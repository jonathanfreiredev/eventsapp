import { CloudinaryClient } from "@/api/cloudinary/client";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";

export const ImageInput = () => {
    const [image, setImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        if (!image) {
            console.log("No image selected");
            return;
        }

        setUploading(true);

        try {
            const options = {
                upload_preset: "<your_upload_preset>",
                unsigned: true,
            };

            const response = await upload(CloudinaryClient, {
                file: image, // Ruta del archivo local
                options,
                callback: (error, result) => {
                    if (error) {
                        console.error("Upload error:", error);
                    } else if (result) {
                        console.log("Upload successful", `URL: ${result.secure_url}`);
                    }
                },
            });

            console.log("Response:", response);
        } catch (error: any) {
            console.error("Error:", error?.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {image && (
                <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200, marginBottom: 20 }}
                />
            )}
            <Button onPress={pickImage}>
                <Text>Choose Image</Text>
            </Button>
            <Button onPress={uploadImage}>
                Upload Image
            </Button>
            {uploading && (
                <Text style={{ marginTop: 20 }}>Uploading image, please wait...</Text>
            )}
        </View>
    );
}