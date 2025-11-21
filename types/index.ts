export interface Habit {
    id: string;
    name: string;
    frequency: 'daily' | 'weekly';
    createdAt: string;
}

export interface CompletionLog {
    habitId: string;
    datesCompleted: string[]; // YYYY-MM-DD
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    condition: (stats: any) => boolean;
    unlocked: boolean;
    icon: string;
}

export interface UserProfile {
    name: string;
    gender: string;
    age: string;
    avatar: string;
    hasCompletedOnboarding: boolean;
}

export interface HabitContextType {
    habits: Habit[];
    logs: CompletionLog[];
    badges: Badge[];
    addHabit: (name: string, frequency: 'daily' | 'weekly') => void;
    deleteHabit: (id: string) => void;
    updateHabit: (id: string, name: string, frequency: 'daily' | 'weekly') => void;
    toggleCompletion: (habitId: string, date: string) => void;
    getHabitCompletion: (habitId: string, date: string) => boolean;
    getStreak: (habitId: string) => number;
}
