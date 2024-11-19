import { Category } from "@/types/categories";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

interface CategoryCardProps {
    category: Category;
    isSelected?: boolean;
    iconSize: number;
}

export const CategoryCard = ({ category, isSelected, iconSize }: CategoryCardProps) => {
    const Icon = category.icon;
    return <TouchableOpacity style={styles(isSelected, category.backgroundColor).container} onPress={() => router.push(`/(tabs)?category=${category.slug}`)}>
        <View style={styles().icon}>
            <Icon color="#FFFFFF" size={iconSize} />
        </View>
        <Text style={styles().text}>{category.name}</Text>
    </TouchableOpacity>
}

const styles = (isSelected?: boolean, backgroundColor?: [string, string]) => StyleSheet.create({
    container: {
        backgroundColor: "#333333",
        backgroundImage: backgroundColor ? `linear-gradient(180deg, ${backgroundColor[0]}, ${backgroundColor[1]})` : undefined,
        width: "100%",
        height: "100%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        borderWidth: isSelected ? 5 : 0,
        borderColor: isSelected ? "rgba(200, 200, 200, 0.7)" : undefined,
    },
    icon: {
        marginBottom: 10,
    },
    text: {
        color: "#ffffff",
        textAlign: "center",
    },
});