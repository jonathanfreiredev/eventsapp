import { CategoryCard } from "@/components/categories/CategoryCard";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Categories } from "@/constants/categories";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function CategoriesScreen() {
  return (
    <AppLayout showHeader>
      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>Categorías</Text>
        <View style={styles.categoriesGrid}>
          {Categories.map((category) => (
            <View key={category.name} style={styles.categoryCard}>
              <CategoryCard category={category} iconSize={60} />
            </View>
          ))}
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryCard: {
    width: "47%",
    height: 150,
  }
});