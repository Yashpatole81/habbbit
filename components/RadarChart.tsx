import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Svg, { Circle, Line, Polygon } from 'react-native-svg';

interface RadarPoint {
    label: string;
    value: number; // 0 to 1
    color: string;
}

interface RadarChartProps {
    data: RadarPoint[];
    size: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, size }) => {
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
    const center = size / 2;
    const maxRadius = (size / 2) - 40;
    const levels = 5;

    // Calculate points for the polygon - each habit at fixed angle, variable radius
    const getPoint = (value: number, index: number) => {
        const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
        const radius = value * maxRadius;
        return {
            x: center + radius * Math.cos(angle),
            y: center + radius * Math.sin(angle),
        };
    };

    // For axis line endpoints (always at max radius)
    const getAxisPoint = (index: number) => {
        const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
        return {
            x: center + maxRadius * Math.cos(angle),
            y: center + maxRadius * Math.sin(angle),
        };
    };

    // Generate polygon points string
    const polygonPoints = data
        .map((item, index) => {
            const point = getPoint(item.value, index);
            return `${point.x},${point.y}`;
        })
        .join(' ');

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => setSelectedPoint(null)}>
                <Svg width={size} height={size}>
                    {/* Background circles */}
                    {Array.from({ length: levels }).map((_, i) => {
                        const radius = ((i + 1) / levels) * maxRadius;
                        return (
                            <Circle
                                key={i}
                                cx={center}
                                cy={center}
                                r={radius}
                                stroke={Colors.border}
                                strokeWidth={1}
                                fill="none"
                                opacity={0.3}
                            />
                        );
                    })}

                    {/* Axis lines - one for each habit at fixed angle */}
                    {data.map((item, index) => {
                        const endPoint = getAxisPoint(index);
                        return (
                            <Line
                                key={index}
                                x1={center}
                                y1={center}
                                x2={endPoint.x}
                                y2={endPoint.y}
                                stroke={Colors.border}
                                strokeWidth={1}
                                opacity={0.3}
                            />
                        );
                    })}

                    {/* Data polygon - connecting all habit dots */}
                    <Polygon
                        points={polygonPoints}
                        fill={Colors.primary}
                        fillOpacity={0.1}
                        stroke={Colors.primary}
                        strokeWidth={1}
                        strokeOpacity={0.3}
                    />
                </Svg>
            </TouchableWithoutFeedback>

            {/* Colored dots positioned based on value */}
            {data.map((item, index) => {
                const dotPosition = getPoint(item.value, index);
                const dotSize = 18;
                return (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={() => setSelectedPoint(selectedPoint === index ? null : index)}
                    >
                        <View
                            style={[
                                styles.dot,
                                {
                                    left: dotPosition.x - dotSize / 2,
                                    top: dotPosition.y - dotSize / 2,
                                    backgroundColor: item.color,
                                    width: dotSize,
                                    height: dotSize,
                                    borderRadius: dotSize / 2,
                                },
                            ]}
                        />
                    </TouchableWithoutFeedback>
                );
            })}

            {/* Tooltip for selected point */}
            {selectedPoint !== null && (
                <View style={[styles.tooltip, { top: 10, left: size / 2 - 60 }]}>
                    <Text style={styles.tooltipText}>{data[selectedPoint].label}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    dot: {
        position: 'absolute',
        borderWidth: 2,
        borderColor: Colors.background,
    },
    tooltip: {
        position: 'absolute',
        backgroundColor: Colors.surface,
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: Colors.primary,
        minWidth: 120,
        alignItems: 'center',
    },
    tooltipText: {
        color: Colors.text,
        fontSize: 12,
        fontWeight: '600',
    },
});
