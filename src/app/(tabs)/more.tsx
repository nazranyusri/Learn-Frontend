import { Text, View } from 'react-native';
import Card from '@/components/Card';
import Layout from '@/components/Layout';

export default function MoreScreen() {
  return (
    <Layout>
      <View className="gap-4">
        <Text className="text-3xl font-bold text-text-primary">More</Text>
        <Card>
          <Text className="text-base text-text-primary">
            Budgets, recurring transactions, reports, settings, and profile.
          </Text>
        </Card>
      </View>
    </Layout>
  );
}
