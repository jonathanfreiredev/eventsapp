import { useSignup } from "@/api/mutations/users";
import { useSession } from "@/components/common/AuthContext";
import AuthLayout from "@/components/layouts/AuthLayout";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
});

export default function Signup() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { signIn } = useSession();

    const signup = useSignup();

    return (
        <AuthLayout>
            <Text style={styles.greeting}>Hola! 👋</Text>
            <Text style={styles.instruction}>Introduce los siguientes datos para registrarte</Text>

            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    try {
                        console.log("Creating user...")
                        const createdUser = await signup.mutateAsync(values);

                        signIn(createdUser);
                    } catch (error) {
                        console.log("Error creating user", error)
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.form}>
                        <TextInput
                            label={<Text style={{ color: "#FFFFFF" }}>Nombre</Text>}
                            placeholder="John Doe"
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
                            onBlur={handleBlur('firstName')}
                            onChangeText={handleChange('firstName')}
                            value={values.firstName}
                            error={touched.firstName && errors.firstName ? true : false}
                        />

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
                            <Text style={styles.loginButtonText}>
                                Crear cuenta
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                            <Text style={styles.loginText}>
                                ¿Ya tienes una cuenta?{" "}
                                <Text style={styles.loginLink}>Iniciar sesión</Text>
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
        marginBottom: 20,
    },
    instruction: {
        fontSize: 16,
        color: "#FFFFFF",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 30,
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
    loginText: {
        color: "#B0B0B0",
        fontSize: 16,
        textAlign: "center",
    },
    loginLink: {
        color: "#6200ee",
        textDecorationLine: "underline",
    },
});