import React from 'react';
import {StyleSheet, View, Platform} from "react-native";
import {Text, Button} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import {StatusBar} from "expo-status-bar";
import CCarousel from "../Components/Home/Carousel";
import {useNavigation} from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Inter_100Thin, Inter_200ExtraLight, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import Header from "../Components/Header";

const HomePage = () => {
    const navigation: any = useNavigation();

    let [fontsLoaded] = useFonts({
        Inter_100Thin, Inter_200ExtraLight, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_700Bold
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
                <Button style={{top:0}} mode="contained" onPress={() => navigation.openDrawer()}>
                    Drills
                </Button>
                    <CCarousel/>
                    <Slider
                        style={{width: 200, height: 40}}
                        minimumValue={0}
                        maximumValue={100}
                        step={10}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                    <Button style={{top:50}} mode="contained" onPress={() => navigation.navigate('Sudoku')}>
                        Start
                    </Button>
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
                    <Slider
                    style={{width: 300, height: 40, top:30}}
                    minimumValue={0}
                    maximumValue={100}
                    step={10}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    />
                    </View>
                    <Button style={{top:50}} mode="contained" onPress={() => navigation.navigate('Sudoku')}>
                        Start
                    </Button>


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
    loginButton:{
        position: 'absolute',
        right: 10,
        top: 45
      },
});

export default HomePage;