import { HeatmapGrid } from '@/components/HeatmapGrid';
import { StatsCarousel } from '@/components/StatsCarousel';
import { Colors } from '@/constants/Colors';
import { useHabits } from '@/context/HabitContext';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StatsScreen() {
    const { logs, habits } = useHabits();

    const totalCompletions = logs.reduce((acc, log) => acc + log.datesCompleted.length, 0);

    // Simple best streak calculation (across all habits - placeholder logic)
    // In a real app, this would be more complex.
    const bestStreak = 0; // Placeholder

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Statistics</Text>

                <StatsCarousel />

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Monthly Achievement</Text>
                    <HeatmapGrid logs={logs} />
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{totalCompletions}</Text>
                        <Text style={styles.statLabel}>Total Completions</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{habits.length}</Text>
                        <Text style={styles.statLabel}>Active Habits</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 24,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    cardTitle: {
        color: Colors.textSecondary,
        fontSize: 16,
        marginBottom: 16,
        fontWeight: '600',
    },
    statsRow: {
        flexDirection: 'row',
        gap: 16,
    },
    statCard: {
        flex: 1,
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 4,
    },
    statLabel: {
        color: Colors.textMuted,
        fontSize: 12,
    },
});
