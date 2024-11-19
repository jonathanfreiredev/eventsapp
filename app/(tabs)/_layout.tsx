import { useAppTheme } from '@/hooks/useAppTheme';
import { IconCategory, IconHome, IconUser } from '@tabler/icons-react-native';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native-paper';

export default function TabLayout() {
  const theme = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: '#CCCCCC',
        tabBarActiveTintColor: 'white',
        tabBarIconStyle: {
          color: "white",
          marginVertical: "auto",
        },
        tabBarLabel: ({ focused, children }) => {
          return (
            <Text style={{ color: focused ? 'white' : '#CCCCCC', fontSize: focused ? 11 : 10 }}>
              {children}
            </Text>
          )
        },
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          paddingVertical: 10,
          height: 60,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) =>
            <IconHome size={focused ? 27 : 24} color={focused ? 'white' : '#CCCCCC'} />
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categorías',
          tabBarIcon: ({ focused }) =>
            <IconCategory size={focused ? 27 : 24} color={focused ? 'white' : '#CCCCCC'} />
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Eventos',
          tabBarIcon: ({ focused }) =>
            <IconCategory size={focused ? 27 : 24} color={focused ? 'white' : '#CCCCCC'} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          
          tabBarIcon: ({ focused }) =>
            <IconUser size={focused ? 27 : 24} color={focused ? 'white' : '#CCCCCC'} />
        }}
      />
    </Tabs>
  );
}
