import { Stack } from 'expo-router';

export default function EventsLayout() {
  return <Stack
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="index" />
    <Stack.Screen name="created" />
    <Stack.Screen name="[eventId]" />
    <Stack.Screen name="create" />
  </Stack>;
}
