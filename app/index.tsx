import { Button } from '@/components/Button';
import { Colors } from '@/constants/Colors';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function Onboarding() {
    const router = useRouter();
    const { user, isLoading } = useUser();

    useEffect(() => {
        if (!isLoading && user?.hasCompletedOnboarding) {
            router.replace('/(tabs)/home');
        }
    }, [user, isLoading]);

    const handleGetStarted = () => {
        router.push('/onboarding/avatar');
    };

    if (isLoading) {
        return null; // Or a loading spinner
    }

    return (
        <View style={styles.container}>
            <Animated.View entering={FadeInUp.delay(200)} style={styles.content}>
                <Text style={styles.title}>Habbbit</Text>
                <Text style={styles.subtitle}>Build better habits, day by day.</Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(400)} style={styles.footer}>
                <Button title="Get Started" onPress={handleGetStarted} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'space-between',
        padding: 32,
        paddingTop: 100,
        paddingBottom: 60,
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 16,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 18,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 28,
    },
    footer: {
        width: '100%',
    },
});
