import { Colors } from '@/constants/Colors';
import { Check } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';

interface CheckboxProps {
    checked: boolean;
    onPress: () => void;
    disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onPress, disabled }) => {
    const scale = useSharedValue(checked ? 1 : 0);
    const progress = useSharedValue(checked ? 1 : 0);

    useEffect(() => {
        scale.value = withSpring(checked ? 1 : 0, { damping: 15 });
        progress.value = withTiming(checked ? 1 : 0, { duration: 200 });
    }, [checked]);

    const animatedContainerStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            ['transparent', Colors.primary]
        );
        const borderColor = interpolateColor(
            progress.value,
            [0, 1],
            [Colors.textMuted, Colors.primary]
        );

        return {
            backgroundColor,
            borderColor,
        };
    });

    const animatedIconStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: progress.value,
        };
    });

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress} disabled={disabled}>
            <Animated.View style={[styles.container, animatedContainerStyle]}>
                <Animated.View style={animatedIconStyle}>
                    <Check size={16} color={Colors.background} strokeWidth={3} />
                </Animated.View>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
