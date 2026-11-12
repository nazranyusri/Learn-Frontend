import { Text, View } from 'react-native';
import Card from '@/components/Card';
import CustomIcon from '@/components/CustomIcon';
import Layout from '@/components/Layout';
import { router } from 'expo-router';
import { useAccount } from '@/hooks';
import Tag from '@/components/Tag';

export default function AccountsScreen() {
  const { accountData, isAccountError, accountError } = useAccount();

  const handleAddAccount = () => {
    router.push('/accounts/add');
  };

  const renderAccountCards = () => {
    if (isAccountError) {
      return (
        <Card className="items-center justify-center">
          <Text className="text-bear text-base font-semibold mb-1">
            Failed to load accounts
          </Text>
          <Text className="text-text-secondary text-xs text-center">
            {accountError?.message ||
              'Please check your connection and try again.'}
          </Text>
        </Card>
      );
    }

    if (!accountData || accountData.length === 0) {
      return (
        <Card className="items-center justify-center">
          <Text className="text-text-primary text-base font-semibold mb-1">
            No accounts found
          </Text>
          <Text className="text-text-secondary text-xs text-center">
            Get started by adding your first financial account or e-wallet.
          </Text>
        </Card>
      );
    }

    return accountData?.map((account, index) => (
      <Card
        key={`${account.accountId}-${index}`}
        onPress={() =>
          router.push({
            pathname: '/accounts/[accountId]',
            params: { accountId: account.accountId },
          })
        }
      >
        <View className="flex-row justify-between items-center pb-4">
          <Text
            className="text-text-primary text-lg font-semibold flex-1"
            numberOfLines={1}
          >
            {account.accountName}
          </Text>
          <Tag variant="basic" label={account.accountType} />
        </View>

        <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-core-stroke">
          <View className="flex-1">
            <Text className="text-text-secondary text-xs">
              Opening Balance
            </Text>
            <Text className="text-accent-primary font-mono text-2xl font-bold mt-1">
              RM{account.openingBalance}
            </Text>
          </View>
          {account.isSavingsAccount && (
            <Tag variant="success" label="Savings" />
          )}
        </View>

        <View className="flex-row justify-between items-center">
          <Text
            className="text-text-secondary text-xs"
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            ID: {account.accountId}
          </Text>
          <Text className="text-text-secondary text-xs">
            Updated: {new Date(account.updateAtDate).toLocaleDateString()}
          </Text>
        </View>
      </Card>
    ));
  };

  return (
    <Layout>
      <View className="gap-4">
        <View>
          <Text className="text-4xl font-bold text-text-primary">Accounts</Text>
          <Text className="text-text-secondary text-sm mt-1">
            Manage bank accounts, e-wallets, cash, and others here
          </Text>
        </View>
        <View className="gap-6">
          {renderAccountCards()}
          <Card
            onPress={handleAddAccount}
            className="!bg-accent-primary"
          >
            <View className="flex-row items-center justify-between gap-4">
              <View>
                <Text className="font-bold text-text-primary">
                  Add new account
                </Text>
                <Text className="text-sm text-text-primary">
                  Create a new account to track your finances
                </Text>
              </View>
              <CustomIcon provider="Feather" name="plus-circle" size="medium" />
            </View>
          </Card>
        </View>
      </View>
    </Layout>
  );
}
