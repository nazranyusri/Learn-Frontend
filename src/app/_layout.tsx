import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ActivityIndicator, View } from 'react-native';
import { queryClient } from '@/utils';
import '../../global.css';
import { useAuthStore } from '@/stores';
import { toastConfig } from '@/utils/toastConfig';
import Toast from 'react-native-toast-message';
// import { useToastStore } from '@/stores/toastStore'; // Example global store for toasts

export default function RootLayout() {
  const { isAuthenticated, hasHydrated } = useAuthStore();

  // If you use a global store (like Zustand), pull current toast state here:
  // const { visible, variant, title, message } = useToastStore();

  return (
    <QueryClientProvider client={queryClient}>
      <View className="flex-1 bg-core-bg">
        {!hasHydrated ? (
          <View className="flex-1 items-center justify-center">
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

        <Toast config={toastConfig} position="top" />
      </View>
    </QueryClientProvider>
  );
}
