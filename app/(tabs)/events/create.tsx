import { CategoryTypeInput } from "@/components/common/CategoryTypeInput";
import { DateInput } from "@/components/common/DateInput";
import { NumberInput } from "@/components/common/NumberInput";
import { CategoryType } from "@/types/categories";
import { IconCamera } from "@tabler/icons-react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateEventScreen() {
    const [image, setImage] = useState<string | null>(null);
    const [category, setCategory] = useState<CategoryType>(CategoryType.Music);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [capacity, setCapacity] = useState(10);

    return (
        <SafeAreaView style={styles.container}>
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
                        />

                        <CategoryTypeInput category={category} setCategory={setCategory} />

                        <DateInput label="Fecha de inicio" date={startDate} setDate={setStartDate} />

                        <DateInput label="Fecha de finalización" date={endDate} setDate={setEndDate} />

                        <NumberInput value={capacity} setValue={setCapacity} />
                    </View>
                </ScrollView>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.replace("/(tabs)/profile")}>
                    <Text variant="bodyLarge" style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>


            </View >
        </SafeAreaView >
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
        marginBottom: 70,
    },
    header: {
        flexDirection: "column",
        alignItems: "center",
        gap: 15,
        marginTop: 20,
        paddingVertical: 20,
    },
    logo: {
        width: 150,
        height: 60,
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
    button: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#5F19F2",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});