import { Button } from '@/components/Button';
import { HabitCard } from '@/components/HabitCard';
import { Colors } from '@/constants/Colors';
import { useHabits } from '@/context/HabitContext';
import { getTodayDate } from '@/utils/dateUtils';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const { habits, getHabitCompletion, toggleCompletion, deleteHabit } = useHabits();
    const router = useRouter();
    const today = getTodayDate();

    const handleToggle = (habitId: string) => {
        toggleCompletion(habitId, today);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Today's Habits</Text>
                <Button
                    title="+ Add"
                    onPress={() => router.push('/add-habit')}
                    variant="secondary"
                // small button style override if needed, but default is fine
                />
            </View>

            <FlatList
                data={habits}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <HabitCard
                        habit={item}
                        isCompleted={getHabitCompletion(item.id, today)}
                        onToggle={() => handleToggle(item.id)}
                        onEdit={() => router.push(`/edit-habit/${item.id}`)}
                        onDelete={() => deleteHabit(item.id)}
                        index={index}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No habits yet. Start by adding one!</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
    },
    listContent: {
        padding: 20,
        paddingTop: 0,
    },
    emptyState: {
        marginTop: 100,
        alignItems: 'center',
    },
    emptyText: {
        color: Colors.textMuted,
        fontSize: 16,
    },
});
