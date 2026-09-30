import { ScrollView, View } from 'react-native';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.ReactNode {
  return (
    <ScrollView
      className="flex-1 w-full h-full min-h-screen bg-core-bg px-4"
      contentContainerClassName="flex-grow w-full"
    >
      <View className="flex-1">{children}</View>
    </ScrollView>
  );
}
