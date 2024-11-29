import { useCreateComment } from "@/api/mutations/comments";
import { useGetEventComments } from "@/api/queries/comments";
import { useSession } from "@/components/common/AuthContext";
import { FloatingButton } from "@/components/common/FloatingButton";
import { CommentItem } from "@/components/events/CommentItem";
import { router, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from 'yup';

const CreateEventComment = Yup.object().shape({
    content: Yup.string().required("El comentario es obligatorio"),
});

export default function EventCommentsScreen() {
    const [openedModal, setOpenedModal] = useState(false);
    const { eventId } = useLocalSearchParams();
    const { session, isLoading: isLoadingSession } = useSession();

    const createEventComment = useCreateComment();

    const {
        data: comments,
        isLoading,
        isError,
        refetch,
    } = useGetEventComments(eventId as string);

    useEffect(() => {
        if (!isLoadingSession && !session) {
            router.navigate("/(auth)/login");
        }
    }, [session, isLoadingSession]);

    if (isLoadingSession || isLoading) {
        return <ActivityIndicator animating={true} />;
    }

    if (!session) {
        return <Text variant="bodyLarge">
            You need to be logged in to access this page
        </Text>
    }

    if (!comments || isError) {
        return <Text variant="bodyLarge">Error loading comments</Text>
    }

    const onSubmit = async (values: Yup.InferType<typeof CreateEventComment>) => {
        console.log(values)
        try {
            await createEventComment.mutateAsync({
                ...values,
                eventId: eventId as string,
            });

            await refetch();

            setOpenedModal(false)
        } catch (error) {
            console.log(error)
        }
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
                                pathname: "/events/[eventId]",
                                params: {
                                    eventId: eventId as string,
                                },
                            })}
                        />
                    </View>

                    <View style={styles.section}>
                        {comments.length > 0 ? comments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} refetch={async () => { await refetch() }} />
                        )) : <Text>No hay comentarios disponibles</Text>}
                    </View>
                </ScrollView>

                <FloatingButton label="Crea un comentario" onPress={() => setOpenedModal(true)} />
            </View>
            <Portal>
                <Modal visible={openedModal} onDismiss={() => setOpenedModal(false)} contentContainerStyle={styles.modal}>
                    <Formik
                        initialValues={{
                            content: "",
                        }}
                        validationSchema={CreateEventComment}
                        onSubmit={onSubmit}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
                                    onBlur={handleBlur('content')}
                                    onChangeText={handleChange('content')}
                                    value={values.content}
                                    error={touched.content && errors.content ? true : false}
                                />

                                <TouchableOpacity
                                    style={styles.buttonForm}
                                    onPress={() => {
                                        handleSubmit();
                                    }}>
                                    <Text variant="bodyLarge" style={styles.buttonFormText}>Guardar</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
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