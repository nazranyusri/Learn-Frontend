import { View, Text } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';

export const toastConfig = {
  success: ({ text1, text2 }: BaseToastProps) => (
    <View className="w-[90%] bg-core-surface border border-bull rounded-xl p-4 shadow-lg">
      <Text className="text-bull text-sm font-bold">{text1}</Text>
      {text2 ? (
        <Text className="text-text-secondary text-xs mt-0.5">{text2}</Text>
      ) : null}
    </View>
  ),
  error: ({ text1, text2 }: BaseToastProps) => (
    <View className="w-[90%] bg-core-surface border border-bear rounded-xl p-4 shadow-lg">
      <Text className="text-bear text-sm font-bold">{text1}</Text>
      {text2 ? (
        <Text className="text-text-secondary text-xs mt-0.5">{text2}</Text>
      ) : null}
    </View>
  ),
  info: ({ text1, text2 }: BaseToastProps) => (
    <View className="w-[90%] bg-core-surface border border-accent-primary rounded-xl p-4 shadow-lg">
      <Text className="text-accent-primary text-sm font-bold">{text1}</Text>
      {text2 ? (
        <Text className="text-text-secondary text-xs mt-0.5">{text2}</Text>
      ) : null}
    </View>
  ),
};
