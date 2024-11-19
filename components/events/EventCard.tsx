import { Event } from "@/types/events";
import { IconBookmark, IconBookmarkFilled, IconCalendar, IconMapPin } from "@tabler/icons-react-native";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface EventCardProps {
    event: Event;
    isFavourite?: boolean;
}


export const EventCard = ({ event, isFavourite }: EventCardProps) => {
    return <View style={styles.card}>
        <Image source={event.image} resizeMode="cover" style={styles.image} />
        <View style={styles.content}>
            <View style={styles.contentHeader}>
                <Text style={styles.eventTitle} variant="titleMedium">{event.name}</Text>
                <View>
                    {
                        isFavourite ?
                            <IconBookmarkFilled size={30} color="#000000" /> :
                            <IconBookmark size={30} color="#000000" />
                    }
                </View>
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
        </View>

    </View>
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