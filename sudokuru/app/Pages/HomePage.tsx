// @ts-nocheck
import React, {useEffect} from 'react';
import {StyleSheet, View, Pressable, useWindowDimensions} from "react-native";
import {Text, Button, useTheme} from 'react-native-paper';
import {StatusBar} from "expo-status-bar";
import CCarousel from "../Components/Home/Carousel";
import {useNavigation} from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Inter_100Thin, Inter_200ExtraLight, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import Header from "../Components/Header";
import DifficultySlider from '../Components/Home/DifficultySlider';
import {getKeyString} from "../Functions/Auth0/token";
import {USERACTIVEGAMESBFFURL} from '@env'
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Alert from "react-native-awesome-alerts";

const HomePage = () => {
    const navigation: any = useNavigation();

    // Sudokuru Package Import
    const sudokuru = require("../../node_modules/sudokuru/dist/bundle.js");

    // Sudokuru Package Constants
    const Puzzles = sudokuru.Puzzles;

    const theme = useTheme();

    const size = useWindowDimensions();
    const reSize = Math.min(size.width, size.height) / 25;

    const [resumeVisible, setResumeVisible] = React.useState(false);
    const showResumeButton = () => setResumeVisible(true);
    const hideResumeButton = () => setResumeVisible(false);

    const [learnHelpVisible, setLearnHelpVisible] = React.useState(false);
    const showLearnHelp = () => setLearnHelpVisible(true);
    const hideLearnHelp = () => setLearnHelpVisible(false);

    const [drillHelpVisible, setDrillHelpVisible] = React.useState(false);
    const showDrillHelp = () => setDrillHelpVisible(true);
    const hideDrillHelp = () => setDrillHelpVisible(false);

    const [playHelpVisible, setPlayHelpVisible] = React.useState(false);
    const showPlayHelp = () => setPlayHelpVisible(true);
    const hidePlayHelp = () => setPlayHelpVisible(false);


    useEffect(() => {
        async function grabCurrentGame(url:string) {
            let token = null;
            await getKeyString("access_token").then(result => {
                token = result;
            });

            await Puzzles.getGame(url, token).then(
                (game: JSON) => {
                    if (game !== null) {
                        showResumeButton();
                    }
                    else {
                        hideResumeButton();
                        console.log("User doesn't have an activeGame");
                    }
                });
        }
        grabCurrentGame(USERACTIVEGAMESBFFURL);
    }, []);

    let [fontsLoaded] = useFonts({
        Inter_100Thin, Inter_200ExtraLight, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_700Bold
    });

    if (!fontsLoaded) {
        return null;
    }

    let difficulty = 50;

    const getData = (val) => {
        // do not forget to bind getData in constructor
        console.log(val);
        difficulty = val;
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{height: '100%', width: '100%'}}>
                <Header page={'Home'}/>
                <View style={styles.container}>
                    <View style={styles.container1}>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: theme.colors.onPrimary, fontSize: reSize,  fontWeight: 'bold'}}>Learn </Text>
                            <Text style={{color: theme.colors.primary, fontSize: reSize,  fontWeight: 'bold'}}>new strategies</Text>
                            <Pressable onPress={() => showLearnHelp()}>
                                <MaterialCommunityIcons color={theme.colors.onPrimary} name="help"/>
                            </Pressable>
                        </View>

                        <CCarousel/>

                        <View style={{top:reSize/2, flexDirection: 'row', padding: reSize/4}}>
                            <Text style={{color: theme.colors.onPrimary, fontSize: reSize,  fontWeight: 'bold'}}>Train </Text>
                            <Text style={{color: theme.colors.primary, fontSize: reSize,  fontWeight: 'bold'}}>with a strategy</Text>
                            <Pressable onPress={() => showDrillHelp()}>
                                <MaterialCommunityIcons color={theme.colors.onPrimary} name="help"/>
                            </Pressable>
                        </View>

                        <View style={{padding: reSize/4}}>
                            <Button style={{top:reSize/2}} mode="contained" onPress={() => navigation.openDrawer()}>
                                Start Drill
                            </Button>
                        </View>

                        <View style={{top:20, flexDirection: 'row', padding: reSize/4}}>
                            <Text style={{color: theme.colors.onPrimary, fontSize: reSize,  fontWeight: 'bold'}}>Play </Text>
                            <Text style={{color: theme.colors.primary, fontSize: reSize,  fontWeight: 'bold'}}>with a random puzzle</Text>
                            <Pressable onPress={() => showPlayHelp()}>
                                <MaterialCommunityIcons color={theme.colors.onPrimary} name="help"/>
                            </Pressable>
                        </View>

                        <View style={{top:reSize/2, padding: reSize/4}}>
                            <DifficultySlider sendData={getData}/>
                        </View>

                        <View style={{top: reSize/2, flexDirection: 'row'}}>
                            {
                                (resumeVisible) ?
                                    <Button style={{right: reSize}} mode="outlined" onPress={() => navigation.navigate('Sudoku', {gameOrigin: "resume"})}>
                                        Resume Puzzle
                                    </Button> : <></>
                            }

                            <Button mode="contained" onPress={() => navigation.navigate('Sudoku', {gameOrigin: "start", difficulty: (difficulty / 100)})}>
                                Start Puzzle
                            </Button>
                        </View>

                        <StatusBar style="auto" />
                    </View>
                </View>
                <Alert
                    show={learnHelpVisible}
                    title="Learning Help"
                    message={`Select a strategy to learn by navigating through the carousel.\n\nNavigate the carousel by clicking and dragging left/right or clicking the left/right arrows.\n\nTo proceed to the selected lesson, either click the lesson text or click the "Start Lesson" button.\n\nWe have picked the optimal learning order for you since more advanced strategies require knowledge of proceeding strategies.\n\nStrategies you have already learned will be greyed out, but you will still have access to them.`}
                    messageStyle={{maxWidth: 500}}
                    showConfirmButton={true}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    confirmText={"OK"}
                    confirmButtonColor={theme.colors.background}
                    onConfirmPressed={() => {
                        hideLearnHelp();
                    }}
                />
                <Alert
                    show={drillHelpVisible}
                    title="Drill Help"
                    message={`Drills are a place where you can practice a strategy.\n\nWhen you click the "Start Drill" button, a menu will appear on the left side of your screen with a list of all strategies you can practice.\n\nSelecting a strategy from the list will navigate you to the Drill page. This page has a puzzle where you must use the strategy to solve the next step in the puzzle.`}
                    messageStyle={{maxWidth: 500}}
                    showConfirmButton={true}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    confirmText={"OK"}
                    confirmButtonColor={theme.colors.background}
                    onConfirmPressed={() => {
                        hideDrillHelp();
                    }}
                />
                <Alert
                    show={playHelpVisible}
                    title="Play Help"
                    message={`To play a puzzle, select a difficulty using the difficulty slider and press the "Play Puzzle" button.\n\nYou will only be served puzzles with strategies that you have already learned! This will ensure that you will not encounter a puzzle that you don't have the skills and knowledge to solve.`}
                    messageStyle={{maxWidth: 500}}
                    showConfirmButton={true}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    confirmText={"OK"}
                    confirmButtonColor={theme.colors.background}
                    onConfirmPressed={() => {
                        hidePlayHelp();
                    }}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container1: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
    },
});

export default HomePage;