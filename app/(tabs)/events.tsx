import { CreatedEvents } from "@/components/events/CreatedEvents";
import { EventsParticipating } from "@/components/events/EventsParticipating";
import { AppLayout } from "@/components/layouts/AppLayout";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";

export default function EventsScreen() {
  const params = useLocalSearchParams();
  const tab = params.tab as string;

  const value = tab === "created" ? "created" : "participating";

  return (
    <AppLayout showHeader>
      <View style={styles.section}>
        <SegmentedButtons
          value={value}
          onValueChange={(value) => router.navigate(`/(tabs)/events?tab=${value}`)}
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

        {value === "created" ? <CreatedEvents /> : <EventsParticipating />}

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