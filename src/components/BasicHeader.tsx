import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface BasicHeaderProps {
  title?: string;
  onBackPress?: () => void;
  defaultBackRoute?: string;
  rightElement?: React.ReactNode;
}

export default function BasicHeader({
  title,
  onBackPress,
  defaultBackRoute,
  rightElement,
}: BasicHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (defaultBackRoute) {
      router.push(defaultBackRoute as any);
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-row items-center justify-between pb-3 mb-2">
      {/* Back Button */}
      <TouchableOpacity onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Optional Title */}
      {title ? (
        <Text
          className="text-base font-bold text-text-primary flex-1 text-center mx-4"
          numberOfLines={1}
        >
          {title}
        </Text>
      ) : (
        <View className="flex-1" />
      )}

      {/* Optional Right Action/Element (or structural spacer for centering) */}
      {rightElement ? <View>{rightElement}</View> : <View className="w-10" />}
    </View>
  );
}
