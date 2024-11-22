import { CategoryType } from "@/types/categories";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Text } from "react-native-paper";

interface CategoryTypeInputProps {
    category: CategoryType;
    setCategory: (category: CategoryType) => void;
}

export const CategoryTypeInput = ({category, setCategory}: CategoryTypeInputProps) => {
    return <View style={styles.inputContainer}>
        <Text>Categoría</Text>
        <SelectList
            setSelected={(val: CategoryType) => setCategory(val)}
            data={Object.values(CategoryType).map((category) => ({ key: category, value: category }))}
            save="value"
            boxStyles={styles.input}
            search={false}
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