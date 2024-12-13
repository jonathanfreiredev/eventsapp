import { useLeaveEvent, useParticipateInEvent } from "@/api/mutations/events";
import { useFavouriteEvent, useUnFavouriteEvent } from "@/api/mutations/users";
import { useGetEvent } from "@/api/queries/events";
import { useIsFavouriteEvent } from "@/api/queries/users";
import { useSession } from "@/components/common/AuthContext";
import { FloatingButton } from "@/components/common/FloatingButton";
import { IconCalendar, IconMapPin } from "@tabler/icons-react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Icon, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventScreen() {
    const { eventId } = useLocalSearchParams();
    const { session, isLoading: isLoadingSession } = useSession();

    const participateInEvent = useParticipateInEvent();
    const leaveEvent = useLeaveEvent();
    const addFavouriteEvent = useFavouriteEvent();
    const removeFavouriteEvent = useUnFavouriteEvent();

    const {
        data: event,
        isLoading,
        isError,
        refetch,
    } = useGetEvent(eventId as string);

    const {
        data: isFavouriteEvent,
        isError: isFavouriteEventError,
        isLoading: isFavouriteEventLoading,
        refetch: refetchFavouriteEvent,
    } = useIsFavouriteEvent(eventId as string);

    useEffect(() => {
        if (!session && !isLoadingSession) {
            router.navigate("/(auth)/login");
        }
    }, [session, isLoadingSession]);

    if (isLoadingSession || isLoading || isFavouriteEventLoading) {
        return <ActivityIndicator animating={true} />;
    }

    if (!session) {
        return <Text variant="bodyLarge">
            You need to be logged in to access this page
        </Text>
    }

    if (isError || isFavouriteEventError || !event) {
        return <Text>Error loading event</Text>;
    }

    const eventDuration = (event.endDate.getTime() - event.startDate.getTime()) / 60000;

    const eventDurationHours = Math.floor(eventDuration / 60);
    const eventDurationMinutes = eventDuration % 60;

    const isParticipationDisabled = event.numParticipants >= event.capacity || event.endDate < new Date();

    const handleFavourite = async () => {
        if (isFavouriteEvent) {
            await removeFavouriteEvent.mutateAsync(event.id);
        } else {
            await addFavouriteEvent.mutateAsync(event.id);
        }

        await refetchFavouriteEvent();
        await refetch();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <View style={styles.cover}>
                        {event.image ?
                            <Image source={{
                                uri: event.image,
                            }}
                                resizeMode="cover"
                                style={styles.image}
                            />
                            : <View style={styles.imagePlaceholder} />
                        }

                        <IconButton
                            icon="chevron-left"
                            iconColor="white"
                            size={40}
                            style={{ position: "absolute", top: 30, left: 10 }}
                            onPress={() => router.navigate("/(tabs)/events")}
                        />
                    </View>

                    <View style={styles.eventContent}>
                        <View style={styles.sectionTitle}>
                            <Text variant="titleLarge">{event.name}</Text>
                            <TouchableOpacity onPress={() => { handleFavourite() }}>
                                {
                                    isFavouriteEvent ?
                                        <Icon source="bookmark" size={27} color="#000000" /> :
                                        <Icon source="bookmark-outline" size={27} color="#000000" />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.sectionLinks}>
                            <TouchableOpacity onPress={() => router.navigate({
                                pathname: "/events/[eventId]/participants",
                                params: {
                                    eventId: event.id,
                                },
                            })}>
                                <Text variant="titleMedium" style={styles.participants}>{event.numParticipants} participants</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.navigate({
                                pathname: "/events/[eventId]/comments",
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
                    label={!isParticipationDisabled ? event.participating ? "Participando" : "Participar" : "Evento finalizado"}
                    backgroundColor={!isParticipationDisabled ? event.participating ? "#5CB85C" : "default" : "#B0B0B0"}
                    disabled={isParticipationDisabled}
                    onPress={async () => {
                        try {
                            if (event.participating) {
                                await leaveEvent.mutateAsync(event.id);
                            } else {
                                await participateInEvent.mutateAsync(event.id);
                            }
                            await refetch();
                            await refetchFavouriteEvent();
                        } catch (error: any) {
                            console.error(error.message);
                        }
                    }}
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
    imagePlaceholder: {
        width: "100%",
        height: "100%",
        backgroundColor: "#B0B0B0",
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