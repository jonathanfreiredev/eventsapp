import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "../common/AuthContext";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    const { session } = useSession();

    useEffect(() => {
        if (session) {
            router.navigate("/(tabs)?category=music");
        }
    }, [session]);

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