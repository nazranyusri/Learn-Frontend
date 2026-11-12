import { useState } from 'react';
import { View, Text } from 'react-native';
import Layout from '@/components/Layout';
import TextInput from '@/components/TextInput';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Switch from '@/components/Switch';
import { accountTypes } from '@/constants';
import Selector from '@/components/Selector';
import { useAddAccount } from '@/hooks/useAccount';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { AddAccountResponse } from '@/schemas';
import BasicHeader from '@/components/BasicHeader';

export default function AddAccountScreen() {
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState('BANK');
  const [openingBalance, setOpeningBalance] = useState('');
  const [isSavingsAccount, setIsSavingsAccount] = useState(false);

  // Validation error states
  const [nameError, setNameError] = useState('');
  const [balanceError, setBalanceError] = useState('');

  // Pass onSuccess and onError directly into the hook here!
  const { addAccount, isAddAccountPending } = useAddAccount({
    onSuccess: (data: AddAccountResponse) => {
      Toast.show({
        type: 'success',
        text1: 'Account Created',
        text2: `${data.accountName} has been added successfully.`,
      });
      setName('');
      setOpeningBalance('');
      setIsSavingsAccount(false);
      setAccountType('BANK');
      router.replace('/accounts');
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: 'Failed to Add Account',
        text2: error?.message || 'Please check your connection and try again.',
      });
    },
  });

  const handleSubmit = () => {
    let isValid = true;
    setNameError('');
    setBalanceError('');

    if (!name.trim()) {
      setNameError('Account name is required');
      isValid = false;
    }

    if (!openingBalance.trim()) {
      setBalanceError('Opening balance is required');
      isValid = false;
    } else if (isNaN(Number(openingBalance))) {
      setBalanceError('Please enter a valid number');
      isValid = false;
    }

    if (!isValid) return;

    addAccount({
      accountName: name.trim(),
      accountType,
      openingBalance: parseFloat(openingBalance),
      isSavingsAccount,
    });
  };

  return (
    <Layout>
      <BasicHeader defaultBackRoute='/accounts' />
      <View className="gap-4">
        <View>
          <Text className="text-3xl font-bold text-text-primary">
            Add new account
          </Text>
          <Text className="text-text-secondary text-sm mt-1">
            Create a new account to track your finances
          </Text>
        </View>

        {/* Form Container Card */}
        <Card className="gap-5">
          {/* Account Name Field */}
          <View className="gap-2">
            <Text className="text-text-primary text-sm font-medium">
              Account Name <Text className="text-bear">*</Text>
            </Text>
            <TextInput
              placeholder="e.g. Maybank"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (text.trim()) setNameError('');
              }}
              errorMessage={nameError}
            />
          </View>

          {/* Account Type Selector */}
          <View className="gap-2">
            <Text className="text-text-primary text-sm font-medium">
              Account Type <Text className="text-bear">*</Text>
            </Text>
            <Selector
              options={accountTypes}
              selectedValue={accountType}
              onSelect={(val: string) => setAccountType(val)}
            />
          </View>

          {/* Opening Balance Field */}
          <View className="gap-2">
            <Text className="text-text-primary text-sm font-medium">
              Opening Balance (RM) <Text className="text-bear">*</Text>
            </Text>
            <TextInput
              placeholder="0.00"
              value={openingBalance}
              onChangeText={(text) => {
                setOpeningBalance(text);
                if (text.trim()) setBalanceError('');
              }}
              errorMessage={balanceError}
            />
          </View>

          {/* Savings Account Toggle */}
          <Switch
            label="Savings Account"
            description="Mark this as a dedicated savings account"
            value={isSavingsAccount}
            onValueChange={setIsSavingsAccount}
          />

          {/* Submit Button */}
          <View className="mt-2">
            <Button
              variant="primary"
              title={isAddAccountPending ? 'Creating...' : 'Create Account'}
              isFullWidth
              onPress={handleSubmit}
              disabled={isAddAccountPending}
            />
          </View>
        </Card>
      </View>
    </Layout>
  );
}
