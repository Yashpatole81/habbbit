import { Colors } from '@/constants/Colors';
import { useHabits } from '@/context/HabitContext';
import { getTodayDate } from '@/utils/dateUtils';
import { eachDayOfInterval, format, isWithinInterval, startOfMonth, subDays } from 'date-fns';
import React, { useMemo } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { RadarChart } from './RadarChart';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = screenWidth - 40;

export const StatsCarousel = () => {
    const { habits, logs } = useHabits();
    const todayStr = getTodayDate();
    const [activeSlide, setActiveSlide] = React.useState(0);

    const handleScroll = (event: any) => {
        const slideSize = CARD_WIDTH + 16;
        const offset = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(offset / slideSize);
        setActiveSlide(currentIndex);
    };

    // 1. Pie Chart Data (Daily)
    const dailyData = useMemo(() => {
        const totalHabits = habits.length;
        const completedCount = habits.filter((h: any) => {
            const log = logs.find((l: any) => l.habitId === h.id);
            return log?.datesCompleted.includes(todayStr);
        }).length;
        const pendingCount = Math.max(0, totalHabits - completedCount);

        return [
            {
                name: 'Completed',
                population: completedCount,
                color: Colors.primary,
                legendFontColor: Colors.text,
                legendFontSize: 12,
            },
            {
                name: 'Pending',
                population: pendingCount,
                color: '#333333',
                legendFontColor: Colors.text,
                legendFontSize: 12,
            },
        ];
    }, [habits, logs, todayStr]);

    // 2. Bar Chart Data (Weekly)
    const weeklyData = useMemo(() => {
        const today = new Date();
        const end = today;
        const start = subDays(today, 6);
        const days = eachDayOfInterval({ start, end });

        const labels = days.map(d => format(d, 'EEE'));
        const data = days.map(d => {
            const dateStr = format(d, 'yyyy-MM-dd');
            return logs.reduce((acc: number, log: any) => {
                return acc + (log.datesCompleted.includes(dateStr) ? 1 : 0);
            }, 0);
        });

        return {
            labels,
            datasets: [{ data }],
        };
    }, [logs, todayStr]);

    // 3. Radar Chart Data (Monthly - Per Habit)
    const radarData = useMemo(() => {
        const today = new Date();
        const start = startOfMonth(today);
        const daysInMonth = eachDayOfInterval({ start, end: today }).length;

        return habits.slice(0, 6).map((habit: any) => {
            const log = logs.find((l: any) => l.habitId === habit.id);
            if (!log) {
                return {
                    label: habit.name.length > 8 ? habit.name.substring(0, 8) + '...' : habit.name,
                    value: 0.05,
                    color: habit.color,
                };
            }

            const completionsThisMonth = log.datesCompleted.filter((date: string) => {
                return isWithinInterval(new Date(date), { start, end: today });
            }).length;

            const consistency = completionsThisMonth / daysInMonth;

            return {
                label: habit.name.length > 8 ? habit.name.substring(0, 8) + '...' : habit.name,
                value: Math.max(0.05, Math.min(consistency, 1)),
                color: habit.color,
            };
        });
    }, [habits, logs, todayStr]);

    const chartConfig = {
        backgroundGradientFrom: Colors.surface,
        backgroundGradientTo: Colors.surface,
        color: (opacity = 1) => `rgba(0, 255, 136, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        decimalPlaces: 0,
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 16}
                decelerationRate="fast"
                contentContainerStyle={styles.scrollContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <View style={styles.slide}>
                    <Text style={styles.chartTitle}>Today's Progress</Text>
                    <View style={styles.chartContainer}>
                        <PieChart
                            data={dailyData}
                            width={CARD_WIDTH - 32}
                            height={200}
                            chartConfig={chartConfig}
                            accessor={'population'}
                            backgroundColor={'transparent'}
                            paddingLeft={'15'}
                            hasLegend={true}
                        />
                    </View>
                </View>

                <View style={styles.slide}>
                    <Text style={styles.chartTitle}>Weekly Activity</Text>
                    <View style={styles.chartContainer}>
                        <BarChart
                            data={weeklyData}
                            width={CARD_WIDTH - 32}
                            height={200}
                            yAxisLabel=""
                            yAxisSuffix=""
                            chartConfig={chartConfig}
                            verticalLabelRotation={0}
                            showValuesOnTopOfBars
                        />
                    </View>
                </View>

                <View style={styles.slide}>
                    <View style={styles.radarSlide}>
                        <Text style={styles.radarChartTitle}>Monthly Consistency</Text>
                        <View style={styles.chartContainer}>
                            {radarData.length > 0 ? (
                                <RadarChart data={radarData} size={300} />
                            ) : (
                                <Text style={styles.noDataText}>No habits to display</Text>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.pagination}>
                {[0, 1, 2].map((index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            activeSlide === index && styles.paginationDotActive,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    scrollContent: {
        paddingRight: 20,
    },
    slide: {
        width: CARD_WIDTH,
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginRight: 16,
        minHeight: 300,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 16,
        alignSelf: 'flex-start',
    },
    chartContainer: {
        width: '100%',
        height: 240,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radarSlide: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
    },
    radarChartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
        position: 'absolute',
        top: 8,
        left: 0,
        zIndex: 10,
    },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        gap: 8,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.textMuted,
        opacity: 0.3,
    },
    paginationDotActive: {
        backgroundColor: Colors.primary,
        opacity: 1,
        width: 24,
    },
    noDataText: {
        color: Colors.textMuted,
        fontSize: 14,
        marginTop: 40,
    }
});
