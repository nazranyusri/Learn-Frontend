import { View } from 'react-native';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export default function Card({ className, children }: CardProps) {
  return (
    <View
      className={`rounded-3xl border border-core-stroke bg-core-surface p-4 shadow-lg shadow-black/30 elevation-4 ${className}`}
    >
      {children}
    </View>
  );
} 
