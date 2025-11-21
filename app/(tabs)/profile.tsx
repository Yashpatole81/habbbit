import { Colors } from '@/constants/Colors';
import { useHabits } from '@/context/HabitContext';
import { useUser } from '@/context/UserContext';
import { Award } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const { user } = useUser();
    const { badges } = useHabits();

    if (!user) return null;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatar}>{user.avatar}</Text>
                    </View>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.details}>{user.age} years old • {user.gender}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Achievements</Text>
                    <View style={styles.badgesGrid}>
                        {badges.map((badge: any) => (
                            <View
                                key={badge.id}
                                style={[
                                    styles.badgeCard,
                                    !badge.unlocked && styles.badgeLocked
                                ]}
                            >
                                <View style={styles.badgeIcon}>
                                    <Award
                                        size={24}
                                        color={badge.unlocked ? Colors.primary : Colors.textMuted}
                                    />
                                </View>
                                <Text style={styles.badgeName}>{badge.name}</Text>
                                <Text style={styles.badgeDescription}>{badge.description}</Text>
                            </View>
                        ))}
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
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    avatar: {
        fontSize: 48,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
    },
    details: {
        fontSize: 16,
        color: Colors.textSecondary,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 16,
    },
    badgesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    badgeCard: {
        width: '48%',
        backgroundColor: Colors.surface,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    badgeLocked: {
        opacity: 0.5,
        borderColor: 'transparent',
    },
    badgeIcon: {
        marginBottom: 8,
    },
    badgeName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
        textAlign: 'center',
    },
    badgeDescription: {
        fontSize: 12,
        color: Colors.textMuted,
        textAlign: 'center',
    },
});
