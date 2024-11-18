import { IconCategory, IconCategoryFilled, IconHome, IconHomeFilled } from '@tabler/icons-react-native';
import { Tabs } from 'expo-router';
import React from 'react';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#CCCCCC',
        tabBarIconStyle: {
          width: 24,
          height: 24,
          color: '#FFFFFF',
        },
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => focused ?
            <IconHomeFilled size={24} color={theme.colors.background} />
            :
            <IconHome size={24} />
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categorías',
          tabBarIcon: ({ focused }) => focused ?
            <IconCategoryFilled size={24} color={theme.colors.background} />
            :
            <IconCategory size={24} />
        }}
      />
    </Tabs>
  );
}
