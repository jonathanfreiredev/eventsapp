import { CategoryCard } from "@/components/categories/CategoryCard";
import { Categories } from "@/constants/categories";
// import { EventCard } from "@/components/events/EventCard";
// import { EventsMock } from "@/constants/Events";
import { CategoryType } from "@/types/categories";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

export default function CategoriesScreen() {
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
        <View style={styles.categoriesHeader}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Categorías
          </Text>
          <Text variant="titleSmall" style={{ color: "#B0B0B0" }}>Ver todo</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Categories.map((category) => (
            <CategoryCard key={category.name} category={category} isSelected={category.name === CategoryType.Music} />
          ))}
        </ScrollView>
      </View>

      {/* <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Eventos - Música</Text>
        {EventsMock.map((event) => (
          <EventCard key={event.name} event={event} isFavourite={false} />
        ))}
      </View> */}
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
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
});
