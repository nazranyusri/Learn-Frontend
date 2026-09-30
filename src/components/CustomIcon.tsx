import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import type { ComponentType } from 'react';

interface CustomIconProps {
  size: 'small' | 'medium' | 'large';
  color?: 'white' | 'black' | 'blue';
  name: string;
  provider:
    | 'AntDesign'
    | 'Feather'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons';
}

const iconSizes = {
  small: 16,
  medium: 24,
  large: 32,
} as const;

const iconColors = {
  white: '#EAECEF',
  black: '#000000',
  blue: '#3182CE',
} as const;

const iconProviders = {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} as const;

interface ProviderIconProps {
  name: string;
  size: number;
  color: string;
}

export default function CustomIcon({
  size = 'small',
  color = 'white',
  name,
  provider = 'Feather',
}: CustomIconProps) {
  const Icon = iconProviders[provider] as ComponentType<ProviderIconProps>;

  return <Icon name={name} size={iconSizes[size]} color={iconColors[color]} />;
}
