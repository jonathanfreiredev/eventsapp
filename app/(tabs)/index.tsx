import { CategoryCard } from "@/components/categories/CategoryCard";
import { EventCard } from "@/components/events/EventCard";
import { Categories } from "@/constants/categories";
import { EventsMock } from "@/constants/events";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

export default function MainPageScreen() {
  const params = useLocalSearchParams();
  const selectedCategory = Categories.find((category) => category.slug === params.category);

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
          <Text variant="titleSmall" style={{ color: "#B0B0B0" }} onPress={() => router.push("/(tabs)/categories")}>Ver todo</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Categories.map((category) => (
            <View key={category.name} style={styles.categoryCard}>
              <CategoryCard category={category} isSelected={category.slug === selectedCategory?.slug} iconSize={40} />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Eventos - {selectedCategory?.name}</Text>
        <View style={styles.eventsSection}>
          {EventsMock.map((event) => (
            <EventCard key={event.name} event={event} isFavourite={false} />
          ))}
        </View>
      </View>
    </ScrollView >
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
  eventsSection: {
    flexDirection: "column",
    gap: 10,
  },
  categoryCard: {
    width: 140,
    height: 140,
    marginRight: 5,
  }
});
