import { Text, View } from 'react-native';
import { useAuthStore } from '@/stores';
import Button from '@/components/Button';
import Layout from '@/components/Layout';
import Card from '@/components/Card';

export default function HomeScreen() {
  const { logout } = useAuthStore();

  return (
    <Layout>
      <View className="gap-4">
        <Text className="text-3xl font-bold text-text-primary">Goals</Text>
        <Card>
          <Text className="text-base text-text-primary">
            Dashboard: total wealth, income, spending, savings progress,
            budgets, and recent activity
          </Text>
        </Card>

        <Button title="Log out" onPress={logout} />
      </View>
    </Layout>
  );
}
