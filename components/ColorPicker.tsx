import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ColorPickerProps {
    selectedColor: string;
    onColorSelect: (color: string) => void;
}

const PRESET_COLORS = [
    '#00FF88', // Primary green
    '#FF5757', // Red
    '#5B8DEF', // Blue
    '#FFB84D', // Orange
    '#9D4EDD', // Purple
    '#F72585', // Pink
    '#4CC9F0', // Cyan
    '#06FFA5', // Mint
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorSelect }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Color</Text>
            <View style={styles.colorGrid}>
                {PRESET_COLORS.map((color) => (
                    <TouchableOpacity
                        key={color}
                        style={[
                            styles.colorSwatch,
                            { backgroundColor: color },
                            selectedColor === color && styles.selectedSwatch,
                        ]}
                        onPress={() => onColorSelect(color)}
                    >
                        {selectedColor === color && (
                            <View style={styles.checkmark} />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    colorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    colorSwatch: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedSwatch: {
        borderWidth: 3,
        borderColor: Colors.text,
    },
    checkmark: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: Colors.background,
    },
});
