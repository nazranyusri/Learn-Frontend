import { Text, View } from 'react-native';
import { useAuthStore } from '@/stores';
import Button from '@/components/Button';
import Layout from '@/components/Layout';

export default function HomeScreen() {
  const { logout } = useAuthStore();

  return (
    <Layout>
      <View>
        <Text>Learn-Frontend</Text>
        <Button title="Log out" onPress={logout} />
      </View>
    </Layout>
  );
}
