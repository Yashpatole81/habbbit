import { BadgeCard } from '@/components/BadgeCard';
import { Colors } from '@/constants/Colors';
import { useHabits } from '@/context/HabitContext';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BadgesScreen() {
    const { badges } = useHabits();

    const unlockedCount = badges.filter(b => b.unlocked).length;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Badges</Text>
                <Text style={styles.subtitle}>{unlockedCount} / {badges.length} Unlocked</Text>
            </View>

            <FlatList
                data={badges}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <BadgeCard badge={item} />}
                contentContainerStyle={styles.listContent}
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
        padding: 20,
        paddingBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
    },
    subtitle: {
        color: Colors.textMuted,
        fontSize: 14,
    },
    listContent: {
        padding: 20,
    },
});
