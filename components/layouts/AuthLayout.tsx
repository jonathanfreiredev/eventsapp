import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../common/AuthContext";
import { ActivityIndicator } from "react-native-paper";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    const { session, isLoading } = useSession();

    useEffect(() => {
        if (!isLoading && session) {
            router.navigate("/(tabs)?category=music");
        }
    }, [session, isLoading]);

    if (isLoading) {
        return <ActivityIndicator animating={true} />;
    }

    return <SafeAreaView style={styles.container}>
        {children}
    </SafeAreaView>
}

export default AuthLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#202936",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
});