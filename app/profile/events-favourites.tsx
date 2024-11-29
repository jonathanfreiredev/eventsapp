import { useGetFavouriteEvents } from "@/api/queries/users";
import { EventCard } from "@/components/events/EventCard";
import { AppLayout } from "@/components/layouts/AppLayout";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, IconButton, Text } from "react-native-paper";

export default function EventsFavouritesScreen() {
    const {
        data: events,
        isLoading,
        isError,
    } = useGetFavouriteEvents();

    if (isLoading) {
        return <ActivityIndicator animating={true} />;
    }

    if (isError || !events) {
        return <Text>Error loading events</Text>;
    }

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
                            onPress={() => router.navigate("/(tabs)/profile")}
                        />
                    </View>

                    <View style={styles.eventsSection}>
                        {events.length > 0 ? events.map((event) => (
                            <EventCard key={event.name} event={event} />
                        )) : <Text>No tienes eventos favoritos</Text>}
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