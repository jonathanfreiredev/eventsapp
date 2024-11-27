import { useLogin } from "@/api/mutations/users";
import { useSession } from "@/components/common/AuthContext";
import AuthLayout from "@/components/layouts/AuthLayout";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { signIn } = useSession();

  const login = useLogin();

  const onSubmit = async (values: Yup.InferType<typeof LoginSchema>) => {
    try {
      console.log("Logging in...")
      const user = await login.mutateAsync(values);

      signIn(user);
    } catch (error) {
      console.log("Error logging in", error)
    }
  }

  return (
    <AuthLayout>
      <Text style={styles.greeting}>Bienvenido de nuevo! 👋</Text>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
              value={values.email}
              error={touched.email && errors.email ? true : false}
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
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              value={values.password}
              error={touched.password && errors.password ? true : false}
            />

            <TouchableOpacity style={styles.loginButton} onPress={() => handleSubmit()}>
              <Text style={styles.loginButtonText}>Accede a la app</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
              <Text style={styles.signupText}>
                ¿Todavía no tienes una cuenta?{" "}
                <Text style={styles.signupLink}>Regístrate</Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
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