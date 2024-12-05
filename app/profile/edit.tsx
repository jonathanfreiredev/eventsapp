import { useEditProfile } from "@/api/mutations/users";
import { useSession } from "@/components/common/AuthContext";
import { FloatingButton } from "@/components/common/FloatingButton";
import { ImageInput } from "@/components/common/ImageInput";
import { IconCamera } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Avatar, IconButton, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from 'yup';

const EditProfileSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    image: Yup.string().nullable(),
});

export default function EditProfileScreen() {
    const { session, isLoading, updateSession } = useSession();

    const editProfile = useEditProfile();

    useEffect(() => {
        if (!session && !isLoading) {
            router.navigate("/(auth)/login");
        }
    }, [session, isLoading]);

    const onSubmit = async (values: Yup.InferType<typeof EditProfileSchema>) => {
        try {
            console.log("Edit profile...")

            const userData = await editProfile.mutateAsync(values);

            updateSession({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                image: userData.image,
            });

            router.navigate("/(tabs)/profile")
        } catch (error) {
            console.log("Error creating user", error)
        }
    }

    if (isLoading) {
        return <ActivityIndicator animating={true} />;
    }

    if (!session) return <Text variant="bodyLarge">
        You need to be logged in to access this page
    </Text>

    const user = session.user;

    return (
        <SafeAreaView style={styles.container}>
            <Formik
                initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName || "",
                    email: user.email,
                    image: user.image,
                }}
                validationSchema={EditProfileSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.content}>
                        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                            <View style={styles.header}>
                                <Text variant="titleMedium">Editar perfil</Text>
                                <ImageInput
                                    name="profile-image"
                                    style={styles.imageContainer}
                                    onChange={handleChange('image')}
                                >
                                    {values.image ? <Avatar.Image
                                        style={styles.image}
                                        size={80}
                                        source={{
                                            uri: values.image,
                                        }}
                                    /> : <Avatar.Text
                                        style={styles.image}
                                        size={80}
                                        label={`${values.firstName[0]}${values.lastName[0] || ""}`}
                                    />}
                                    <View style={styles.imageOverlay}>
                                        <IconCamera size={30} color="#323232" />
                                    </View>
                                </ImageInput>

                                <IconButton
                                    icon="chevron-left"
                                    iconColor="#5F19F2"
                                    size={40}
                                    style={{ position: "absolute", top: 0, left: 0 }}
                                    onPress={() => router.navigate("/(tabs)/profile")}
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