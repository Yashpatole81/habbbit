import { Colors, Layout } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface InputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    label?: string;
}

export const Input: React.FC<InputProps> = ({ value, onChangeText, placeholder, label }) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colors.textMuted}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        color: Colors.textSecondary,
        marginBottom: 8,
        fontSize: 14,
    },
    input: {
        backgroundColor: Colors.surface,
        height: 50,
        borderRadius: Layout.borderRadius,
        paddingHorizontal: 16,
        color: Colors.text,
        borderWidth: 1,
        borderColor: Colors.border,
    },
});
