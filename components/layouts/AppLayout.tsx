import { Image, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Avatar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../common/AuthContext";
import { useEffect } from "react";
import { router } from "expo-router";

interface AppLayoutProps {
    children: React.ReactNode;
    showHeader?: boolean;
}

export const AppLayout = ({ children, showHeader = false }: AppLayoutProps) => {
    const { session, isLoading } = useSession();

    useEffect(() => {
        if (!isLoading && !session) {
            router.navigate("/(auth)/login");
        }
    }, [session, isLoading]);

    if (isLoading) {
        return <ActivityIndicator animating={true} />;
    }

    if (!session) {
        return <Text variant="bodyLarge">
        You need to be logged in to access this page
      </Text>
    }

    const user = session.user;

    return <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {!!showHeader && <View style={styles.header}>
                <Image
                    source={require("@/assets/images/events-dark-logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                {user.image ? <Avatar.Image
                    size={50}
                    source={{
                        uri: user.image,
                    }}
                /> : <Avatar.Text size={50} label={`${user.firstName[0]}${user.lastName[0] || ""}`} />}
            </View>}

            {children}
        </ScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logo: {
        width: 150,
        height: 60,
    },
});