import { useGetEvents } from "@/api/queries/events";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { EventCard } from "@/components/events/EventCard";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Categories } from "@/constants/categories";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

export default function MainPageScreen() {
  const params = useLocalSearchParams();
  const {
    data: events,
    isLoading,
    isError,
  } = useGetEvents();

  const selectedCategory = Categories.find((category) => category.slug === params.category);

  if (isLoading) {
    return <ActivityIndicator animating={true} />;
  }

  if (isError || !events) {
    return <Text>Error loading events</Text>;
  }

  if (events.length === 0) {
    return <Text>No events found</Text>;
  }

  return (
    <AppLayout showHeader>
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
          {events.map((event) => (
            <EventCard key={event.name} event={event} isFavourite={false} />
          ))}
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  section: {
    paddingVertical: 16,
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
