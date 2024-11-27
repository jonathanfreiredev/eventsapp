import { CategoryType } from "@/types/categories";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Text } from "react-native-paper";

interface CategoryTypeInputProps {
    value: CategoryType;
    onChange: (category: CategoryType) => void;
}

export const CategoryTypeInput = ({ value, onChange }: CategoryTypeInputProps) => {
    const [isFocus, setIsFocus] = useState(false);

    return <View style={styles.container}>
        <Text>Categoría</Text>
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'black', borderWidth: 2, }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Object.values(CategoryType).map((category) => ({ label: category, value: category }))}
            search={false}
            maxHeight={180}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Selecciona una categoría' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                onChange(item.value);
                setIsFocus(false);
            }}
        />
    </View>
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: 5,
        marginBottom: 10,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});