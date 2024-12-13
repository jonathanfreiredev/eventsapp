import { useFavouriteEvent, useUnFavouriteEvent } from "@/api/mutations/users";
import { useIsFavouriteEvent } from "@/api/queries/users";
import { Event } from "@/types/events";
import { IconCalendar, IconEdit, IconMapPin } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-paper";

interface EventCardProps {
    event: Event;
    isToEdit?: boolean;
}

export const EventCard = ({ event, isToEdit }: EventCardProps) => {
    const addFavouriteEvent = useFavouriteEvent();
    const removeFavouriteEvent = useUnFavouriteEvent();

    const {
        data: isFavouriteEvent,
        isError: isFavouriteEventError,
        isLoading: isFavouriteEventLoading,
        refetch,
    } = useIsFavouriteEvent(event.id);

    if (isFavouriteEventLoading) {
        return <Text>Loading...</Text>;
    }

    if (isFavouriteEventError || isFavouriteEvent === undefined) {
        return <Text>Error loading favourite event</Text>;
    }

    const handleFavourite = async () => {
        if (isFavouriteEvent) {
            await removeFavouriteEvent.mutateAsync(event.id);
        } else {
            await addFavouriteEvent.mutateAsync(event.id);
        }

        await refetch();
    }

    return <TouchableOpacity style={styles.card} onPress={() => router.navigate({
        pathname: "/events/[eventId]",
        params: {
            eventId: event.id,
        },
    })}>
        {event.image ?
            <Image source={{
                uri: event.image,
            }}
                resizeMode="cover"
                style={styles.image}
            />
            : <View style={styles.imagePlaceholder} />
        }
        <View style={styles.content}>
            <View style={styles.contentHeader}>
                <Text style={styles.eventTitle} variant="titleMedium">{event.name}</Text>
                {!!isToEdit ?
                    <TouchableOpacity onPress={() => router.navigate({
                        pathname: "/events/[eventId]/edit",
                        params: {
                            eventId: event.id,
                        },
                    })}>
                        <IconEdit size={27} color="#000000" />
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={() => { handleFavourite() }}>
                        {
                            isFavouriteEvent ?
                                <Icon source="bookmark" size={27} color="#000000" /> :
                                <Icon source="bookmark-outline" size={27} color="#000000" />
                        }
                    </TouchableOpacity>}
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
        </View>
    </TouchableOpacity>

}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        padding: 5,
    },
    image: {
        width: 130,
        height: 130,
        borderRadius: 10,
        overflow: "hidden",
    },
    imagePlaceholder: {
        width: 130,
        height: 130,
        borderRadius: 10,
        backgroundColor: "#B0B0B0",
    },
    content: {
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
        marginLeft: 10,
    },
    contentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    eventTitle: {
        fontWeight: "bold",
        color: "#000000",
    },
    eventDetails: {
        flexDirection: "column",
        gap: 10,
        paddingBottom: 5,
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
});