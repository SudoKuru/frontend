import React from "react";
import { Platform, Pressable, useWindowDimensions, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import SudokuBoard from "../Components/Sudoku Board/SudokuBoard";
import { Image, StyleSheet } from "react-native";
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import NavigationBar from "../Components/NavigationBar";
import { Surface, Text } from "react-native-paper";

const LandingPage = () => {
  const isWeb = Platform.OS === "web";

  const navigation: any = useNavigation();
  const size = useWindowDimensions();
  const reSize = Math.min(size.width, size.height);

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      height: "100%",
      width: "100%",
      overflow: "hidden",
    },
    main: {
      flexDirection: "column",
      height: "100%",
      width: "100%",
    },
    top: {
      flexDirection: "row",
      height: "45%",
      width: "100%",
    },
    skinnyTop: {
      flexDirection: "column",
      height: "30%",
      width: "100%",
      alignItems: "center",
    },
    bottom: {
      flexDirection: "row",
      height: "15%",
      width: "70%",
      //borderColor: "#d9a05b",
      borderWidth: 3,
      borderRadius: 5,
      //backgroundColor: "#012f39",
      marginHorizontal: 60,
    },
    path: {
      //color: "white",
      fontSize: reSize / 24,
      paddingTop: 60,
    },
    guru: {
      //color: "#d9a05b",
      fontSize: reSize / 16,
      paddingTop: 15,
    },
    quote: {
      //color: "white",
      fontSize: reSize / 28,
      textAlign: "center",
    },
    bottomLeft: {
      flexDirection: "column",
      width: "50%",
    },
    bottomRight: {
      flexDirection: "column",
      width: "50%",
    },
    bottomText: {
      //color: "white",
      fontSize: reSize / 30,
      textAlign: "center",
    },
    pressable: {
      maxHeight: "100%",
      maxWidth: "100%",
    },
    image: {
      resizeMode: "contain",
      maxHeight: "100%",
      maxWidth: "100%",
    },
    animatedBoard: {
      flexDirection: "row",
      flexWrap: "wrap",
      paddingTop: 30,
      paddingHorizontal: 60,
      width: "40%",
    },
    aboveBoard: {
      flexDirection: "column",
      alignItems: "center",
      width: "45%",
    },
    rightOfBoard: {
      flexDirection: "column",
      alignItems: "center",
      width: "35%",
    },
    backgroundWithBorder: {
      marginTop: 30,
      marginHorizontal: "12%",
      //borderColor: "#d9a05b",
      borderWidth: 3,
      borderRadius: 5,
      //backgroundColor: "#012f39",
      maxHeight: "25%",
      maxWidth: "80%",
    },
    buttonBackgroundAndBorder: {
      //borderColor: "#d9a05b",
      borderWidth: 3,
      borderRadius: 5,
      // backgroundColor: "#012f39",
      maxHeight: "40%",
      maxWidth: "70%",
      alignSelf: "center",
    },
  });

  const PLAY_SUDOKU_LOGO = require("./playSudokuLogo.png");
  const START_LESSONS_LOGO = require("./startLessonsLogo.png");
  const START_DRILLS_LOGO = require("./startDrillsLogo.png");

  let strategies = [
    "AMEND_NOTES",
    "SIMPLIFY_NOTES",
    "NAKED_SINGLE",
    "NAKED_PAIR",
    "NAKED_TRIPLET",
    "NAKED_QUADRUPLET",
    "HIDDEN_SINGLE",
    "HIDDEN_PAIR",
    "HIDDEN_TRIPLET",
    "HIDDEN_QUADRUPLET",
  ];

  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  if (isWeb && size.width > size.height / 0.649) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.page}>
          <NavigationBar />
          <View style={styles.main}>
            <View style={styles.top}>
              <View style={styles.animatedBoard}>
                <SudokuBoard gameType={"Demo"} strategies={strategies} />
              </View>
              <View style={styles.rightOfBoard}>
                <Text style={styles.path}>Your path to becoming a</Text>
                <Text style={styles.guru}>Sudoku Guru</Text>
                <Surface style={styles.backgroundWithBorder}>
                  <Text style={styles.quote}>
                    “The journey of a thousand miles begins with one step"
                  </Text>
                  <Text style={styles.quote}>- Lao Tzu</Text>
                </Surface>
                <Surface style={styles.backgroundWithBorder} elevation={5}>
                  <Pressable
                    onPress={() => navigation.navigate("Landing")}
                    style={styles.pressable}
                  >
                    <Image style={styles.image} source={PLAY_SUDOKU_LOGO} />
                  </Pressable>
                </Surface>
              </View>
            </View>
            <Surface style={styles.bottom} elevation={5}>
              <View style={styles.bottomLeft}>
                <Text style={styles.bottomText}>
                  Don't know what Sudoku is?
                </Text>
                <Text style={styles.bottomText}>
                  It's a logic puzzle, learn more with lessons!
                </Text>
                <View style={styles.buttonBackgroundAndBorder}>
                  <Pressable
                    onPress={() => navigation.navigate("Landing")}
                    style={styles.pressable}
                  >
                    <Image style={styles.image} source={START_LESSONS_LOGO} />
                  </Pressable>
                </View>
              </View>
              <View style={styles.bottomRight}>
                <Text style={styles.bottomText}>
                  Want to get faster at Sudoku?
                </Text>
                <Text style={styles.bottomText}>
                  Practice strategies with drills!
                </Text>
                <View style={styles.buttonBackgroundAndBorder}>
                  <Pressable
                    onPress={() => navigation.navigate("Landing")}
                    style={styles.pressable}
                  >
                    <Image style={styles.image} source={START_DRILLS_LOGO} />
                  </Pressable>
                </View>
              </View>
            </Surface>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  } else if (isWeb) {
    return null;
    // <SafeAreaProvider>
    //   <SafeAreaView style={styles.page}>
    //     <NavigationBar page={"Landing"} />
    //     <View style={styles.main}>
    //       <View style={styles.skinnyTop}>
    //         <View style={styles.aboveBoard}>
    //           <Text style={styles.path}>Your path to becoming a</Text>
    //           <Text style={styles.guru}>Sudoku Guru</Text>
    //           <SudokuBoard gameType={"Demo"} strategies={strategies} />
    //         </View>
    //       </View>
    //     </View>
    //   </SafeAreaView>
    // </SafeAreaProvider>
  } else {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ height: "100%", width: "100%" }}></SafeAreaView>
      </SafeAreaProvider>
    );
  }
};

export default LandingPage;
