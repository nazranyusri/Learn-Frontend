import { useRegister } from '@/hooks/useAuth';
import { RegisterRequest } from '@/schemas';
import {
  isValidDisplayName,
  isValidEmail,
  isValidPassword,
} from '@/utils/validator';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Text } from 'react-native';
import Button from '../Button';
import TextInput from '../TextInput';
import GradientCard from '../GradientCard';

export default function Register() {
  // State
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [isPasswordMatched, setIsPasswordMatched] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>('');
  const [displayNameError, setDisplayNameError] = useState<string>('');

  const isRegisterDisabled = () => {
    return (
      isRegisterPending ||
      email === '' ||
      password === '' ||
      displayName === '' ||
      emailError !== '' ||
      passwordError !== ''
    );
  };

  // Hooks
  const { register, isRegisterPending, isRegisterError, registerError } =
    useRegister();

  const handleRegister = () => {
    const registerData: RegisterRequest = {
      email,
      password,
      displayName,
    };

    register(registerData, {
      onSuccess: () => router.replace('/'),
    });
  };

  const handleEmailBlur = () => {
    setEmailError(isValidEmail(email) ? '' : 'Enter a valid email address');
  };

  const handlePasswordBlur = () => {
    setPasswordError(
      isValidPassword(password)
        ? ''
        : 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
    );
  };

  const verifyConfirmPassword = () => {
    const passwordsMatched =
      password === confirmPassword && password !== '' && confirmPassword !== '';
    const passwordIsEmpty = password === '' || confirmPassword === '';
    setIsPasswordMatched(passwordsMatched);
    setConfirmPasswordError(
      passwordsMatched || passwordIsEmpty ? '' : 'Passwords do not match',
    );
  };

  const handleDisplayNameBlur = () => {
    setDisplayNameError(
      isValidDisplayName(displayName)
        ? ''
        : 'Display name must be at least 3 characters long and contain only letters (no special characters, numbers, or spaces)',
    );
  };

  return (
    <View className="flex-1 items-center justify-center">
      <GradientCard className="min-w-1/2">
        <View className="flex-1 gap-4">
          <TextInput
            placeholder="Enter your email..."
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              setEmailError('');
            }}
            onBlur={handleEmailBlur}
            errorMessage={emailError}
          />
          <TextInput
            placeholder="Enter your password..."
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              setPasswordError('');
            }}
            onBlur={handlePasswordBlur}
            errorMessage={passwordError}
            secureTextEntry
          />
          <TextInput
            placeholder="Re-enter your password..."
            value={confirmPassword}
            onChangeText={(value) => {
              setConfirmPassword(value);
              setConfirmPasswordError('');
            }}
            onBlur={verifyConfirmPassword}
            successMessage={isPasswordMatched ? 'Passwords match' : undefined}
            errorMessage={confirmPasswordError}
            secureTextEntry
          />
          <TextInput
            placeholder="Enter your display name..."
            value={displayName}
            onChangeText={(value) => {
              setDisplayName(value);
              setDisplayNameError('');
            }}
            onBlur={handleDisplayNameBlur}
            errorMessage={displayNameError}
          />
          <Button
            title={isRegisterPending ? 'Registering...' : 'Register'}
            buttonClassName="self-center w-1/2 mt-4"
            disabled={isRegisterDisabled()}
            onPress={handleRegister}
          />
          {isRegisterError ? (
            <View>
              <Text className="text-bear">{registerError?.title}</Text>
              <Text className="text-bear">{registerError?.detail}</Text>
            </View>
          ) : null}
        </View>
      </GradientCard>
    </View>
  );
}
