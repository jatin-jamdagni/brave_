import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  backButton?: boolean;
  backButtonPosition?: 'left' | 'right';
  backgroundColor?: string;
  textColor?: string;
}

export default function AppHeader({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  backButton = true,
  backButtonPosition = 'left',
  backgroundColor = '#FFFFFF',
  textColor = '#000000',
}: AppHeaderProps) {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderIcon = (
    icon: string | undefined,
    onPress: (() => void) | undefined,
    isBackButton: boolean = false,
  ) => {
    const iconName = isBackButton ? 'chevron-back' : icon;
    if (iconName) {
      return (
        <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
          <Icon name={iconName} size={24} color={textColor} />
        </TouchableOpacity>
      );
    }
    return <View style={styles.iconContainer} />;
  };

  return (
    <View style={[styles.header, {backgroundColor}]}>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={textColor === '#000000' ? 'dark-content' : 'light-content'}
      />
      {leftIcon && backButtonPosition === 'left'
        ? backButton
          ? renderIcon('chevron-back', handleBackPress, true)
          : renderIcon(leftIcon, onLeftPress)
        : renderIcon(leftIcon, onLeftPress)}
      <View style={styles.titleContainer}>
        <Text style={[styles.title, {color: textColor}]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, {color: textColor}]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      {backButtonPosition === 'right'
        ? backButton
          ? renderIcon('chevron-forward', handleBackPress, true)
          : renderIcon(rightIcon, onRightPress)
        : renderIcon(rightIcon, onRightPress)}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
    paddingBottom: 20,
    marginBottom:10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});
