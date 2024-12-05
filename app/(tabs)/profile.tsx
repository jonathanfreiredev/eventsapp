import { useSession } from "@/components/common/AuthContext";
import { AppLayout } from "@/components/layouts/AppLayout";
import { ProfileActionButton } from "@/components/profile/ProfileActionButton";
import { IconBookmark, IconLogout, IconPlus, IconUser } from "@tabler/icons-react-native";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Avatar, Text } from "react-native-paper";

export default function ProfileScreen() {
  const { session, isLoading, signOut } = useSession();

  if (isLoading) {
    return <ActivityIndicator animating={true} />;
  }

  if (!session) {
    return <Text variant="bodyLarge">
      You need to be logged in to access this page
    </Text>;
  }

  const user = session.user;

  return (
    <AppLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text variant="titleMedium">Mi perfil</Text>
          <View style={styles.imageContainer}>
            {user.image ? <Avatar.Image
              style={styles.image}
              size={80}
              source={{
                uri: user.image,
              }}
            /> : <Avatar.Text
              style={styles.image}
              size={80}
              label={`${user.firstName[0]}${user.lastName[0] || ""}`}
            />}
          </View>
          <Text variant="labelLarge">{user.firstName} {user.lastName}</Text>
        </View>

        <View style={styles.section}>
          <ProfileActionButton icon={IconUser} text="Editar perfil" onPress={() => router.navigate("/profile/edit")} />
          <ProfileActionButton icon={IconPlus} text="Crear un evento" onPress={() => router.navigate("/events/create")} />
          <ProfileActionButton icon={IconBookmark} text="Eventos favoritos" onPress={() => router.navigate("/profile/events-favourites")} />
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