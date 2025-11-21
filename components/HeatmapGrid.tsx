import { Colors } from '@/constants/Colors';
import { CompletionLog } from '@/types';
import { eachDayOfInterval, format } from 'date-fns';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeatmapGridProps {
    logs: CompletionLog[];
}

export const HeatmapGrid: React.FC<HeatmapGridProps> = ({ logs }) => {
    const today = new Date();
    const days = eachDayOfInterval({
        start: new Date(today.getFullYear(), today.getMonth(), 1),
        end: new Date(today.getFullYear(), today.getMonth() + 1, 0),
    });

    const getIntensity = (date: Date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        let count = 0;
        logs.forEach((log) => {
            if (log.datesCompleted.includes(dateStr)) {
                count++;
            }
        });
        return count;
    };

    const getColor = (count: number) => {
        if (count === 0) return '#222';
        // Gradient from dark green to bright neon green
        if (count === 1) return '#004422'; // Very dark green
        if (count === 2) return '#006633'; // Dark green
        if (count === 3) return '#008844'; // Medium green
        if (count === 4) return '#00AA55'; // Light green
        if (count === 5) return '#00CC66'; // Lighter green
        return Colors.primary; // #00FF88 (Brightest)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.monthLabel}>{format(today, 'MMMM yyyy')}</Text>
            <View style={styles.grid}>
                {days.map((day, index) => {
                    const count = getIntensity(day);
                    return (
                        <View
                            key={index}
                            style={[
                                styles.cell,
                                { backgroundColor: getColor(count) },
                            ]}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: Colors.surface,
        borderRadius: 12,
        alignItems: 'center',
    },
    monthLabel: {
        color: Colors.textSecondary,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        justifyContent: 'center',
    },
    cell: {
        width: 30,
        height: 30,
        borderRadius: 4,
        margin: 2,
    },
});
