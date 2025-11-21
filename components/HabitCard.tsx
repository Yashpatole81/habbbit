import { Colors, Layout } from '@/constants/Colors';
import { Habit } from '@/types';
import { Edit2, Trash2 } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Checkbox } from './Checkbox';

interface HabitCardProps {
    habit: Habit;
    isCompleted: boolean;
    onToggle: () => void;
    onEdit: () => void;
    onDelete: () => void;
    index: number;
}

export const HabitCard: React.FC<HabitCardProps> = ({
    habit,
    isCompleted,
    onToggle,
    onEdit,
    onDelete,
    index,
}) => {
    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100).springify()}
            style={styles.container}
        >
            <View style={styles.content}>
                <View style={styles.textContainer}>
                    <View style={styles.titleRow}>
                        <View style={[styles.colorDot, { backgroundColor: habit.color }]} />
                        <Text style={[
                            styles.title,
                            isCompleted && styles.completedTitle
                        ]}>{habit.name}</Text>
                    </View>
                    {habit.description ? (
                        <Text style={styles.description} numberOfLines={2}>{habit.description}</Text>
                    ) : null}
                </View>

                <View style={styles.actions}>
                    <Checkbox checked={isCompleted} onPress={onToggle} disabled={isCompleted} />
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
                    <Edit2 size={16} color={Colors.textMuted} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
                    <Trash2 size={16} color={Colors.error} />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius,
        padding: Layout.padding,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    textContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    colorDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    title: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
    },
    description: {
        color: Colors.textMuted,
        fontSize: 12,
    },
    actions: {
        marginLeft: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: 12,
    },
    iconButton: {
        padding: 4,
    },
    completedTitle: {
        textDecorationLine: 'line-through',
        color: Colors.textMuted,
    },
});
