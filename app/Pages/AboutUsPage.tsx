import React from "react";
import { Linking, ScrollView, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import {
  calculateCardsPerRow,
  CARD_PADDING,
  CARD_WIDTH,
} from "../Components/Home/Cards";
import { useNewWindowDimensions } from "../Functions/WindowDimensions";
import { teamMembers } from "../Data/members";

const AboutUsPage = () => {
  const windowSize = useNewWindowDimensions();

  const theme = useTheme();

  let teamCards = [];
  let subArray = [];
  let columnCount: number = calculateCardsPerRow(
    windowSize.width,
    teamMembers.length
  );

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  for (let i = 0; i < teamMembers.length; i++) {
    subArray.push(
      <View
        key={teamMembers[i].name}
        testID={teamMembers[i].name}
        style={{
          width: CARD_WIDTH,
          height: CARD_WIDTH / 3,
          borderWidth: 1,
          borderColor: theme.colors.secondary,
          padding: 5,
          margin: 10,
        }}
      >
        <Button
          icon="github"
          onPress={() => openLink(teamMembers[i].github)}
          testID={`button-${teamMembers[i].name}`}
        >
          {teamMembers[i].name}
        </Button>
        <Text>Active: {teamMembers[i].active}</Text>
        {teamMembers[i].specialty && (
          <Text>Specialty: {teamMembers[i].specialty}</Text>
        )}
      </View>
    );

    // Add row
    if ((i + 1) % columnCount === 0) {
      teamCards.push(subArray);
      subArray = [];
    }
  }
  // Add last row if not evenly divisible
  if (subArray.length > 0) {
    teamCards.push(subArray);
  }

  return (
    <ScrollView>
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: 50,
          lineHeight: 50,
          fontWeight: "bold",
          alignSelf: "center",
        }}
      >
        About Us
      </Text>
      <View style={{ marginHorizontal: "1%" }}>
        <Text variant="headlineSmall">Mission</Text>
        <Text variant="bodyLarge">
          {/* Note: The following text is duplicated in the README.md file */}
          Sudokuru is an open-source project focused on developing a
          world-class, cross-platform Sudoku app. We aim to provide a delightful
          user experience while also contributing to the community by building a
          collection of reusable software modules. These modules are designed to
          be free, well-documented, modern, and interoperable, allowing
          developers to easily incorporate them into their own Sudoku-related
          projects.
        </Text>
        <Text variant="headlineSmall">History</Text>
        <Text variant="bodyLarge">
          Sudokuru was founded in 2022 by a group of computer science students
          at the University of Central Florida for a senior design project.
          Members of this original team have continued developing the app after
          graduation with a current goal of launching the official production
          website in early 2025 and on mobile appstores later that year.
        </Text>
        <Text variant="headlineSmall">Team</Text>
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {teamCards.map((subArray, index) => (
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
              }}
              key={index}
            >
              {subArray}
            </View>
          ))}
        </View>
        <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
          <Button
            icon="github"
            onPress={() => openLink("https://github.com/Sudokuru/Frontend")}
            labelStyle={{ fontSize: 20 }}
          >
            Source Code
          </Button>
          <Button
            icon="youtube"
            onPress={() => openLink("https://www.youtube.com/@SudoKuru")}
            labelStyle={{ fontSize: 20 }}
          >
            YouTube
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutUsPage;
