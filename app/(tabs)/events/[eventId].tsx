import { EventsMock } from "@/constants/events";
import { IconBookmark, IconCalendar, IconMapPin } from "@tabler/icons-react-native";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Text } from "react-native-paper";


export default function EventScreen() {
    const { eventId } = useLocalSearchParams();

    const event = EventsMock.find((event) => event.id === eventId);

    if (!event) {
        return router.replace("/(tabs)/events");
    }

    const eventDuration = (event.endDate.getTime() - event.startDate.getTime()) / 60000;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.cover}>
                <Image source={event.image} resizeMode="cover" style={styles.image} />

                <IconButton
                    icon="chevron-left"
                    iconColor="white"
                    size={40}
                    style={{ position: "absolute", top: 30, left: 10 }}
                    onPress={() => router.back()}
                />
            </View>

            <View style={styles.content}>
                <View style={styles.sectionTitle}>
                    <Text variant="titleLarge">{event.name}</Text>
                    <TouchableOpacity>
                        <IconBookmark size={30} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.sectionLinks}>
                    <TouchableOpacity>
                        <Text variant="titleMedium" style={styles.participants}>{event.numParticipants} participants</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text variant="titleMedium" style={styles.comments}>Ver comentarios</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.eventDetails}>
                    <View style={styles.detail}>
                        <IconMapPin size={20} color="#B0B0B0" />
                        <Text style={styles.eventAddress} variant="bodyMedium">{event.address}</Text>
                    </View>
                    <View style={styles.detail}>
                        <IconCalendar size={20} color="#B0B0B0" />
                        <Text style={styles.eventDate} variant="bodyMedium">{event.startDate.toLocaleDateString()}</Text>
                    </View>
                </View>
                <Text variant="bodyMedium" style={styles.eventDescription}>{event.description}</Text>

                <View style={styles.otherDetails}>
                    <Text variant="titleMedium">Detalles:</Text>
                    <Text variant="bodyMedium">Máximo n° participantes: {event.capacity}</Text>
                    <Text variant="bodyMedium">Categoría: {event.category}</Text>
                    <Text variant="bodyMedium">Duración: {eventDuration} minutos</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
    },
    cover: {
        width: "100%",
        height: 300,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    content: {
        padding: 20,
    },
    sectionTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    sectionLinks: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    participants: {
        color: "#5F19F2",
    },
    comments: {
        color: "#B0B0B0",
    },
    eventDetails: {
        flexDirection: "column",
        gap: 10,
        marginTop: 10,
    },
    detail: {
        flexDirection: "row",
        gap: 5,
    },
    eventAddress: {
        color: "#B0B0B0",
    },
    eventDate: {
        color: "#B0B0B0",
    },
    eventDescription: {
        marginVertical: 20,
    },
    otherDetails: {
        flexDirection: "column",
        gap: 5,
    },
});