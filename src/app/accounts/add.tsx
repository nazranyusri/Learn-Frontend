import Layout from '@/components/Layout';
import { View, Text } from 'react-native';

export default function AddAccountsScreen() {
  return (
    <Layout>
      <View className="gap-4 py-6">
        <Text className="text-3xl font-bold text-white">Add new account</Text>
      </View>
    </Layout>
  );
}
