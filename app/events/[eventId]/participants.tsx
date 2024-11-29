import { useGetEventParticipants } from "@/api/queries/events";
import { ParticipantItem } from "@/components/events/ParticipantItem";
import { AppLayout } from "@/components/layouts/AppLayout";
import { EventsMock } from "@/constants/events";
import { UsersMock } from "@/constants/users";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, IconButton, Text } from "react-native-paper";

export default function EventParticipantsScreen() {
    const { eventId } = useLocalSearchParams();

    const {
        data: participants,
        isLoading,
        isError,
        refetch,
    } = useGetEventParticipants(eventId as string);

    if (isLoading) {
        return <ActivityIndicator animating={true} />;
    }

    if (isError || !participants) {
        return <Text>Error loading event</Text>;
    }

    return (
        <AppLayout>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <View style={styles.header}>
                        <Text variant="titleMedium">Participantes</Text>

                        <IconButton
                            icon="chevron-left"
                            iconColor="#5F19F2"
                            size={40}
                            style={{ position: "absolute", top: 0, left: 0 }}
                            onPress={() => router.navigate({
                                pathname: "/events/[eventId]",
                                params: {
                                    eventId: eventId as string,
                                },
                            })}
                        />
                    </View>

                    <View style={styles.section}>
                        {participants.map((participant) => (
                            <ParticipantItem key={participant.id} participant={participant} />
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
    section: {
        flexDirection: "column",
        gap: 10,
        marginTop: 15,
        paddingHorizontal: 20,
    },
});