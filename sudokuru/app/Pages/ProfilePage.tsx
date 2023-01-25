import React from 'react';
import ThemeToggle from "../Components/Profile/ThemeToggle";
import LoginButton from "../Components/Auth0/LoginButton";
import {StyleSheet, View} from "react-native";
import {Text} from 'react-native-paper';
import SaveGamePreferencesToggle from "../Components/Profile/SaveGamePreferencesToggle";
import StatisticsButton from "../Components/Statistics/StatisticsButton";
import HomeButton from "../Components/Home/HomeButton";

const ProfilePage = () => {

    return (
        <View>
            <View style={styles.toggleIcons}>
                <View style={styles.profileHeader}>
                    <Text style={styles.profileText}>Profile Page</Text>
                </View>
                <View style={styles.profileButtons}>
                    <StatisticsButton></StatisticsButton>
                    <HomeButton></HomeButton>
                    <LoginButton></LoginButton>
                </View>
            </View>
            <ThemeToggle></ThemeToggle>
            <SaveGamePreferencesToggle></SaveGamePreferencesToggle>
        </View>
    );
};

const styles = StyleSheet.create({
    toggleIcons: {
        flexDirection: 'row',
        margin: 5
    },
    profileHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    profileText: {
        fontSize: 20,
    },
    profileButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default ProfilePage;