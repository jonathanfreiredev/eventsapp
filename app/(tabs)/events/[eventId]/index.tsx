import { useSession } from "@/components/common/AuthContext";
import { FloatingButton } from "@/components/common/FloatingButton";
import { EventsMock } from "@/constants/events";
import { IconBookmark, IconCalendar, IconMapPin } from "@tabler/icons-react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Event } from "@/types/events";

export default function EventScreen() {
    const [participating, setParticipating] = React.useState(false);
    const { eventId } = useLocalSearchParams();
    const { session } = useSession();

    useEffect(() => {
        if (!session) {
            router.navigate("/(auth)/login");
        }
    }, [session]);

    const event = EventsMock.find((event) => event.id === eventId) as Event;

    const eventDuration = (event.endDate.getTime() - event.startDate.getTime()) / 60000;

    const eventDurationHours = Math.floor(eventDuration / 60);
    const eventDurationMinutes = eventDuration % 60;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <View style={styles.cover}>
                        <Image source={event.image} resizeMode="cover" style={styles.image} />

                        <IconButton
                            icon="chevron-left"
                            iconColor="white"
                            size={40}
                            style={{ position: "absolute", top: 30, left: 10 }}
                            onPress={() => router.replace("/(tabs)/events")}
                        />
                    </View>

                    <View style={styles.eventContent}>
                        <View style={styles.sectionTitle}>
                            <Text variant="titleLarge">{event.name}</Text>
                            <TouchableOpacity>
                                <IconBookmark size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.sectionLinks}>
                            <TouchableOpacity onPress={() => router.navigate({
                                pathname: "/(tabs)/events/[eventId]/participants",
                                params: {
                                    eventId: event.id,
                                },
                            })}>
                                <Text variant="titleMedium" style={styles.participants}>{event.numParticipants} participants</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.navigate({
                                pathname: "/(tabs)/events/[eventId]/comments",
                                params: {
                                    eventId: event.id,
                                },
                            })}>
                                <Text variant="titleMedium" style={styles.comments}>Ver comentarios</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.eventDetails}>
                            <View style={styles.detail}>
                                <IconMapPin size={20} color="#B0B0B0" />
                                <Text style={styles.eventAddress} variant="bodyMedium">{event.address.street}</Text>
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
                            <Text variant="bodyMedium">Duración: {eventDurationHours > 0 ? `${eventDurationHours}h` : ""} {eventDurationMinutes > 0 ? `${eventDurationMinutes}m` : ""}</Text>
                        </View>
                    </View>
                </ScrollView>

                <FloatingButton
                    label={participating ? "Participando" : "Participar"}
                    backgroundColor={participating ? "#16d216" : "default"}
                    onPress={() => setParticipating(!participating)}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    content: {
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
    },
    scrollView: {
        width: "100%",
        paddingBottom: 70,
    },
    cover: {
        width: "100%",
        height: 300,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    eventContent: {
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