import AuthLayout from '@/components/layouts/AuthLayout';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  return (
    <AuthLayout>
      <View style={styles.logoView}>
        <Image
          source={require('@/assets/images/events-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Planes increíbles para disfrutar con gente</Text>
        <Text style={styles.subtitle}>Crea eventos o participa en los de otras personas</Text>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={() => router.push("/(auth)/signup")}>
        <Text style={styles.registerButtonText}>Regístrate gratis</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.loginText}>Inicia sesión</Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  logoView: {
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 50,
  },
  content: {
    marginHorizontal: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  registerButton: {
    backgroundColor: '#5F19F2',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});