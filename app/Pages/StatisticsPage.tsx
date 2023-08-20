import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, useTheme, ActivityIndicator } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "../Components/Header";
import { useWindowDimensions } from "react-native";
import { USERGAMESTATISTICSBFFURL } from "@env";
import { useNavigation } from "@react-navigation/native";
import { PreferencesContext } from "../Contexts/PreferencesContext";
import { useFocusEffect } from "@react-navigation/core";
import TotalStatistics from "../Components/Statistics/TotalStatistics";
import { retrieveTotalStatistics } from "../Functions/Statistics/StatisticsParsing";
import Alert from "react-native-awesome-alerts";
import { rgba } from "polished";
import { Statistics } from "../Functions/Api/Statistics";

const StatisticsPage = () => {
  const theme = useTheme();
  const navigation: any = useNavigation();

  const size = useWindowDimensions();
  const reSize = Math.min(size.width, size.height);

  const { updateLearnedLessons, learnedLessons } =
    React.useContext(PreferencesContext);

  const [isLoading, setLoading] = React.useState(true);
  const [totalStatistics, setTotalStatistics] = React.useState<any>();

  const [warningVisible, setWarningVisible] = React.useState(false);
  const showWarningButton = () => setWarningVisible(true);
  const hideWarningButton = () => setWarningVisible(false);

  async function deleteUserStatistics() {
    await Statistics.deleteStatistics().then(() => {
      updateLearnedLessons([]);
      navigation.navigate("Home");
    });
  }

  async function getUserStatistics() {
    await Statistics.getStatistics().then((res: any) => {
      if (res) {
        setTotalStatistics(res);
      } else {
        console.log("Cannot get user statistics!");
      }
      setLoading(false);
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      getUserStatistics();
    }, [])
  );

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ height: "100%", width: "100%" }}>
          <Header page="Statistics" />
          <ActivityIndicator animating={true} color={theme.colors.primary} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ height: "100%", width: "100%" }}>
          <ScrollView>
            <Header page="Statistics" />
            <View style={styles.statisticsTitle}>
              <TotalStatistics
                totalScore={totalStatistics.totalScore}
                numGamesPlayed={totalStatistics.numGamesPlayed}
                fastestSolveTime={totalStatistics.fastestSolveTime}
                averageSolveTime={totalStatistics.averageSolveTime}
                totalSolveTime={totalStatistics.totalSolveTime}
                numHintsUsed={totalStatistics.numHintsUsed}
                numWrongCellsPlayed={totalStatistics.numWrongCellsPlayed}
              />
              <Button
                mode="contained"
                onPress={() => {
                  showWarningButton();
                }}
              >
                Delete Statistics
              </Button>
            </View>
          </ScrollView>
        </SafeAreaView>
        <Alert
          show={warningVisible}
          title="Delete Statistics Warning"
          message={`\n\nThis action will delete ALL of your current progress.\nThis includes lesson completions. Do you wish to proceed?\n\n`}
          messageStyle={{ maxWidth: 500 }}
          alertContainerStyle={{
            backgroundColor: rgba(theme.colors.background, 0.3),
          }}
          showConfirmButton={true}
          showCancelButton={true}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          confirmText={"Delete"}
          cancelText={"Cancel"}
          confirmButtonColor="red"
          cancelButtonColor={theme.colors.primary}
          onConfirmPressed={() => {
            deleteUserStatistics(USERGAMESTATISTICSBFFURL);
            hideWarningButton();
          }}
          onCancelPressed={() => {
            hideWarningButton();
          }}
          overlayStyle={{ backgroundColor: "transparent" }}
        />
      </SafeAreaProvider>
    );
  }
};

const styles = StyleSheet.create({
  statisticsTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StatisticsPage;
