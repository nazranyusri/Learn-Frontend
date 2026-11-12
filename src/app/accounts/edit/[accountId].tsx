import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import Layout from '@/components/Layout';
import BasicHeader from '@/components/BasicHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { AccountType } from '@/schemas/account';
import { accountTypes } from '@/constants';
import { useAccountById } from '@/hooks/useAccount';
import Selector from '@/components/Selector';
import Switch from '@/components/Switch';
import TextInput from '@/components/TextInput';

export default function EditAccountScreen() {
  const router = useRouter();
  const { accountId } = useLocalSearchParams<{ accountId: string }>();
  const { accountData } = useAccountById(accountId);

  // Form States
  const [name, setName] = useState<string>(accountData?.accountName || '');
  const [accountType, setAccountType] = useState<AccountType>('BANK');
  const [isSavingsAccount, setIsSavingsAccount] = useState<boolean>(
    accountData?.isSavingsAccount || false,
  );
  const [isActive, setIsActive] = useState<boolean>(
    accountData?.isSavingsAccount || false,
  );
  const [nameError, setNameError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Account name cannot be empty.',
      });
      return;
    }
  };

  return (
    <Layout>
      <BasicHeader defaultBackRoute={`/accounts/${accountId}`} />

      <ScrollView
        className="flex-1 w-full"
        contentContainerClassName="pb-24 pt-2"
        showsVerticalScrollIndicator={true}
        indicatorStyle="white"
      >
        {/* Header Title */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-text-primary">
            Edit Account
          </Text>
          <Text className="text-text-secondary text-sm mt-1">
            Update your account configurations and balance parameters
          </Text>
        </View>

        <View className="gap-6">
          {/* Form Card */}
          <Card className="bg-core-surface border-core-stroke gap-5">
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
                value={accountData?.openingBalance || '0.00'}
                editable={false}
              />
            </View>

            {/* Savings Account Toggle */}
            <Switch
              label="Savings Account"
              description="Mark this as a dedicated savings account"
              value={isSavingsAccount}
              onValueChange={setIsSavingsAccount}
            />

            {/* Active Status Toggle */}
            <Switch
              label="Account Active"
              description="Inactive accounts are hidden from transaction dropdown
                  selectors"
              value={isActive}
              onValueChange={setIsActive}
            />
          </Card>

          {/* Action Buttons */}
          <View className="gap-3">
            <Button
              variant="primary"
              title="Save Changes"
              onPress={handleSubmit}
              isFullWidth
              // disabled={isLoading}
            />

            <Button
              variant="secondary"
              title="Cancel"
              onPress={() => router.back()}
              isFullWidth
              // disabled={isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
