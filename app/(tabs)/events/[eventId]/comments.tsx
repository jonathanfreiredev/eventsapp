import { FloatingButton } from "@/components/common/FloatingButton";
import { CommentItem } from "@/components/events/CommentItem";
import { CommentsMock } from "@/constants/comments";
import { EventsMock } from "@/constants/events";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Modal, Portal, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventCommentsScreen() {
    const [openedModal, setOpenedModal] = useState(false);
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

                <FloatingButton label="Crea un comentario" onPress={() => setOpenedModal(true)} />
            </View>
            <Portal>
                <Modal visible={openedModal} onDismiss={() => setOpenedModal(false)} contentContainerStyle={styles.modal}>
                    <View style={styles.form}>
                        <Text variant="titleMedium">Escribe tu comentario</Text>
                        <TextInput
                            label={<Text>Comentario</Text>}
                            outlineColor="#B0B0B0"
                            multiline
                            activeOutlineColor="black"
                            textColor="black"
                            mode="outlined"
                            outlineStyle={{ borderRadius: 8 }}
                        />

                        <TouchableOpacity
                            style={styles.buttonForm}
                            onPress={() => setOpenedModal(false)}>
                            <Text variant="bodyLarge" style={styles.buttonFormText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Portal>
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
        paddingBottom: 80,
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
    buttonSection: {
        width: "100%",
        position: "absolute",
        padding: 20,
        bottom: 0,
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
    },
    form: {
        flexDirection: "column",
        gap: 10,
        padding: 10,
    },
    buttonForm: {
        backgroundColor: "#5F19F2",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    buttonFormText: {
        color: "white",
    },
});