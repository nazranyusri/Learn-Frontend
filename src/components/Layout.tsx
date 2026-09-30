import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, View } from 'react-native';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.ReactNode {
  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#0B0E14', '#121722']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        pointerEvents="none"
        style={StyleSheet.absoluteFill}
      />
      <ScrollView
        className="flex-1 w-full h-full min-h-screen px-4"
        contentContainerClassName="flex-grow w-full"
      >
        <View className="flex-1">{children}</View>
      </ScrollView>
    </View>
  );
}
