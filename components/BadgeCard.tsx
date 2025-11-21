import { Colors } from '@/constants/Colors';
import { Badge } from '@/types';
import { Crown, Star, Trophy, Zap } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface BadgeCardProps {
    badge: Badge;
}

const IconMap: Record<string, any> = {
    Star,
    Zap,
    Crown,
    Trophy,
};

export const BadgeCard: React.FC<BadgeCardProps> = ({ badge }) => {
    const Icon = IconMap[badge.icon] || Star;
    const scale = useSharedValue(badge.unlocked ? 1 : 0.8);
    const opacity = useSharedValue(badge.unlocked ? 1 : 0.5);

    useEffect(() => {
        if (badge.unlocked) {
            scale.value = withSpring(1);
            opacity.value = withSpring(1);
        }
    }, [badge.unlocked]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={[styles.container, animatedStyle, badge.unlocked && styles.unlocked]}>
            <View style={[styles.iconContainer, badge.unlocked && styles.unlockedIcon]}>
                <Icon size={24} color={badge.unlocked ? Colors.background : Colors.textMuted} />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.name, badge.unlocked && styles.unlockedText]}>{badge.name}</Text>
                <Text style={styles.description}>{badge.description}</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    unlocked: {
        borderColor: Colors.primary,
        backgroundColor: 'rgba(0, 255, 136, 0.05)',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    unlockedIcon: {
        backgroundColor: Colors.primary,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        color: Colors.textMuted,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    unlockedText: {
        color: Colors.text,
    },
    description: {
        color: Colors.textMuted,
        fontSize: 12,
    },
});
