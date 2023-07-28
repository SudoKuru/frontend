import React, { useState } from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "../Components/Header";
import { Switch, Text, useTheme } from "react-native-paper";
import {
  getTokenName,
  getTokenNickname,
} from "../Functions/AsyncStorage/token";
import { PreferencesContext } from "../Contexts/PreferencesContext";
import { formatLessonNameArray } from "../Functions/ContextParsing/learnedLessons";
import { useFocusEffect } from "@react-navigation/core";

const ProfilePage = () => {
  const [email, setEmail] = useState<string>();
  const [nickname, setNickname] = useState<string>();

  // This will be run once every time the user goes to the profile page
  // todo in the future, we can have email and nickname be stored in context and be set when user logs in
  // todo this will avoid multiple calls to retrieve the token
  useFocusEffect(
    React.useCallback(() => {
      getTokenName().then((email) => setEmail(email));
      getTokenNickname().then((nickname) => setNickname(nickname));
    }, [])
  );

  const theme = useTheme();

  const size = useWindowDimensions();
  const reSize = Math.min(size.width, size.height);

  const {
    learnedLessons,
    toggleTheme,
    isThemeDark,
    toggleHighlightSet,
    isHighlightSet,
    isHighlightBox,
    toggleHighlightBox,
    toggleHighlightColumn,
    isHighlightColumn,
    toggleHighlightRow,
    isHighlightRow,
  } = React.useContext(PreferencesContext);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Header page={"Profile"} />
        <ScrollView>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 30,
            }}
          >
            <Text
              style={{
                fontSize: reSize / 20,
                color: theme.colors.primary,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Profile
            </Text>
            <View
              style={{ backgroundColor: "#fff", borderRadius: 10, padding: 20 }}
            >
              <View style={{ marginBottom: 10, flexDirection: "row" }}>
                <Text style={{ fontSize: reSize / 22, color: "#025E73" }}>
                  Name:{" "}
                </Text>
                <Text
                  style={{
                    fontSize: reSize / 20,
                    fontWeight: "bold",
                    color: "#D9A05B",
                  }}
                >
                  {nickname}
                </Text>
              </View>
              <View style={{ marginBottom: 10, flexDirection: "row" }}>
                <Text style={{ fontSize: reSize / 22, color: "#025E73" }}>
                  Email:{" "}
                </Text>
                <Text
                  style={{
                    fontSize: reSize / 20,
                    fontWeight: "bold",
                    color: "#D9A05B",
                  }}
                >
                  {email}
                </Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: reSize / 22, color: "#025E73" }}>
                  Strategies Learned:
                </Text>
                <Text
                  style={{
                    fontSize: reSize / 40,
                    fontWeight: "bold",
                    color: "#D9A05B",
                  }}
                >
                  {formatLessonNameArray(learnedLessons)}
                </Text>
              </View>
              <View style={{ marginBottom: 10, flexDirection: "row" }}>
                <Text style={{ fontSize: reSize / 22, color: "#025E73" }}>
                  Theme:{" "}
                </Text>
                <View
                  style={{
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <Switch
                    color={"#025E73"}
                    value={isThemeDark}
                    onValueChange={toggleTheme}
                    testID={
                      isThemeDark ? "DarkThemeEnabled" : "DarkThemeDisabled"
                    }
                    style={{ alignSelf: "center", flexDirection: "column" }}
                  />
                </View>
              </View>
              <View style={{ marginBottom: 10, flexDirection: "row" }}>
                <Text style={{ fontSize: reSize / 22, color: "#025E73" }}>
                  Highlight Peers:{" "}
                </Text>
                <View
                  style={{
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <Switch
                    color={"#025E73"}
                    value={isHighlightSet}
                    onValueChange={toggleHighlightSet}
                    testID={
                      isHighlightSet
                        ? "HighlightPeersEnabled"
                        : "HighlightPeersDisabled"
                    }
                    style={{ alignSelf: "center", flexDirection: "column" }}
                  />
                </View>
              </View>
              <View style={{ marginBottom: 10, flexDirection: "row" }}>
                <Text style={{ fontSize: reSize / 22, color: "#025E73" }}>
                  Highlight Box:{" "}
                </Text>
                <View
                  style={{
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <Switch
                    color={"#025E73"}
                    value={isHighlightBox}
                    onValueChange={toggleHighlightBox}
                    testID={
                      isHighlightBox
                        ? "HighlightBoxEnabled"
                        : "HighlightBoxDisabled"
                    }
                    style={{ alignSelf: "center", flexDirection: "column" }}
                  />
                </View>
              </View>
              <View style={{ marginBottom: 10, flexDirection: "row" }}>
                <Text style={{ fontSize: reSize / 22, color: "#025E73" }}>
                  Highlight Row:{" "}
                </Text>
                <View
                  style={{
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <Switch
                    color={"#025E73"}
                    value={isHighlightRow}
                    onValueChange={toggleHighlightRow}
                    testID={
                      isHighlightRow
                        ? "HighlightRowEnabled"
                        : "HighlightRowDisabled"
                    }
                    style={{ alignSelf: "center", flexDirection: "column" }}
                  />
                </View>
              </View>
              <View style={{ marginBottom: 10, flexDirection: "row" }}>
                <Text style={{ fontSize: reSize / 22, color: "#025E73" }}>
                  Highlight Column:{" "}
                </Text>
                <View
                  style={{
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <Switch
                    color={"#025E73"}
                    value={isHighlightColumn}
                    onValueChange={toggleHighlightColumn}
                    testID={
                      isHighlightColumn
                        ? "HighlightColumnEnabled"
                        : "HighlightColumnDisabled"
                    }
                    style={{ alignSelf: "center", flexDirection: "column" }}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ProfilePage;
