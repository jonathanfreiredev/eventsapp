import { Category } from "@/types/categories";
import { LinearGradient } from 'expo-linear-gradient';
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
    return <TouchableOpacity style={styles().container} onPress={() => router.push(`/(tabs)?category=${category.slug}`)}>
        <LinearGradient
            colors={category.backgroundColor}
            style={styles(isSelected, category.backgroundColor).backgroundContainer}
        >
            <View style={styles().icon}>
                <Icon color="#FFFFFF" size={iconSize} />
            </View>
            <Text style={styles().text}>{category.name}</Text>
        </LinearGradient>
    </TouchableOpacity >
}

const styles = (isSelected?: boolean, backgroundColor?: [string, string]) => StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    backgroundContainer: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        borderWidth: isSelected ? 4 : 0,
        borderColor: isSelected ? "rgba(215, 215, 215, 0.9)" : undefined,
    },
    icon: {
        marginBottom: 10,
    },
    text: {
        color: "#ffffff",
        textAlign: "center",
    },
});