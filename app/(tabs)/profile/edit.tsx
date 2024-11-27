import { useEditProfile } from "@/api/mutations/users";
import { useSession } from "@/components/common/AuthContext";
import { FloatingButton } from "@/components/common/FloatingButton";
import { ImageInput } from "@/components/common/ImageInput";
import { IconCamera } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Modal, Portal, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from 'yup';

const EditProfileSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
});

export default function EditProfileScreen() {
    const [openedModal, setOpenedModal] = useState(false);
    const { session, updateSession } = useSession();

    const editProfile = useEditProfile();

    useEffect(() => {
        if (!session) {
            router.navigate("/(auth)/login");
        }
    }, [session]);

    const onSubmit = async (values: Yup.InferType<typeof EditProfileSchema>) => {
        try {
            console.log("Edit profile...", values)

            const user = await editProfile.mutateAsync(values);

            updateSession({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            });

            router.replace("/(tabs)/profile")
        } catch (error) {
            console.log("Error creating user", error)
        }
    }

    if (!session) return;

    const user = session.user;

    return (
        <SafeAreaView style={styles.container}>
            <Formik
                initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName || "",
                    email: user.email,
                }}
                validationSchema={EditProfileSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.content}>
                        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                            <View style={styles.header}>
                                <Text variant="titleMedium">Editar perfil</Text>
                                <TouchableOpacity style={styles.imageContainer}>
                                    <Image
                                        style={styles.image}
                                        source={{
                                            uri: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
                                        }}
                                    />
                                    <View style={styles.imageOverlay}>
                                        <IconCamera size={30} color="#323232" />
                                    </View>
                                </TouchableOpacity>

                                <IconButton
                                    icon="chevron-left"
                                    iconColor="#5F19F2"
                                    size={40}
                                    style={{ position: "absolute", top: 0, left: 0 }}
                                    onPress={() => setOpenedModal(true)}
                                />
                            </View>


                            <View style={styles.section}>
                                <TextInput
                                    label={<Text>Nombre</Text>}
                                    placeholder="John"
                                    placeholderTextColor="#B0B0B0"
                                    outlineColor="#B0B0B0"
                                    activeOutlineColor="black"
                                    textColor="black"
                                    mode="outlined"
                                    outlineStyle={{ borderRadius: 8 }}
                                    style={styles.input}
                                    onBlur={handleBlur('firstName')}
                                    onChangeText={handleChange('firstName')}
                                    value={values.firstName}
                                    error={touched.firstName && errors.firstName ? true : false}
                                />

                                <TextInput
                                    label={<Text>Apellido</Text>}
                                    placeholder="Doe"
                                    placeholderTextColor="#B0B0B0"
                                    outlineColor="#B0B0B0"
                                    activeOutlineColor="black"
                                    textColor="black"
                                    mode="outlined"
                                    outlineStyle={{ borderRadius: 8 }}
                                    style={styles.input}
                                    onBlur={handleBlur('lastName')}
                                    onChangeText={handleChange('lastName')}
                                    value={values.lastName}
                                    error={touched.lastName && errors.lastName ? true : false}
                                />

                                <TextInput
                                    label={<Text>Email</Text>}
                                    placeholder="johndoe@mail.com"
                                    placeholderTextColor="#B0B0B0"
                                    outlineColor="#B0B0B0"
                                    activeOutlineColor="black"
                                    textColor="black"
                                    mode="outlined"
                                    outlineStyle={{ borderRadius: 8 }}
                                    style={styles.input}
                                    onBlur={handleBlur('email')}
                                    onChangeText={handleChange('email')}
                                    value={values.email}
                                    error={touched.email && errors.email ? true : false}
                                />
                            </View>

                        </ScrollView>


                        <Portal>
                            <Modal visible={openedModal} onDismiss={() => setOpenedModal(false)} contentContainerStyle={styles.modal}>
                                <View style={styles.form}>
                                    <Text variant="titleMedium">Adjunta una imagen</Text>

                                    <ImageInput />

                                    <TouchableOpacity
                                        style={styles.buttonForm}
                                        onPress={() => {
                                            setOpenedModal(false)

                                            router.replace("/(tabs)/profile")
                                        }}>
                                        <Text variant="bodyLarge" style={styles.buttonFormText}>Guardar</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </Portal>

                        <FloatingButton label="Guardar" onPress={() => handleSubmit()} />
                    </View>
                )}
            </Formik>
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
        marginTop: 10,
    },
    imageContainer: {
        position: "relative",
        width: 80,
        height: 80,
        borderRadius: 50,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageOverlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(240,240,240,0.4)",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        marginBottom: 10,
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