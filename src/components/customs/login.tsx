import { useLogin } from '@/hooks';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text } from 'react-native';
import Button from '../Button';
import TextInput from '../TextInput';
import GradientCard from '../GradientCard';

export default function Login() {
  // States
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isLoginDisabled = () => {
    return email === '' || password === '' || isLoginPending;
  };

  // Hooks
  const { login, isLoginPending, isLoginError, loginError } = useLogin();

  // Function
  const handleLogin = () => {
    login({ email, password });
  };

  const handlePressRegister = () => {
    // Implement register logic here
    router.push('/register');
  };

  return (
    <View className="flex-1 items-center justify-center">
      <GradientCard className="w-1/2">
        <View className="flex-1">
          <View className="flex-1 gap-4">
            <TextInput
              placeholder="Enter your email..."
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Enter your password..."
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {isLoginError ? (
              <Text className="text-bear">{loginError?.message}</Text>
            ) : null}
            <Button
              title={isLoginPending ? 'Logging in...' : 'Login'}
              buttonClassName="self-center w-1/2 mt-4"
              disabled={isLoginDisabled()}
              onPress={handleLogin}
            />
            <Button
              variant="link"
              buttonClassName="self-center"
              title="Didn't have an account? Register"
              onPress={handlePressRegister}
            />
          </View>
        </View>
      </GradientCard>
    </View>
  );
}
