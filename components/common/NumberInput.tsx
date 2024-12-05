import { StyleProp, StyleSheet, TextInput, View } from "react-native";
import { Text } from "react-native-paper";

interface NumberInputProps {
    value: number;
    onChange: (value: number) => void;
    style?: StyleProp<any>;
}

export const NumberInput = ({ value, onChange, style }: NumberInputProps) => {
    return <View style={[styles.inputContainer, style]}>
        <Text>Máximo n° de participantes</Text>
        <TextInput
            value={value.toString()}
            onChangeText={(text) => { 
                if (isNaN(parseInt(text))) onChange(0);
                else onChange(parseInt(text));
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
        marginBottom: 70,
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