import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ActivityIndicator, View } from 'react-native';
import { queryClient } from '@/utils';
import '../../global.css';
import { useAuthStore } from '@/stores';

export default function RootLayout() {
  const { isAuthenticated, hasHydrated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      {!hasHydrated ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="index" />
            <Stack.Screen name="register" />
          </Stack.Protected>
        </Stack>
      )}
    </QueryClientProvider>
  );
}
