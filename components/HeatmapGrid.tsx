import { Colors } from '@/constants/Colors';
import { CompletionLog } from '@/types';
import { addMonths, eachDayOfInterval, format, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeatmapGridProps {
    logs: CompletionLog[];
}

export const HeatmapGrid: React.FC<HeatmapGridProps> = ({ logs }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const days = eachDayOfInterval({
        start: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
        end: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0),
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
        if (count === 0) return '#444444'; // Grey for empty dates
        // Gradient from dark green to bright neon green
        if (count === 1) return '#004422';
        if (count === 2) return '#006633';
        if (count === 3) return '#008844';
        if (count === 4) return '#00AA55';
        if (count === 5) return '#00CC66';
        return Colors.primary; // #00FF88 (Brightest)
    };

    const goToPreviousMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const goToNextMonth = () => {
        const today = new Date();
        const nextMonth = addMonths(currentMonth, 1);
        // Don't allow navigation to future months
        if (nextMonth <= today) {
            setCurrentMonth(nextMonth);
        }
    };

    const isCurrentMonthOrPast = () => {
        const today = new Date();
        const nextMonth = addMonths(currentMonth, 1);
        return nextMonth <= today;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
                    <ChevronLeft size={20} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.monthLabel}>{format(currentMonth, 'MMMM yyyy')}</Text>
                <TouchableOpacity
                    onPress={goToNextMonth}
                    style={styles.navButton}
                    disabled={!isCurrentMonthOrPast()}
                >
                    <ChevronRight
                        size={20}
                        color={isCurrentMonthOrPast() ? Colors.text : Colors.textMuted}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.grid}>
                {days.map((day, index) => {
                    const count = getIntensity(day);
                    const dayNumber = format(day, 'd');
                    return (
                        <View
                            key={index}
                            style={[
                                styles.cell,
                                { backgroundColor: getColor(count) },
                            ]}
                        >
                            <Text style={styles.dayText}>{dayNumber}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
    },
    navButton: {
        padding: 8,
    },
    monthLabel: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: '600',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 350,
    },
    cell: {
        width: 40,
        height: 40,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayText: {
        color: '#666666', // Dark gray
        fontSize: 12,
        fontWeight: '600',
    },
});
