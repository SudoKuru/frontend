import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Image } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { sudokuStrategyArray } from "sudokuru";

let drillStrategies: sudokuStrategyArray = [
  "NAKED_SINGLE",
  "NAKED_PAIR",
  "NAKED_TRIPLET",
  "NAKED_QUADRUPLET",
  "HIDDEN_SINGLE",
  "HIDDEN_PAIR",
  "HIDDEN_TRIPLET",
  "HIDDEN_QUADRUPLET",
  "POINTING_PAIR",
  "POINTING_TRIPLET",
];

const DrillPanel = (props: any) => {
  const navigation: any = useNavigation();

  let drillButtonArray = [];
  let subArray = [];
  const CARD_WIDTH: number = 200;
  let columnCount: number = Math.floor(props.width / (CARD_WIDTH + 100));
  // Decrease the number of columns to the smallest number that is greater than or equal to the number of rows
  while (
    columnCount - 1 >=
    Math.ceil(drillStrategies.length / (columnCount - 1))
  ) {
    columnCount--;
  }
  for (let i = 0; i < drillStrategies.length; i++) {
    let img;
    switch (i) {
      case 0:
        img = require("./DrillCardImages/NAKED_SINGLE.png");
        break;
      case 1:
        img = require("./DrillCardImages/NAKED_PAIR.png");
        break;
      case 2:
        img = require("./DrillCardImages/NAKED_TRIPLET.png");
        break;
      case 3:
        img = require("./DrillCardImages/NAKED_QUADRUPLET.png");
        break;
      case 4:
        img = require("./DrillCardImages/HIDDEN_SINGLE.png");
        break;
      case 5:
        img = require("./DrillCardImages/HIDDEN_PAIR.png");
        break;
      case 6:
        img = require("./DrillCardImages/HIDDEN_TRIPLET.png");
        break;
      case 7:
        img = require("./DrillCardImages/HIDDEN_QUADRUPLET.png");
        break;
      case 8:
        img = require("./DrillCardImages/POINTING_PAIR.png");
        break;
      case 9:
        img = require("./DrillCardImages/POINTING_TRIPLET.png");
        break;
    }
    subArray.push(
      <View style={{ width: CARD_WIDTH }}>
        <Card>
          <Card.Title
            title=<Text>Title</Text>
            subtitle=<Text>Subtitle</Text>
            left={(props) => <Text>{drillStrategies[i]}</Text>}
          />
          <Card.Content>
            <Text variant="titleLarge">Card title</Text>
            <Text variant="bodyMedium">Card content</Text>
          </Card.Content>
          <Image
            source={img}
            style={{ width: "100%", resizeMode: "contain" }}
          />
          <Card.Actions>
            <Button
              onPress={() => {
                navigation.navigate("DrillGame", {
                  params: drillStrategies[i],
                });
              }}
            >
              Play
            </Button>
          </Card.Actions>
        </Card>
      </View>
    );

    // Add row
    if ((i + 1) % columnCount === 0) {
      drillButtonArray.push(subArray);
      subArray = [];
    }
  }
  // Add last row if not evenly divisible
  if (subArray.length > 0) {
    drillButtonArray.push(subArray);
  }

  // render each sub-array as a row
  return (
    <View style={{ flexWrap: "wrap", flexDirection: "column" }}>
      {drillButtonArray.map((subArray, index) => (
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
  );
};

export default DrillPanel;
