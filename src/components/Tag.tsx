import { View, Text } from 'react-native';

interface TagProps {
  variant: 'basic' | 'success' | 'failure';
  label: string;
}

export default function Tag({ variant, label }: TagProps) {
  const getContainerClasses = () => {
    let baseStyle = 'px-2.5 py-1 rounded-md items-center justify-center';
    switch (variant) {
      case 'success':
        return `${baseStyle} bg-bull-glow border border-bull`;
      case 'failure':
        return `${baseStyle} bg-bear-glow border border-bear`;
      case 'basic':
      default:
        return `${baseStyle} bg-core-elevation`;
    }
  };

  const getTextClasses = () => {
    let baseStyle = 'text-xs';
    switch (variant) {
      case 'success':
        return `${baseStyle} text-bull`;
      case 'failure':
        return `${baseStyle} text-bear`;
      case 'basic':
      default:
        return `${baseStyle} text-text-secondary`;
    }
  };

  return (
    <View className={getContainerClasses()}>
      <Text className={getTextClasses()}>{label}</Text>
    </View>
  );
}
