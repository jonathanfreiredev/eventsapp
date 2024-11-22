import { Stack } from 'expo-router';

export default function EventsLayout() {
  return <Stack
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="index" />
    <Stack.Screen name="edit" />
    <Stack.Screen name="participants" />
    <Stack.Screen name="comments" />
  </Stack>;
}
