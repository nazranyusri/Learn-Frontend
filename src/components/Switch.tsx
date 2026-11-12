import { Switch as RNSwitch, View, Text } from 'react-native';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export default function Switch({
  value,
  onValueChange,
  label,
  description,
  disabled = false,
}: SwitchProps) {
  return (
    <View className="flex-row justify-between items-center bg-core-input border border-core-stroke rounded-xl px-4 py-3.5">
      {(label || description) && (
        <View className="flex-1 pr-4">
          {label && (
            <Text className="text-text-primary text-sm font-medium">
              {label}
            </Text>
          )}
          {description && (
            <Text className="text-text-secondary text-xs mt-0.5">
              {description}
            </Text>
          )}
        </View>
      )}
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        // Custom colors matching your theme tokens
        trackColor={{ false: '#2A3241', true: '#3182CE' }} // core-stroke vs accent-primary
        thumbColor={value ? '#EAECEF' : '#848E9C'}        // text-primary vs text-secondary
        ios_backgroundColor="#2A3241"
      />
    </View>
  );
}