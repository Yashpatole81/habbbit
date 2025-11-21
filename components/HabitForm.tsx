import { ColorPicker } from '@/components/ColorPicker';
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Button } from './Button';
import { Input } from './Input';

interface HabitFormProps {
    initialValues?: {
        name: string;
        description: string;
        color: string;
    };
    onSubmit: (name: string, description: string, color: string) => void;
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
    const [description, setDescription] = useState(initialValues?.description || '');
    const [color, setColor] = useState(initialValues?.color || '#00FF88');

    const handleSubmit = () => {
        if (name.trim()) {
            onSubmit(name, description, color);
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

            <View style={styles.inputGroup}>
                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Description (optional)"
                    placeholderTextColor={Colors.textMuted}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                />
            </View>

            <ColorPicker selectedColor={color} onColorSelect={setColor} />

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
    inputGroup: {
        marginBottom: 20,
    },
    descriptionInput: {
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: 16,
        color: Colors.text,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.border,
        minHeight: 80,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
    },
});
