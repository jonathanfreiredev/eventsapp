import { useCreateEvent } from "@/api/mutations/events";
import { useSession } from "@/components/common/AuthContext";
import { CategoryTypeInput } from "@/components/common/CategoryTypeInput";
import { DateInput } from "@/components/common/DateInput";
import { FloatingButton } from "@/components/common/FloatingButton";
import { NumberInput } from "@/components/common/NumberInput";
import { CategoryType } from "@/types/categories";
import { IconCamera } from "@tabler/icons-react-native";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from 'yup';

const CreateEventSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string(),
    startDate: Yup.date().required(),
    endDate: Yup.date().required(),
    capacity: Yup.number().required(),
    category: Yup.string().oneOf(Object.values(CategoryType)).required(),
    address: Yup.object().shape({
        street: Yup.string().required(),
        city: Yup.string().required(),
        zip: Yup.string().required(),
        country: Yup.string().required(),
    }).required(),
});

export default function CreateEventScreen() {
    const [image, setImage] = useState<string | null>(null);

    const createEvent = useCreateEvent();
    const { session } = useSession();

    useEffect(() => {
        if (!session) {
            router.navigate("/(auth)/login");
        }
    }, [session]);

    const onSubmit = async (values: Yup.InferType<typeof CreateEventSchema>) => {
        try {
            console.log("Creating event...", values);
            const event = await createEvent.mutateAsync({
                ...values,
                startDate: new Date(values.startDate),
                endDate: new Date(values.endDate),
                capacity: Number(values.capacity),
            });

            console.log("Event created:", event);

            router.replace("/(tabs)/profile")
        } catch (error) {
            console.error("Error creating event:", error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Formik
                initialValues={{
                    name: "",
                    description: "",
                    startDate: new Date(),
                    endDate: new Date(),
                    capacity: 10,
                    category: CategoryType.Music,
                    address: {
                        street: "",
                        city: "",
                        zip: "",
                        country: "España",
                    },
                }}
                validationSchema={CreateEventSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.content}>
                        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                            <View style={styles.header}>
                                <Text variant="titleMedium">Crear Evento</Text>
                                <TouchableOpacity style={styles.imageContainer}>
                                    {image ? <Image
                                        style={styles.image}
                                        source={{
                                            uri: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
                                        }}
                                    />
                                        :
                                        <View
                                            style={styles.imagePlaceholder}
                                        />}
                                    <View style={styles.imageOverlay}>
                                        <IconCamera size={30} color="#323232" />
                                    </View>
                                </TouchableOpacity>

                                <IconButton
                                    icon="chevron-left"
                                    iconColor="#5F19F2"
                                    size={40}
                                    style={{ position: "absolute", top: 0, left: 0 }}
                                    onPress={() => router.replace("/(tabs)/profile")}
                                />
                            </View>

                            <View style={styles.section}>
                                <TextInput
                                    label={<Text>Nombre del evento</Text>}
                                    placeholder="Encuentro musical"
                                    placeholderTextColor="#B0B0B0"
                                    outlineColor="#B0B0B0"
                                    activeOutlineColor="black"
                                    textColor="black"
                                    mode="outlined"
                                    outlineStyle={{ borderRadius: 8 }}
                                    style={styles.input}
                                    onBlur={handleBlur('name')}
                                    onChangeText={handleChange('name')}
                                    value={values.name}
                                    error={touched.name && errors.name ? true : false}
                                />

                                <TextInput
                                    label={<Text>Descripción</Text>}
                                    placeholder="Un evento para disfrutar con..."
                                    placeholderTextColor="#B0B0B0"
                                    outlineColor="#B0B0B0"
                                    activeOutlineColor="black"
                                    textColor="black"
                                    mode="outlined"
                                    outlineStyle={{ borderRadius: 8 }}
                                    style={styles.input}
                                    onBlur={handleBlur('description')}
                                    onChangeText={handleChange('description')}
                                    value={values.description}
                                    error={touched.description && errors.description ? true : false}
                                />

                                <TextInput
                                    label={<Text>Dirección</Text>}
                                    placeholder="Avenida de América"
                                    placeholderTextColor="#B0B0B0"
                                    outlineColor="#B0B0B0"
                                    activeOutlineColor="black"
                                    textColor="black"
                                    mode="outlined"
                                    outlineStyle={{ borderRadius: 8 }}
                                    style={styles.input}
                                    onBlur={handleBlur('address.street')}
                                    onChangeText={handleChange('address.street')}
                                    value={values.address.street}
                                    error={touched.address?.street && errors.address?.street ? true : false}
                                />

                                <View style={styles.locationInput}>
                                    <TextInput
                                        label={<Text>Ciudad</Text>}
                                        placeholder="Madrid"
                                        placeholderTextColor="#B0B0B0"
                                        outlineColor="#B0B0B0"
                                        activeOutlineColor="black"
                                        textColor="black"
                                        mode="outlined"
                                        outlineStyle={{ borderRadius: 8 }}
                                        style={{ flex: 2 }}
                                        onBlur={handleBlur('address.city')}
                                        onChangeText={handleChange('address.city')}
                                        value={values.address.city}
                                        error={touched.address?.city && errors.address?.city ? true : false}
                                    />

                                    <TextInput
                                        label={<Text>Código postal</Text>}
                                        placeholder="28002"
                                        placeholderTextColor="#B0B0B0"
                                        outlineColor="#B0B0B0"
                                        activeOutlineColor="black"
                                        textColor="black"
                                        mode="outlined"
                                        outlineStyle={{ borderRadius: 8 }}
                                        style={{ flex: 1 }}
                                        onBlur={handleBlur('address.zip')}
                                        onChangeText={handleChange('address.zip')}
                                        value={values.address.zip}
                                        error={touched.address?.zip && errors.address?.zip ? true : false}
                                    />
                                </View>

                                <CategoryTypeInput value={values.category} onChange={handleChange('category')} />

                                <DateInput label="Fecha de inicio" value={new Date(values.startDate)} onChange={(value) => handleChange('startDate')(value.toISOString())} />

                                <DateInput label="Fecha de finalización" value={new Date(values.endDate)} onChange={(value) => handleChange('endDate')(value.toISOString())} />

                                <NumberInput value={Number(values.capacity)} onChange={(value) => handleChange('capacity')(value.toString())} style={{ marginBottom: 70 }} />
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
    },
    scrollView: {
        width: "100%",
        height: "100%",
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
        width: 90,
        height: 90,
        borderRadius: 10,
        overflow: "hidden",
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
    locationInput: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 10,
    },
});