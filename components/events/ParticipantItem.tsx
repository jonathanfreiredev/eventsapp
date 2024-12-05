import { User } from "@/types/users";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

interface ParticipantItemProps {
    participant: User;
}

export const ParticipantItem = ({ participant }: ParticipantItemProps) => {
    return <View style={styles.participant}>
        <View style={styles.imageContainer}>
            {participant.image ? <Avatar.Image
                size={50}
                source={{
                    uri: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
                }}
            /> : <Avatar.Text size={50} label={`${participant.firstName[0]}${participant.lastName[0]}`} style={styles.avatar} />}
        </View>
        <View style={styles.participantDetails}>
            <Text style={styles.participantName} variant="bodyMedium">{participant.firstName} {participant.lastName}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    participant: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        gap: 10,
    },
    imageContainer: {
        width: 50,
        height: 50,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
    },
    participantDetails: {
        flexDirection: "column",
        gap: 5,
    },
    participantName: {
        color: "#000000",
    },
    avatar: {
        backgroundColor: "#5F19F2",
        opacity: 0.7,
    }
});