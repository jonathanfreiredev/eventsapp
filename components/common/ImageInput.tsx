import { useUploadImage } from '@/api/mutations/images';
import * as ImagePicker from 'expo-image-picker';
import { Platform, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

interface ImageInputProps {
    name: string;
    onChange: (value: string) => void;
    style: StyleProp<ViewStyle>
    children: React.ReactNode;
}

export const ImageInput = ({ name, onChange, style, children }: ImageInputProps) => {
    const uploadImage = useUploadImage();

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true,
            });

            if (!result.canceled) {
                const formData = new FormData();

                const mimeType = result.assets[0].mimeType || 'image/jpeg';
                const format = mimeType.split('/')[1] || 'jpg';

                if (Platform.OS === 'web') {
                    const response = await fetch(result.assets[0].uri);
                    const blob = await response.blob();

                    formData.append("image", blob, `${name}.${format}`);
                } else {
                    //@ts-ignore-next-line
                    formData.append('image', {
                        uri: result.assets[0].uri,
                        type: mimeType,
                        name: `${name}.${format}`,
                    });
                }

                const image = await uploadImage.mutateAsync(formData);

                onChange(image.url);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TouchableOpacity style={style} onPress={pickImage}>
            {children}
        </TouchableOpacity>
    );
};