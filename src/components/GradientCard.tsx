import { StyleSheet, View } from 'react-native';
import S2D, { RadialGradient, Defs, Rect, Stop } from 'react-native-svg';
import Card from './Card';

// Constants for gradient colors sampled from image_0.png
const COLOR_START = '#161A22'; // bg-core-surface
const COLOR_END = '#202632'; // bg-core-elevation

interface GradientCardProps {
  className?: string;
  children: React.ReactNode;
}

export default function GradientCard({
  className,
  children,
}: GradientCardProps) {
  return (
    <Card className={`relative overflow-hidden ${className || ''}`}>
      <S2D width="100%" height="100%" style={styles.svg} pointerEvents="none">
        <Defs>
          <RadialGradient
            id="grad" // Positioning the light source off-center (top-left, like the image)
            cx="30%"
            cy="30%" // Setting radius large enough to cover the whole screen
            r="90%"
            gradientUnits="userSpaceOnUse" // Important: keeps the gradient consistent on screen resize
          >
            {/* Soft transition from light (blue-black) to dark (black) */}
            <Stop offset="0" stopColor={COLOR_START} stopOpacity="1" />
            <Stop offset="1" stopColor={COLOR_END} stopOpacity="1" />
          </RadialGradient>
        </Defs>
        {/* Applying the gradient to the full screen rectangle */}
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </S2D>

      <View style={styles.overlayContent}>{children}</View>
    </Card>
  );
}

const styles = StyleSheet.create({
  svg: {
    ...StyleSheet.absoluteFill,
  },
  overlayContent: {
    position: 'relative',
  },
});
