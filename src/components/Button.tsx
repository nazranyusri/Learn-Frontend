import { Pressable, Text } from 'react-native';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  isFullWidth?: boolean;
  buttonClassName?: string;
  title: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function Button({
  variant,
  isFullWidth = false,
  buttonClassName,
  title,
  onPress,
  disabled,
}: ButtonProps) {
  const getButtonStyles = () => {
    let baseStyles = `${isFullWidth ? 'w-full' : 'self-start'} rounded-lg py-4 px-4 items-center justify-center`;
    
    switch (variant) {
      case 'primary':
        baseStyles += ' bg-accent-primary pressed:bg-accent-primary-hover';
        break;
      case 'secondary':
        baseStyles += ' bg-accent-secondary pressed:bg-accent-secondary-hover';
        break;
      case 'ghost':
        baseStyles += ' bg-transparent pressed:bg-core-stroke';
        break;
      case 'link':
        baseStyles += ' !p-0 bg-transparent rounded-none pressed:opacity-70 self-auto';
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

  return (
    <Pressable
      className={`${getButtonStyles()} ${buttonClassName || ''} disabled:opacity-50`}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole={variant === 'link' ? 'link' : 'button'}
    >
      <Text className={getTextStyles()}>{title}</Text>
    </Pressable>
  );
}