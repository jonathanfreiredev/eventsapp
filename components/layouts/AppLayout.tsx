import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../common/AuthContext";
import { useEffect } from "react";
import { router } from "expo-router";

interface AppLayoutProps {
    children: React.ReactNode;
    showHeader?: boolean;
}

export const AppLayout = ({ children, showHeader = false }: AppLayoutProps) => {
    const { session } = useSession();

    useEffect(() => {
        if (!session) {
            router.replace("/(auth)/login");
        }
    }, [session]);

    if (!session) {
        return;
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
                        uri: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
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