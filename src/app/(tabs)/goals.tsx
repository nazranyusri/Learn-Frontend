import { Text, View } from 'react-native';
import Card from '@/components/Card';
import Layout from '@/components/Layout';

export default function GoalsScreen() {
  return (
    <Layout>
      <View className="gap-4">
        <Text className="text-3xl font-bold text-text-primary">Goals</Text>
        <Card>
          <Text className="text-base text-text-primary">
            Track savings plans and financial goal progress.
          </Text>
        </Card>
      </View>
    </Layout>
  );
}
