import { Category } from "@/types/categories";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

interface CategoryCardProps {
    category: Category;
    isSelected?: boolean;
}

export const CategoryCard = ({ category, isSelected }: CategoryCardProps) => {
    const Icon = category.icon;
    return <View style={styles(isSelected, category.backgroundColor).container}>
        <View style={styles().icon}>
            <Icon color="#FFFFFF" size={40} />
        </View>
        <Text style={styles().text}>{category.name}</Text>
    </View>
}

const styles = (isSelected?: boolean, backgroundColor?: [string, string]) => StyleSheet.create({
    container: {
        backgroundImage: backgroundColor ? `linear-gradient(180deg, ${backgroundColor[0]}, ${backgroundColor[1]})` : undefined,
        width: 140,
        height: 140,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        borderWidth: isSelected ? 3 : 0,
        borderColor: isSelected ? "#CCCCCC" : undefined,
    },
    icon: {
        marginBottom: 10,
    },
    text: {
        color: "#ffffff",
        textAlign: "center",
    },
});