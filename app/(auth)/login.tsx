import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Bienvenido de nuevo! 👋</Text>

      <View style={styles.form}>
        <TextInput
          label={<Text style={{ color: "#FFFFFF" }}>Email</Text>}
          placeholder="johndoe@mail.com"
          placeholderTextColor="#B0B0B0"
          outlineColor="#313E55"
          activeOutlineColor="#FFFFFF"
          textColor="#FFFFFF"
          mode="outlined"
          outlineStyle={{ borderRadius: 8 }}
          style={styles.input}
          theme={{
            colors: {
              background: "#313E55",
            },
          }}
        />
        <TextInput
          label={<Text style={{ color: "#FFFFFF" }}>Contraseña</Text>}
          placeholder="********"
          secureTextEntry={!passwordVisible}
          right={
            <TextInput.Icon
              size={24}
              color="#A0A0A0"
              icon={passwordVisible ? "eye-off" : "eye"}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
          placeholderTextColor="#B0B0B0"
          outlineColor="#313E55"
          activeOutlineColor="#FFFFFF"
          textColor="#FFFFFF"
          mode="outlined"
          style={styles.input}
          outlineStyle={{ borderRadius: 8 }}
          theme={{
            colors: {
              background: "#313E55",
            },
          }}
        />

        <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/(tabs)")}>
          <Text style={styles.loginButtonText}>Accede a la app</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
          <Text style={styles.signupText}>
            ¿Todavía no tienes una cuenta?{" "}
            <Text style={styles.signupLink}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202936",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 50,
  },
  instruction: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 30,
    lineHeight: 24,
  },
  form: {
    width: "90%",
    marginBottom: 30,
  },
  input: {
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#6200ee",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginVertical: 20,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signupText: {
    color: "#B0B0B0",
    fontSize: 16,
    textAlign: "center",
  },
  signupLink: {
    color: "#6200ee",
    textDecorationLine: "underline",
  },
});