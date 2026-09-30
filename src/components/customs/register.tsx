import { useRegister } from '@/hooks/useAuth';
import { RegisterRequest } from '@/schemas';
import { isValidEmail, isValidPassword } from '@/utils/validator';
import { useState } from 'react';
import { View, Text } from 'react-native';
import Card from '../Card';
import Button from '../Button';
import TextInput from '../TextInput';

export default function Register() {
  // State
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');

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

    register(registerData);
  };

  const handleEmailBlur = () => {
    setEmailError(isValidEmail(email) ? '' : 'Enter a valid email address.');
  };

  const handlePasswordBlur = () => {
    setPasswordError(isValidPassword(password) ? '' : 'Enter a valid password.');
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Card className="w-1/2">
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
            placeholder="Enter your display name..."
            value={displayName}
            onChangeText={setDisplayName}
          />
          <Button
            title={isRegisterPending ? 'Registering...' : 'Register'}
            buttonClassName="self-center w-1/2 mt-4"
            disabled={isRegisterDisabled()}
            onPress={handleRegister}
          />
          {isRegisterError ? (
            <View>
              <Text>{registerError?.title}</Text>
              <Text>{registerError?.message}</Text>
            </View>
          ) : null}
        </View>
      </Card>
    </View>
  );
}
