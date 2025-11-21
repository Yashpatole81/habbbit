import { BADGES_DATA } from '@/constants/Badges';
import { Badge, CompletionLog, Habit, HabitContextType } from '@/types';
import { getTodayDate } from '@/utils/dateUtils';
import { StorageKeys, getData, saveData } from '@/utils/storage';
import * as Crypto from 'expo-crypto';
import React, { createContext, useContext, useEffect, useState } from 'react';

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [logs, setLogs] = useState<CompletionLog[]>([]);
    const [badges, setBadges] = useState<Badge[]>(
        BADGES_DATA.map((b) => ({ ...b, unlocked: false, condition: () => false }))
    );

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        saveData(StorageKeys.HABITS, habits);
    }, [habits]);

    useEffect(() => {
        saveData(StorageKeys.LOGS, logs);
    }, [logs]);

    useEffect(() => {
        saveData(StorageKeys.BADGES, badges);
    }, [badges]);

    const loadData = async () => {
        const storedHabits = await getData(StorageKeys.HABITS);
        const storedLogs = await getData(StorageKeys.LOGS);
        const storedBadges = await getData(StorageKeys.BADGES);

        if (storedHabits) setHabits(storedHabits);
        if (storedLogs) setLogs(storedLogs);
        if (storedBadges) {
            const mergedBadges = BADGES_DATA.map(staticBadge => {
                const stored = storedBadges.find((b: Badge) => b.id === staticBadge.id);
                return { ...staticBadge, unlocked: stored ? stored.unlocked : false, condition: () => false };
            });
            setBadges(mergedBadges);
        }
    };

    const addHabit = (name: string, description: string, color: string) => {
        const newHabit: Habit = {
            id: Crypto.randomUUID(),
            name,
            description,
            createdAt: getTodayDate(),
            color,
        };
        setHabits((prev) => [...prev, newHabit]);
    };

    const deleteHabit = (id: string) => {
        setHabits((prev) => prev.filter((h) => h.id !== id));
        setLogs((prev) => prev.filter((l) => l.habitId !== id));
    };

    const updateHabit = (id: string, name: string, description: string, color: string) => {
        setHabits((prev) =>
            prev.map((h) => (h.id === id ? { ...h, name, description, color } : h))
        );
    };

    const toggleCompletion = (habitId: string, date: string) => {
        setLogs((prev) => {
            const existingLog = prev.find((l) => l.habitId === habitId);
            let newLogs;
            if (existingLog) {
                if (existingLog.datesCompleted.includes(date)) {
                    return prev;
                } else {
                    newLogs = prev.map((l) =>
                        l.habitId === habitId
                            ? { ...l, datesCompleted: [...l.datesCompleted, date] }
                            : l
                    );
                }
            } else {
                newLogs = [...prev, { habitId, datesCompleted: [date] }];
            }

            checkBadges(newLogs || prev);
            return newLogs || prev;
        });
    };

    const getHabitCompletion = (habitId: string, date: string) => {
        const log = logs.find((l) => l.habitId === habitId);
        return log ? log.datesCompleted.includes(date) : false;
    };

    const getStreak = (habitId: string) => {
        const log = logs.find((l) => l.habitId === habitId);
        if (!log) return 0;
        return log.datesCompleted.length;
    };

    const checkBadges = (currentLogs: CompletionLog[]) => {
        const totalCompletions = currentLogs.reduce((acc, log) => acc + log.datesCompleted.length, 0);
        const allDates = currentLogs.flatMap(log => log.datesCompleted);
        const uniqueDays = new Set(allDates).size;

        const newBadges = badges.map(badge => {
            if (badge.unlocked) return badge;

            let unlocked = false;
            if (badge.id === 'rookie' && uniqueDays >= 3) unlocked = true;
            if (badge.id === 'master_of_habits' && totalCompletions >= 100) unlocked = true;

            return { ...badge, unlocked: unlocked ? true : badge.unlocked };
        });

        setBadges(newBadges);
    };

    return (
        <HabitContext.Provider
            value={{
                habits,
                logs,
                badges,
                addHabit,
                deleteHabit,
                updateHabit,
                toggleCompletion,
                getHabitCompletion,
                getStreak,
            }}>
            {children}
        </HabitContext.Provider>
    );
};

export const useHabits = () => {
    const context = useContext(HabitContext);
    if (!context) {
        throw new Error('useHabits must be used within a HabitProvider');
    }
    return context;
};
