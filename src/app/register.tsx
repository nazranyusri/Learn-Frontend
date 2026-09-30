import Layout from '@/components/Layout';
import Register from '@/components/customs/register';
import { View } from 'react-native';

export default function RegistrationPage() {
  return (
    <Layout>
      <View className="flex-1 h-full min-h-screen">
        <Register />
      </View>
    </Layout>
  );
}
