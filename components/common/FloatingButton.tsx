import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

interface FloatingButtonProps {
    onPress: () => void;
    label: string;
    backgroundColor?: string | "default";
}

export const FloatingButton = ({ label, onPress, backgroundColor = "default" }: FloatingButtonProps) => {
    const styles = useStyles(backgroundColor);

    return (
        <View style={styles.buttonSection}>
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}>
                <Text variant="bodyLarge" style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
        </View>
    );
}

const useStyles = (backgroundColor?: string) => StyleSheet.create({
    buttonSection: {
        width: "100%",
        position: "absolute",
        padding: 10,
        bottom: 0,
    },
    button: {
        width: "100%",
        backgroundColor: backgroundColor === "default" ? "#5F19F2" : backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 8,
        boxShadow: "0px 3px 8px 3px #CCCCCC",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});