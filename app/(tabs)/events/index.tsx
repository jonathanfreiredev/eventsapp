import { EventCard } from "@/components/events/EventCard";
import { AppLayout } from "@/components/layouts/AppLayout";
import { EventsMock } from "@/constants/events";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";

export default function EventsParticipatingScreen() {
  return (
    <AppLayout showHeader>
      <View style={styles.section}>
        <SegmentedButtons
          value="participating"
          onValueChange={(value) => value === "participating" ? router.replace("/(tabs)/events") : router.replace("/(tabs)/events/created")}
          buttons={[
            {
              value: 'participating',
              label: 'Participando',
            },
            {
              value: "created",
              label: "Creados",
            },
          ]}
        />

        <View style={styles.eventsSection}>
          {EventsMock.map((event) => (
            <EventCard key={event.name} event={event} isFavourite={false} />
          ))}
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 40,
  },
  eventsSection: {
    flexDirection: "column",
    gap: 10,
    marginTop: 15,
  },
});