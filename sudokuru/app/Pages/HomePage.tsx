import React, {useEffect} from 'react';
import {StyleSheet, View, Platform} from "react-native";
import {Text, Button} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import {StatusBar} from "expo-status-bar";
import CCarousel from "../Components/Home/Carousel";
import {useNavigation} from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Inter_100Thin, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import Header from "../Components/Header";
import DifficultySlider from '../Components/Home/DifficultySlider';
import {getKeyString} from "../Functions/Auth0/token";
import {USERACTIVEGAMESBFFURL} from '@env'



const HomePage = () => {
    const navigation: any = useNavigation();

    // Sudokuru Package Import
    const sudokuru = require("../../node_modules/sudokuru/dist/bundle.js");

    // Sudokuru Package Constants
    const Puzzles = sudokuru.Puzzles;

    const [visible, setVisible] = React.useState(false);
    const showResumeButton = () => setVisible(true);
    const hideResumeButton = () => setVisible(false);

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
        Inter_100Thin, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_700Bold
    });

    if (!fontsLoaded) {
        return null;
    }

 if(Platform.OS === 'web'){
    return (
        <View>
            <Header page={'Home'}/>
            <View>
                <View style={styles.container1}>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#D9A05B', fontSize: 30,  fontWeight: 'bold'}}>Learn </Text>
                        <Text style={{color: '#F2F2F2', fontSize: 30,  fontWeight: 'bold'}}>new strategies</Text>
                    </View>

                    <CCarousel/>

                    <View style={{top:20, flexDirection: 'row', padding: 10}}>
                        <Text style={{color: '#D9A05B', fontSize: 28,  fontWeight: 'bold'}}>Train </Text>
                        <Text style={{color: '#F2F2F2', fontSize: 28,  fontWeight: 'bold'}}>with a strategy</Text>
                    </View>

                    <View style={{padding: 10}}>
                        <Button style={{top:20}} mode="contained" onPress={() => navigation.openDrawer()}>
                            Start Drill
                        </Button>
                    </View>

                    <View style={{top:20, flexDirection: 'row', padding: 10}}>
                        <Text style={{color: '#D9A05B', fontSize: 28,  fontWeight: 'bold'}}>Play </Text>
                        <Text style={{color: '#F2F2F2', fontSize: 28,  fontWeight: 'bold'}}>with a random puzzle</Text>
                    </View>

                    <View style={{top:20, padding: 10}}>
                        <DifficultySlider />
                    </View>

                   <View style={styles.playButtons}>
                       {
                           (visible) ?
                               <Button style={{top:20, right: 40}} mode="outlined" onPress={() => navigation.navigate('Sudoku', {gameOrigin: "resume"})}>
                                   Resume Puzzle
                               </Button> : <></>
                       }

                        <Button style={{top:20}} mode="contained" onPress={() => navigation.navigate('Sudoku', {gameOrigin: "start"})}>
                            Start Puzzle
                        </Button>
                   </View>

                    <StatusBar style="auto" />
                </View>
            </View>
        </View>
    );}
    else{
        return(
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <Button style={styles.loginButton} mode="contained" onPress={() => navigation.openDrawer()}>
                                    Drills
                    </Button>

                    <View>
                        <Text style={{top:-20}}>
                        <Text style={{color: '#D9A05B', fontSize: 30,  fontWeight: 'bold'}}>Discover </Text>
                        <Text style={{color: '#D9A05B', fontSize: 30,  fontWeight: 'bold'}}>new strategies</Text>
                        </Text>
                    </View>

                    <View>
                    <CCarousel/>
                    </View>

                    <View>
                        <Text style={{top:20}}>
                        <Text style={{color: '#D9A05B', fontSize: 28,  fontWeight: 'bold'}}>Train </Text>
                        <Text style={{color: '#F2F2F2', fontSize: 28,  fontWeight: 'bold'}}>with a random puzzle</Text>
                        </Text>
                    </View>

                    <View>
                        <DifficultySlider />
                    </View>


                    <View style={styles.playButtons}>
                        {
                            (visible) ?
                                <Button style={{top:20, right: 40}} mode="outlined" onPress={() => navigation.navigate('Sudoku', {gameOrigin: "resume"})}>
                                    Resume
                                </Button> : <></>
                        }

                        <Button style={{top:20}} mode="contained" onPress={() => navigation.navigate('Sudoku', {gameOrigin: "start"})}>
                            Start
                        </Button>
                    </View>
                    <StatusBar style="auto" />
                </SafeAreaView>
            </SafeAreaProvider>
    );
    }
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
    playButtons: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10
        },
    loginButton:{
        position: 'absolute',
        right: 10,
        top: 45
      },
});

export default HomePage;