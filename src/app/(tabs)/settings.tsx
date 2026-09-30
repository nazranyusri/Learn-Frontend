import { StyleSheet, Text, View } from 'react-native';
import Layout from '@/components/Layout';

export default function SettingsScreen() {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <Text>Account and app settings will go here.</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
});
