import { StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native-paper";

interface NumberInputProps {
    value: number;
    setValue: (value: number) => void;
}

export const NumberInput = ({ value, setValue }: NumberInputProps) => {
    return <View style={styles.inputContainer}>
        <Text>Máximo n° de participantes</Text>
        <TextInput
            value={value.toString()}
            onChangeText={(text) => { 
                if (isNaN(parseInt(text))) setValue(0);
                else setValue(parseInt(text)) 
            }}
            keyboardType="number-pad"
            style={styles.input}
        />
    </View>
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "column",
        gap: 5,
    },
    input: {
        marginBottom: 10,
        backgroundColor: "#F0F0F0",
        padding: 13,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#B0B0B0",
    },
    dateButton: {
        flexDirection: "row",
        gap: 10,
    },
});