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
        <Stack>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
      )}
    </QueryClientProvider>
  );
}
