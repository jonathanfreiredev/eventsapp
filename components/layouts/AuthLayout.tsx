import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
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