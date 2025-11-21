import { Badge } from '@/types';

export const BADGES_DATA: Omit<Badge, 'unlocked' | 'condition'>[] = [
    {
        id: 'rookie',
        name: 'Rookie',
        description: 'Complete 3 days total',
        icon: 'Star',
    },
    {
        id: 'one_week_warrior',
        name: 'One-Week Warrior',
        description: 'Achieve a 7-day streak',
        icon: 'Zap',
    },
    {
        id: 'consistency_king',
        name: 'Consistency King',
        description: 'Achieve a 30-day streak',
        icon: 'Crown',
    },
    {
        id: 'master_of_habits',
        name: 'Master of Habits',
        description: '100 total completions',
        icon: 'Trophy',
    },
];
