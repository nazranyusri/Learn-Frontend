import { View, TouchableOpacity, Text } from 'react-native';

interface Option {
  label: string;
  value: string;
}

interface SelectGroupProps {
  options: Option[];
  selectedValue: string;
  onSelect: (value: any) => void;
}

export default function SelectGroup({
  options,
  selectedValue,
  onSelect,
}: SelectGroupProps) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        return (
          <TouchableOpacity
            key={String(option.value)}
            onPress={() => onSelect(option.value)}
            className={`px-3 py-2 rounded-lg border ${
              isSelected
                ? 'bg-accent-primary/20 border-accent-primary'
                : 'bg-core-elevation border-core-stroke'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                isSelected ? 'text-accent-primary' : 'text-text-secondary'
              }`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}