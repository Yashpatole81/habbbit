import { Colors, Layout } from '@/constants/Colors';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
}) => {
    const getBackgroundColor = () => {
        if (disabled) return Colors.surface;
        if (variant === 'primary') return Colors.primary;
        if (variant === 'secondary') return Colors.secondary;
        return 'transparent';
    };

    const getTextColor = () => {
        if (disabled) return Colors.textMuted;
        if (variant === 'outline') return Colors.primary;
        return Colors.background; // Black text on green button
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor: getBackgroundColor(), borderColor: variant === 'outline' ? Colors.primary : 'transparent' },
                variant === 'outline' && { borderWidth: 1 },
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderRadius: Layout.borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});
