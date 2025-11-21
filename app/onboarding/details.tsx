import { Button } from '@/components/Button';
import { Colors } from '@/constants/Colors';
import { useUser } from '@/context/UserContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UserDetails() {
    const router = useRouter();
    const { avatar } = useLocalSearchParams<{ avatar: string }>();
    const { updateUser, completeOnboarding } = useUser();

    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');

    const handleFinish = async () => {
        if (name && gender && age && avatar) {
            await updateUser({
                name,
                gender,
                age,
                avatar,
                hasCompletedOnboarding: true,
            });
            // We don't need to call completeOnboarding separately as we set the flag above,
            // but for clarity/future-proofing:
            // await completeOnboarding(); 

            router.replace('/(tabs)/home');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Tell us about you</Text>
                <Text style={styles.subtitle}>Help us personalize your experience.</Text>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your name"
                            placeholderTextColor={Colors.textMuted}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Gender</Text>
                        <View style={styles.genderContainer}>
                            {['Male', 'Female'].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.genderButton,
                                        gender === option && styles.genderButtonSelected,
                                    ]}
                                    onPress={() => setGender(option)}
                                >
                                    <Text
                                        style={[
                                            styles.genderButtonText,
                                            gender === option && styles.genderButtonTextSelected,
                                        ]}
                                    >
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Age</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your age"
                            placeholderTextColor={Colors.textMuted}
                            value={age}
                            onChangeText={setAge}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <Button
                    title="Finish Setup"
                    onPress={handleFinish}
                    disabled={!name || !gender || !age}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
    content: {
        flex: 1,
        paddingTop: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: 40,
    },
    form: {
        gap: 24,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: '600',
    },
    input: {
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: 16,
        color: Colors.text,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    footer: {
        paddingVertical: 20,
    },
    genderContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    genderButton: {
        flex: 1,
        backgroundColor: Colors.surface,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
    },
    genderButtonSelected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    genderButtonText: {
        fontSize: 16,
        color: Colors.text,
        fontWeight: '600',
    },
    genderButtonTextSelected: {
        color: '#000', // Assuming primary color is bright, black text might look better. Or Colors.background if it's dark. Let's stick to black for contrast on bright green.
    },
});
