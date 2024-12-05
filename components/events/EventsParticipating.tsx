import { useGetEventsParticipating, useGetMyEvents } from "@/api/queries/events";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { EventCard } from "./EventCard";

export const EventsParticipating = () => {
    const {
        data: events,
        isLoading,
        isError,
    } = useGetEventsParticipating();

    if (isLoading) {
        return <ActivityIndicator animating={true} />;
    }

    if (isError || !events) {
        return <Text>Error loading events</Text>;
    }

    return <View style={styles.section}>
        {events.map((event) => (
            <EventCard key={event.name} event={event} />
        ))}
    </View>
}

const styles = StyleSheet.create({
    section: {
        flexDirection: "column",
        gap: 10,
        marginTop: 15,
    },
});