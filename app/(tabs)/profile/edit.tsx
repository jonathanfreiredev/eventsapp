import { IconCamera } from "@tabler/icons-react-native";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
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
                            onPress={() => router.replace("/(tabs)/profile")}
                        />
                    </View>

                    <View style={styles.section}>
                        <TextInput
                            label={<Text>Nombre completo</Text>}
                            placeholder="John Doe"
                            placeholderTextColor="#B0B0B0"
                            outlineColor="#B0B0B0"
                            activeOutlineColor="black"
                            textColor="black"
                            mode="outlined"
                            outlineStyle={{ borderRadius: 8 }}
                            style={styles.input}
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
                        />
                    </View>
                </ScrollView>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.replace("/(tabs)/profile")}>
                    <Text variant="bodyLarge" style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
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