import { CommentItem } from "@/components/events/CommentItem";
import { CommentsMock } from "@/constants/comments";
import { EventsMock } from "@/constants/events";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventCommentsScreen() {
    const { eventId } = useLocalSearchParams();
    const event = EventsMock.find((event) => event.id === eventId);

    if (!event) {
        return router.replace("/(tabs)/events/created");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <View style={styles.header}>
                        <Text variant="titleMedium">Comentarios</Text>

                        <IconButton
                            icon="chevron-left"
                            iconColor="#5F19F2"
                            size={40}
                            style={{ position: "absolute", top: 0, left: 0 }}
                            onPress={() => router.navigate({
                                pathname: "/(tabs)/events/[eventId]",
                                params: {
                                    eventId: event.id,
                                },
                            })}
                        />
                    </View>

                    <View style={styles.section}>
                        {CommentsMock.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 20,
    },
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