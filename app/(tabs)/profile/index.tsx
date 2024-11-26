import { useSession } from "@/components/common/AuthContext";
import { AppLayout } from "@/components/layouts/AppLayout";
import { ProfileActionButton } from "@/components/profile/ProfileActionButton";
import { IconBookmark, IconLogout, IconPlus, IconUser } from "@tabler/icons-react-native";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function ProfileScreen() {
  const { signOut } = useSession();

  return (
    <AppLayout>
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
          <ProfileActionButton icon={IconLogout} text="Cerrar sesión" variant="red" onPress={() => signOut()} />
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    gap: 15,
    marginTop: 20,
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
});