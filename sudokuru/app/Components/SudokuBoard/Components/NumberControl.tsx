import { useTheme } from "react-native-paper";
import { Pressable, Text, View } from "react-native";
import { range } from "../sudoku";
import React from "react";
import { getCellSize } from "../Functions/BoardFunctions";
import { LinearGradient } from "expo-linear-gradient";

let fallbackHeight = 30;

// todo rewrite

interface NumberControlProps {
  areNumberButtonsDisabled: boolean;
  updateEntry: (inputValue: number) => void;
  getRemainingCellCountOfValue: (inputValue: number) => number;
}

const NumberControl = (props: NumberControlProps) => {
  const { areNumberButtonsDisabled, updateEntry, getRemainingCellCountOfValue } = props;
  const cellSize = getCellSize();
  const theme = useTheme();
  return (
    <View
      style={{
        width: cellSize ? cellSize * 9 : fallbackHeight * 9,
        height: cellSize ? cellSize : fallbackHeight,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {range(9).map((i) => {
        const number = i + 1;
        const onClick = () => {
          updateEntry(number);
        };
        return (
          // Number Keys
          <Pressable
            key={number}
            onPress={onClick}
            disabled={areNumberButtonsDisabled || getRemainingCellCountOfValue(number) === 0} // disable also if cell is correct.
            testID={"numberControl" + number}
          >
            <LinearGradient
              // Button Linear Gradient
              colors={["grey", theme.colors.primaryContainer]}
              locations={[1 - (getRemainingCellCountOfValue(number) / 9), 1 - (getRemainingCellCountOfValue(number) / 9)]}
              style={{              width: cellSize
                ? cellSize * (50 / 60)
                : fallbackHeight * (50 / 60),
              height: cellSize ? cellSize : fallbackHeight,
              alignItems: "center",
              borderRadius: cellSize
              ? cellSize * (10 / 60)
              : fallbackHeight * (10 / 60)}}>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: cellSize
                    ? cellSize * (3 / 4) + 1
                    : fallbackHeight * (3 / 4) + 1,
                  color: theme.colors.onPrimaryContainer,
                }}
                selectable={false}
              >
                {number}
              </Text>
            </LinearGradient>
          </Pressable>
        );
      })}
    </View>
  );
};

export default NumberControl;
