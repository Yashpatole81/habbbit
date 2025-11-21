import { Colors } from '@/constants/Colors';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  initialRouteName: 'index',
};

import { HabitProvider } from '@/context/HabitContext';
import { UserProvider } from '@/context/UserContext';

export default function RootLayout() {
  return (
    <HabitProvider>
      <UserProvider>
        <ThemeProvider value={DarkTheme}>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.background } }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="add-habit" options={{ presentation: 'modal' }} />
            <Stack.Screen name="edit-habit/[id]" options={{ presentation: 'modal' }} />
            <Stack.Screen name="onboarding/avatar" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding/details" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="light" />
        </ThemeProvider>
      </UserProvider>
    </HabitProvider>
  );
}
