import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Text } from "react-native-paper";

interface DateInputProps {
    label: string;
    date: Date;
    setDate: (date: Date) => void;
}

export const DateInput = ({label, date, setDate}: DateInputProps) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (newDate: Date) => {
        setDate(newDate);
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    }

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    }

    const handleTimeConfirm = (newDate: any) => {
        console.log(newDate);
        setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), newDate.getHours(), newDate.getMinutes()));

        hideTimePicker();
    }

    return <View style={styles.inputContainer}>
        <Text>{label}</Text>
        <View style={styles.dateButton}>
            <TouchableOpacity onPress={showDatePicker} style={{ ...styles.input, padding: 10, flex: 2 }}>
                <Text variant="bodyLarge">{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={showTimePicker} style={{ ...styles.input, padding: 10, flex: 1 }}>
                <Text variant="bodyLarge">{date.getHours()}:{date.getMinutes()}</Text>
            </TouchableOpacity>
        </View>
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
        <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
        />
    </View>
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "column",
        gap: 5,
    },
    input: {
        marginBottom: 10,
        backgroundColor: "#F0F0F0",
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#B0B0B0",
    },
    dateButton: {
        flexDirection: "row",
        gap: 10,
    },
});