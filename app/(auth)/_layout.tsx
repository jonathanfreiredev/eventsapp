import { useAppTheme } from '@/hooks/useAppTheme';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  const theme = useAppTheme();

  return <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="login" />
    <Stack.Screen name="signup" />
  </Stack>
}
