import { Text, View } from 'react-native';
import Card from '@/components/Card';
import CustomIcon from '@/components/CustomIcon';
import Layout from '@/components/Layout';
import { router } from 'expo-router';

export default function AccountsScreen() {
  const handleAddAccount = () => {
    router.push('/accounts/add');
  };

  return (
    <Layout>
      <View className="gap-4 py-6">
        <Text className="text-3xl font-bold text-white">Accounts</Text>
        <View className="gap-4">
          <Card>
            <Text className="text-base text-text-primary">
              Manage bank accounts, e-wallets, cash, and investments.
            </Text>
          </Card>
          <Card
            isButton={true}
            onPress={handleAddAccount}
            className="!bg-accent-primary"
          >
            <View className="flex-row items-center justify-between gap-4">
              <View>
                <Text className="font-bold text-text-primary">Add new account</Text>
                <Text className="text-sm text-text-primary">Create a new account to track your finances</Text>
              </View>
              <CustomIcon provider="Feather" name="plus-circle" size="medium" />
            </View>
          </Card>
        </View>
      </View>
    </Layout>
  );
}
