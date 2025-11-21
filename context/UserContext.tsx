import { UserProfile } from '@/types';
import { getData, saveData, StorageKeys } from '@/utils/storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
    user: UserProfile | null;
    updateUser: (user: UserProfile) => Promise<void>;
    completeOnboarding: () => Promise<void>;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const userData = await getData(StorageKeys.USER_PROFILE);
            if (userData) {
                setUser(userData);
            }
        } catch (error) {
            console.error('Failed to load user profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = async (newUser: UserProfile) => {
        try {
            await saveData(StorageKeys.USER_PROFILE, newUser);
            setUser(newUser);
        } catch (error) {
            console.error('Failed to save user profile:', error);
        }
    };

    const completeOnboarding = async () => {
        if (user) {
            const updatedUser = { ...user, hasCompletedOnboarding: true };
            await updateUser(updatedUser);
        }
    };

    return (
        <UserContext.Provider value={{ user, updateUser, completeOnboarding, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
