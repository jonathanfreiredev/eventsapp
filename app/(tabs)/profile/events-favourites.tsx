import { EventCard } from "@/components/events/EventCard";
import { AppLayout } from "@/components/layouts/AppLayout";
import { EventsMock } from "@/constants/events";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

export default function EventsFavouritesScreen() {
    return (
        <AppLayout>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <View style={styles.header}>
                        <Text variant="titleMedium">Eventos favoritos</Text>

                        <IconButton
                            icon="chevron-left"
                            iconColor="#5F19F2"
                            size={40}
                            style={{ position: "absolute", top: 0, left: 0 }}
                            onPress={() => router.replace("/(tabs)/profile")}
                        />
                    </View>

                    <View style={styles.eventsSection}>
                        {EventsMock.map((event) => (
                            <EventCard key={event.name} event={event} isFavourite={false} />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </AppLayout>
    );
}

const styles = StyleSheet.create({
    content: {
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
    },
    scrollView: {
        height: "100%",
        width: "100%",
    },
    header: {
        flexDirection: "column",
        alignItems: "center",
        gap: 15,
        marginTop: 20,
        paddingVertical: 20,
    },
    eventsSection: {
        flexDirection: "column",
        gap: 10,
        marginTop: 15,
    },
});