import { HabitForm } from '@/components/HabitForm';
import { Colors } from '@/constants/Colors';
import { useHabits } from '@/context/HabitContext';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AddHabitScreen() {
    const router = useRouter();
    const { addHabit } = useHabits();

    const handleSubmit = (name: string, frequency: 'daily' | 'weekly') => {
        addHabit(name, frequency);
        router.back();
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.title}>New Habit</Text>
            <HabitForm
                onSubmit={handleSubmit}
                onCancel={() => router.back()}
                submitLabel="Create Habit"
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
