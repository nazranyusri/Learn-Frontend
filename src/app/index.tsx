import Login from '@/components/customs/login';
import Layout from '@/components/Layout';
import { View } from 'react-native';

export default function LandingPage() {
  return (
    <Layout>
      <View className="flex-1">
        <Login />
      </View>
    </Layout>
  );
}
