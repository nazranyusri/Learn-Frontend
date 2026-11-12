import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  isFullWidth?: boolean;
  buttonClassName?: string;
  title: string;
  icon?: IoniconName;
  iconSize?: number;
  iconColor?: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function Button({
  variant,
  isFullWidth = false,
  buttonClassName,
  title,
  icon,
  iconSize = 16,
  iconColor,
  onPress,
  disabled,
}: ButtonProps) {
  const getButtonStyles = () => {
    let baseStyles = `${isFullWidth ? 'w-full' : 'self-start'} rounded-lg py-4 px-4 flex-row items-center justify-center gap-2`;

    switch (variant) {
      case 'primary':
        baseStyles += ' bg-accent-primary pressed:bg-accent-primary-hover';
        break;
      case 'secondary':
        baseStyles += ' bg-accent-secondary pressed:bg-accent-secondary-hover';
        break;
      case 'outline':
        baseStyles += ' bg-core-surface border border-core-stroke';
        break;
      case 'ghost':
        baseStyles += ' bg-transparent pressed:bg-core-stroke';
        break;
      case 'link':
        baseStyles +=
          ' !p-0 bg-transparent rounded-none pressed:opacity-70 self-auto';
        break;
      default:
        baseStyles += ' bg-accent-primary pressed:bg-accent-primary-hover';
    }

    return baseStyles;
  };

  const getTextStyles = () => {
    let baseStyles = 'text-center';
    switch (variant) {
      case 'primary':
        baseStyles += ' font-bold text-text-primary';
        break;
      case 'secondary':
        baseStyles += ' text-text-secondary';
        break;
      case 'outline':
        baseStyles += ' text-text-primary';
      case 'ghost':
        baseStyles += ' text-text-primary';
        break;
      case 'link':
        baseStyles += ' text-accent-primary hover:underline';
        break;
      default:
        baseStyles += ' font-bold text-text-primary';
    }
    return baseStyles;
  };

  const getDefaultIconColor = () => {
    if (iconColor) return iconColor;
    switch (variant) {
      case 'secondary':
        return '#9CA3AF';
      case 'link':
        return '#3B82F6';
      default:
        return '#FFFFFF';
    }
  };

  return (
    <Pressable
      className={`${getButtonStyles()} ${buttonClassName || ''} disabled:opacity-50`}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole={variant === 'link' ? 'link' : 'button'}
    >
      {icon && (
        <Ionicons name={icon} size={iconSize} color={getDefaultIconColor()} />
      )}
      <Text className={getTextStyles()}>{title}</Text>
    </Pressable>
  );
}
