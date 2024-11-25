import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Avatar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface AppLayoutProps {
    children: React.ReactNode;
    showHeader?: boolean;
}

export const AppLayout = ({ children, showHeader = false }: AppLayoutProps) => {
    return <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {!!showHeader && <View style={styles.header}>
                <Image
                    source={require("@/assets/images/events-dark-logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Avatar.Image
                    size={50}
                    source={{
                        uri: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
                    }}
                />
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