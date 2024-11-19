import { CategoryCard } from "@/components/categories/CategoryCard";
import { Categories } from "@/constants/categories";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/events-dark-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Avatar.Image
          size={50}
          source={{
            uri: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
          }}
        />
      </View>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 60,
  },
  section: {
    padding: 16,
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