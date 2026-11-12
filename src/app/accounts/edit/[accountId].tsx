import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useLocalSearchParams, useRouter, Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import Layout from '@/components/Layout';
import BasicHeader from '@/components/BasicHeader';
import Card from '@/components/Card';
import Button from '@/components/Button';

// Account types matching your DB constraints
const ACCOUNT_TYPES = [
  { label: 'Bank Account', value: 'BANK' },
  { label: 'E-Wallet', value: 'EWALLET' },
  { label: 'Cash', value: 'CASH' },
  { label: 'Investment', value: 'INVESTMENT' },
  { label: 'Others', value: 'OTHERS' },
] as const;

type AccountType = (typeof ACCOUNT_TYPES)[number]['value'];

export default function EditAccountScreen() {
  const router = useRouter();
  const { accountId } = useLocalSearchParams<{ accountId: string }>();

  // Form States
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState<AccountType>('BANK');
  const [openingBalance, setOpeningBalance] = useState('');
  const [isSavingsAccount, setIsSavingsAccount] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Load existing account data (simulated fetch based on your database payload)
  useEffect(() => {
    // In production, fetch this via your useAccount(accountId) query hook
    if (accountId) {
      setName('Maybank Nazran');
      setAccountType('CASH');
      setOpeningBalance('70.00');
      setIsSavingsAccount(true);
      setIsActive(true);
    }
  }, [accountId]);

  const handleUpdate = () => {
    // Validation
    if (!name.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Account name cannot be empty.',
      });
      return;
    }

    if (!openingBalance || isNaN(Number(openingBalance)) || Number(openingBalance) < 0) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter a valid positive opening balance.',
      });
      return;
    }

    setIsLoading(true);

    // Simulate API update mutation request
    setTimeout(() => {
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Account details updated successfully.',
      });

      // Navigate back to the detail view
      router.back();
    }, 600);
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
            
            {/* Account Name */}
            <View className="gap-2">
              <Text className="text-text-secondary text-xs uppercase tracking-wider font-medium">
                Account Name *
              </Text>
              <TextInput
                className="w-full bg-core-background border border-core-stroke rounded-xl px-4 py-3.5 text-text-primary font-medium text-base font-sans"
                placeholder="e.g. Maybank, Touch 'n Go"
                placeholderTextColor="#6B7280"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Account Type Selector */}
            <View className="gap-2">
              <Text className="text-text-secondary text-xs uppercase tracking-wider font-medium">
                Account Type *
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {ACCOUNT_TYPES.map((type) => {
                  const isSelected = accountType === type.value;
                  return (
                    <TouchableOpacity
                      key={type.value}
                      onPress={() => setAccountType(type.value)}
                      activeOpacity={0.7}
                      className={`px-4 py-2.5 rounded-xl border ${
                        isSelected
                          ? 'bg-accent-primary border-accent-primary shadow-sm'
                          : 'bg-core-background border-core-stroke'
                      }`}
                    >
                      <Text
                        className={`text-xs font-semibold ${
                          isSelected ? 'text-white' : 'text-text-secondary'
                        }`}
                      >
                        {type.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Opening Balance */}
            <View className="gap-2">
              <Text className="text-text-secondary text-xs uppercase tracking-wider font-medium">
                Opening Balance (RM) *
              </Text>
              <View className="relative flex-row items-center">
                <Text className="absolute left-4 text-text-secondary font-mono font-bold">RM</Text>
                <TextInput
                  className="w-full bg-core-background border border-core-stroke rounded-xl pl-12 pr-4 py-3.5 text-text-primary font-mono font-bold text-lg"
                  placeholder="0.00"
                  placeholderTextColor="#6B7280"
                  keyboardType="numeric"
                  value={openingBalance}
                  onChangeText={setOpeningBalance}
                />
              </View>
            </View>

            {/* Savings Account Toggle */}
            <View className="flex-row items-center justify-between pt-2 border-t border-core-stroke">
              <View className="pr-4 flex-1">
                <Text className="text-text-primary font-semibold text-sm">Savings Account</Text>
                <Text className="text-text-secondary text-xs mt-0.5">
                  Designate this account specifically for tracking personal savings goals.
                </Text>
              </View>
              <Switch
                value={isSavingsAccount}
                onValueChange={setIsSavingsAccount}
                trackColor={{ false: '#262626', true: '#3B82F6' }}
                thumbColor={'#FFFFFF'}
              />
            </View>

            {/* Active Status Toggle */}
            <View className="flex-row items-center justify-between pt-4 border-t border-core-stroke">
              <View className="pr-4 flex-1">
                <Text className="text-text-primary font-semibold text-sm">Account Active</Text>
                <Text className="text-text-secondary text-xs mt-0.5">
                  Inactive accounts are hidden from transaction dropdown selectors.
                </Text>
              </View>
              <Switch
                value={isActive}
                onValueChange={setIsActive}
                trackColor={{ false: '#262626', true: '#10B981' }}
                thumbColor={'#FFFFFF'}
              />
            </View>

          </Card>

          {/* Action Buttons */}
          <View className="gap-3">
            <Button
              variant="primary"
              title={isLoading ? 'Saving Changes...' : 'Save Changes'}
              onPress={handleUpdate}
              isFullWidth
              disabled={isLoading}
            />

            <Button
              variant="secondary"
              title="Cancel"
              onPress={() => router.back()}
              isFullWidth
              disabled={isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}