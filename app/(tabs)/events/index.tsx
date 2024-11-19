import { EventCard } from "@/components/events/EventCard";
import { EventsMock } from "@/constants/events";
import { router, usePathname } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, SegmentedButtons } from "react-native-paper";

export default function EventsParticipatingScreen() {
  const pathname = usePathname();

  const pathnameEvents = pathname.split("/").pop();

  console.log(pathnameEvents)

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
        <SegmentedButtons
          style={styles.segmentedButtons}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 60,
  },
  section: {
    marginTop: 40,
  },
  segmentedButtons: {
  },
  eventsSection: {
    flexDirection: "column",
    gap: 10,
    marginTop: 15,
  },
  categoryCard: {
    width: 140,
    height: 140,
    marginRight: 5,
  }
});