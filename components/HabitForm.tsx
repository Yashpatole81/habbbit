import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from './Button';
import { Input } from './Input';

interface HabitFormProps {
    initialValues?: {
        name: string;
        frequency: 'daily' | 'weekly';
    };
    onSubmit: (name: string, frequency: 'daily' | 'weekly') => void;
    onCancel: () => void;
    submitLabel?: string;
}

export const HabitForm: React.FC<HabitFormProps> = ({
    initialValues,
    onSubmit,
    onCancel,
    submitLabel = 'Save',
}) => {
    const [name, setName] = useState(initialValues?.name || '');
    const [frequency, setFrequency] = useState<'daily' | 'weekly'>(initialValues?.frequency || 'daily');

    const handleSubmit = () => {
        if (name.trim()) {
            onSubmit(name, frequency);
        }
    };

    return (
        <View style={styles.container}>
            <Input
                label="Habit Name"
                placeholder="e.g., Morning Meditation"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Frequency</Text>
            <View style={styles.frequencyContainer}>
                <TouchableOpacity
                    style={[styles.option, frequency === 'daily' && styles.optionSelected]}
                    onPress={() => setFrequency('daily')}
                >
                    <Text style={[styles.optionText, frequency === 'daily' && styles.optionTextSelected]}>Daily</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.option, frequency === 'weekly' && styles.optionSelected]}
                    onPress={() => setFrequency('weekly')}
                >
                    <Text style={[styles.optionText, frequency === 'weekly' && styles.optionTextSelected]}>Weekly</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.actions}>
                <Button title="Cancel" onPress={onCancel} variant="outline" />
                <View style={{ width: 16 }} />
                <Button title={submitLabel} onPress={handleSubmit} disabled={!name.trim()} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        color: Colors.textSecondary,
        marginBottom: 8,
        fontSize: 14,
    },
    frequencyContainer: {
        flexDirection: 'row',
        marginBottom: 24,
        gap: 12,
    },
    option: {
        flex: 1,
        height: 44,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.surface,
    },
    optionSelected: {
        borderColor: Colors.primary,
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
    },
    optionText: {
        color: Colors.textMuted,
    },
    optionTextSelected: {
        color: Colors.primary,
        fontWeight: '600',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
    },
});
