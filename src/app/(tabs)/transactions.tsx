import { Text, View } from 'react-native';
import Card from '@/components/Card';
import Layout from '@/components/Layout';

export default function TransactionsScreen() {
  return (
    <Layout>
      <View className="gap-4">
        <Text className="text-3xl font-bold text-text-primary">
          Transactions
        </Text>
        <Card>
          <Text className="text-base text-text-primary">
            Your income, expenses, and transfers will appear here.
          </Text>
        </Card>
      </View>
    </Layout>
  );
}
