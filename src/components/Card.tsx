import { View, Pressable } from 'react-native';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onPress?: () => void;
}

export default function Card({
  className,
  children,
  onPress,
}: CardProps) {
  const Container = onPress ? Pressable : View;
  const containerProps = onPress ? { onPress } : {};

  return (
    <Container
      className={`rounded-3xl border border-core-stroke bg-core-surface p-4 shadow-lg shadow-black/30 elevation-4 ${className}`}
      {...containerProps}
    >
      {children}
    </Container>
  );
}
