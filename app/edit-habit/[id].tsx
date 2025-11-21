import { HabitForm } from '@/components/HabitForm';
import { Colors } from '@/constants/Colors';
import { useHabits } from '@/context/HabitContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function EditHabitScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { habits, updateHabit } = useHabits();

    const habitId = Array.isArray(id) ? id[0] : id;
    const habit = habits.find((h: any) => h.id === habitId);

    if (!habit) {
        return (
            <View style={styles.container}>
                <Text style={{ color: Colors.text }}>Habit not found</Text>
            </View>
        );
    }

    const handleSubmit = (name: string, description: string, color: string) => {
        if (habitId) {
            updateHabit(habitId, name, description, color);
            router.back();
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.title}>Edit Habit</Text>
            <HabitForm
                initialValues={{ name: habit.name, description: habit.description, color: habit.color }}
                onSubmit={handleSubmit}
                onCancel={() => router.back()}
                submitLabel="Save Changes"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 24,
    },
});
