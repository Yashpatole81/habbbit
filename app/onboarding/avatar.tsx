import { Button } from '@/components/Button';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AVATARS = [
    '👻', '🤖', '👽', '👾', '🤡', '👹',
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊',
    '🐼', '🐨', '🐯', '🦁', '🐮', '🐷',
    '🐸', '🐵', '🐔', '🐧', '🐦', '🐤',
];

export default function AvatarSelection() {
    const router = useRouter();
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

    const handleContinue = () => {
        if (selectedAvatar) {
            router.push({
                pathname: '/onboarding/details',
                params: { avatar: selectedAvatar }
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Choose your Avatar</Text>
                <Text style={styles.subtitle}>Select an icon that represents you.</Text>

                <FlatList
                    data={AVATARS}
                    numColumns={4}
                    keyExtractor={(item) => item}
                    contentContainerStyle={styles.grid}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.avatarItem,
                                selectedAvatar === item && styles.selectedAvatar
                            ]}
                            onPress={() => setSelectedAvatar(item)}
                        >
                            <Text style={styles.avatarText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <View style={styles.footer}>
                <Button
                    title="Continue"
                    onPress={handleContinue}
                    disabled={!selectedAvatar}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: 40,
    },
    grid: {
        alignItems: 'center',
        gap: 16,
    },
    avatarItem: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedAvatar: {
        borderColor: Colors.primary,
        backgroundColor: '#00FF8820',
    },
    avatarText: {
        fontSize: 32,
    },
    footer: {
        paddingVertical: 20,
    },
});
