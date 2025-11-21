export interface Habit {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    color: string; // Hex color code
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
    addHabit: (name: string, description: string, color: string) => void;
    deleteHabit: (id: string) => void;
    updateHabit: (id: string, name: string, description: string, color: string) => void;
    toggleCompletion: (habitId: string, date: string) => void;
    getHabitCompletion: (habitId: string, date: string) => boolean;
    getStreak: (habitId: string) => number;
}
