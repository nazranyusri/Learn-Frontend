import { StyleSheet, Text, View } from 'react-native';
import { useHealth } from '@/hooks';

export default function HomeScreen() {
  const {isHealthPending, isHealthError, healthData} = useHealth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learn-Frontend</Text>
      <Text style={styles.subtitle}>
        {isHealthPending
          ? 'Checking backend...'
          : isHealthError
            ? 'Backend unavailable'
            : `Backend: ${healthData?.status ?? 'Unknown'}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 8,
    color: '#667085',
    fontSize: 16,
  },
});