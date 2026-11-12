import { Text, TextInput as RNTextInput, View } from 'react-native';

interface TextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  successMessage?: string;
  errorMessage?: string;
  editable?: boolean;
}

export default function TextInput({
  placeholder,
  value,
  onChangeText,
  onBlur,
  secureTextEntry = false,
  successMessage,
  errorMessage,
  editable = true,
}: TextInputProps) {
  return (
    <View>
      <RNTextInput
        className="h-12 rounded-lg border border-core-stroke bg-core-input px-4 py-3 text-text-primary"
        placeholder={placeholder}
        placeholderTextColor="#848E9C"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
      {successMessage ? (
        <Text className="pt-2 text-sm text-bull">{successMessage}</Text>
      ) : undefined}
      {errorMessage ? (
        <Text className="pt-2 text-sm text-bear">{errorMessage}</Text>
      ) : undefined}
    </View>
  );
}
