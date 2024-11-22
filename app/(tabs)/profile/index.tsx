import { ProfileActionButton } from "@/components/profile/ProfileActionButton";
import { IconBookmark, IconLogout, IconPlus, IconUser } from "@tabler/icons-react-native";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="titleMedium">Mi perfil</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
              }}
            />
          </View>
          <Text variant="labelLarge">Jonathan Freire</Text>
        </View>

        <View style={styles.section}>
          <ProfileActionButton icon={IconUser} text="Editar perfil" onPress={() => router.replace("/(tabs)/profile/edit")} />
          <ProfileActionButton icon={IconPlus} text="Crear un evento" onPress={() => router.replace("/(tabs)/events/create")} />
          <ProfileActionButton icon={IconBookmark} text="Eventos favoritos" onPress={() => router.replace("/(tabs)/profile/events-favourites")} />
          <ProfileActionButton icon={IconLogout} text="Cerrar sesión" variant="red" onPress={() => router.replace("/login")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
    gap: 20,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    gap: 15,
    marginTop: 20,
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
  }
});