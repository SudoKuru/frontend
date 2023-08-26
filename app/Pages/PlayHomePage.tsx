import React from "react";
import { View, Pressable, useWindowDimensions } from "react-native";
import { Text, useTheme, ActivityIndicator, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "../Components/Header";
import Alert from "react-native-awesome-alerts";
import { rgba } from "polished";
import { getMinWindowDimensions } from "../Functions/global/WindowDimensions";
import NavigationSideBar from "../Components/NavigationBar";
import { Puzzles } from "../Functions/Api/Puzzles";
import { sudokuStrategyArray } from "sudokuru";

let strategies: sudokuStrategyArray = [
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

const PlayHomePage = () => {
  const navigation: any = useNavigation();

  const size = useWindowDimensions();
  const minWindowSize = getMinWindowDimensions();
  const newSize = minWindowSize / 25;

  const theme = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      // This determines if user has active game and displays resume button conditionally.
      async function grabCurrentGame() {
        await Puzzles.getGame().then((game: any) => {
          if (game !== null && game[0].moves.length > 0) {
            showResumeButton();
          } else {
            hideResumeButton();
          }
        });
      }
      grabCurrentGame();
    }, [])
  );

  const [playHelpVisible, setPlayHelpVisible] = React.useState(false);
  const showPlayHelp = () => setPlayHelpVisible(true);
  const hidePlayHelp = () => setPlayHelpVisible(false);

  const [resumeVisible, setResumeVisible] = React.useState(false);
  const showResumeButton = () => setResumeVisible(true);
  const hideResumeButton = () => setResumeVisible(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ width: size.width, height: size.height }}>
        <Header />
        <View style={{ flexDirection: "row" }}>
          <NavigationSideBar />
          <View
            style={{
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: 50,
                  lineHeight: 50,
                  fontWeight: "bold",
                }}
              >
                Play{" "}
                <Text style={{ color: theme.colors.onBackground }}>
                  a Sudoku game
                </Text>
              </Text>
              <Pressable
                onPress={() => showPlayHelp()}
                style={{ alignSelf: "flex-start" }}
              >
                <Text
                  style={{
                    color: theme.colors.onBackground,
                    lineHeight: 16,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  ?
                </Text>
              </Pressable>
            </View>
            <View style={{ alignItems: "center", alignSelf: "center" }}>
              {resumeVisible ? (
                <Button
                  style={{ margin: newSize / 4 }}
                  mode="outlined"
                  onPress={() =>
                    navigation.navigate("Sudoku", { gameType: "ResumeGame" })
                  }
                >
                  Resume Puzzle
                </Button>
              ) : (
                <></>
              )}
              <Button
                style={{ margin: newSize / 4 }}
                mode="contained"
                onPress={() => {
                  navigation.navigate("Sudoku", {
                    gameType: "StartGame",
                    difficulty: 100,
                    strategies: strategies,
                  });
                }}
              >
                Start Puzzle
              </Button>
            </View>
          </View>
        </View>
        <Alert
          show={playHelpVisible}
          title="Play Help"
          message={
            `To play a puzzle, select a difficulty using the difficulty slider and press the "Play Puzzle" button.\n\n` +
            `You will only be served puzzles with strategies that you have already learned! This will ensure that you will not encounter a puzzle that you don't have the skills and knowledge to solve.` +
            `If you have a game currently in progress, you can resume the game by clicking the "Resume Puzzle" button`
          }
          messageStyle={{ maxWidth: 500 }}
          alertContainerStyle={{
            backgroundColor: rgba(theme.colors.background, 0.3),
          }}
          showConfirmButton={true}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          confirmText={"OK"}
          confirmButtonColor={theme.colors.primary}
          onConfirmPressed={() => {
            hidePlayHelp();
          }}
          overlayStyle={{ backgroundColor: "transparent" }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PlayHomePage;
