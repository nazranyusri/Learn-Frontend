import { Text, TextInput as RNTextInput, View } from 'react-native';

interface TextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  errorMessage?: string;
}

export default function TextInput({
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry = false,
  errorMessage,
}: TextInputProps) {
  return (
    <View>
      <RNTextInput
        className="h-12 rounded-lg border border-core-stroke bg-core-input px-4 text-text-primary"
        placeholder={placeholder}
        placeholderTextColor="#848E9C"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
      />
      {errorMessage ? (
        <Text className="pt-2 text-sm text-bear">{errorMessage}</Text>
      ) : undefined}
    </View>
  );
}
