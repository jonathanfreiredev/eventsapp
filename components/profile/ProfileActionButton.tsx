import { Icon } from "@tabler/icons-react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

interface ProfileActionButtonProps {
    icon: Icon;
    text: string;
    onPress: () => void;
    variant?: "default" | "red";
}

export const ProfileActionButton = ({ icon, text, onPress, variant = "default" }: ProfileActionButtonProps) => {
    const TablerIcon = icon;

    return <TouchableOpacity style={styles(variant).container} onPress={onPress}>
        <TablerIcon size={24} color="#000000" />
        <Text variant="labelLarge" style={styles(variant).text}>{text}</Text>
    </TouchableOpacity>
}

const styles = (variant: "default" | "red") => StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: variant === "red" ? "#FFEBEE" : "#FFFFFF",
        padding: 15,
        borderWidth: 1,
        borderColor: variant === "red" ? "#FF0000" : "#B0B0B0",
        borderRadius: 10,
        gap: 10
    },
    text: {
        marginLeft: 10
    }
});