import { getCellSize } from "../Functions/BoardFunctions";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import { CellType } from "../../../Functions/LocalDatabase";

let fallbackHeight = 30;

interface RenderCellProps {
  disable: boolean;
  entry: any; // todo find some way to derive this from type instad of duplicate
  type: CellType;
  onClick: (r: number, c: number, event: any) => void;
  backgroundColor: string;
  noteColor: string[];
  backgroundNoteColor: string[];
  c: number;
  r: number;
}

const Cell = (props: RenderCellProps) => {
  const {
    disable,
    entry,
    type,
    onClick,
    backgroundColor,
    c,
    r,
    noteColor,
    backgroundNoteColor,
  } = props;
  const cellSize = getCellSize();

  /**
   * Generates note text for each note if the note exists in the cell.
   * @param noteIndex The index of the note.
   * @returns void or a text component for the note index of a cell.
   */
  const getNoteContents = (
    noteIndex: number,
    noteColor: string[],
    backgroundNoteColor: string[]
  ) => {
    if (entry.includes(noteIndex)) {
      const styleVal: StyleProp<TextStyle> = {
        fontSize: cellSize ? cellSize / 4.5 : fallbackHeight / 4,
        fontFamily: "Inter_200ExtraLight",
        color: noteColor[noteIndex - 1],
        backgroundColor: backgroundNoteColor[noteIndex - 1],
        fontWeight: "bold",
        alignSelf: "center",
      };
      return <Text style={styleVal}>{noteIndex}</Text>;
    }
  };

  /**
   * This generates a string used for testid to determine the contents of a cell
   * @returns A string representing the contents of the cell
   */
  const getCellContents = () => {
    let contents = "";
    if (type === "note") {
      contents += "notes:";
      for (let i = 1; i <= 9; i++) {
        if (entry.includes(i)) {
          contents += i.toString();
        }
      }
    } else {
      contents += "value:";
      contents += entry.toString();
    }
    return contents;
  };

  const getOutsideBorderWidth = () => {
    return cellSize ? cellSize * (3 / 40) : 40;
  };

  return (
    <Pressable
      onPress={(event: any) => {
        onClick(r, c, event);
      }}
      style={{ outline: "none" }}
      disabled={disable}
    >
      <View
        testID={"cellr" + r + "c" + c + getCellContents()}
        style={[
          {
            height: cellSize ? cellSize : fallbackHeight,
            width: cellSize ? cellSize : fallbackHeight,
            display: "flex",
            justifyContent: "center",
            borderWidth: cellSize ? cellSize / 40 : fallbackHeight / 40,
            backgroundColor: backgroundColor,
          },
          c % 3 === 0 ? { borderLeftWidth: getOutsideBorderWidth() } : null,
          r % 3 === 0 ? { borderTopWidth: getOutsideBorderWidth() } : null,
          c === 8 ? { borderRightWidth: getOutsideBorderWidth() } : null,
          r === 8 ? { borderBottomWidth: getOutsideBorderWidth() } : null,
        ]}
      >
        {type === "note" ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={styles(cellSize).noteViewElement} testID={"note1"}>
                {getNoteContents(1, noteColor, backgroundNoteColor)}
              </View>
              <View style={styles(cellSize).noteViewElement} testID={"note2"}>
                {getNoteContents(2, noteColor, backgroundNoteColor)}
              </View>
              <View style={styles(cellSize).noteViewElement} testID={"note3"}>
                {getNoteContents(3, noteColor, backgroundNoteColor)}
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles(cellSize).noteViewElement} testID={"note4"}>
                {getNoteContents(4, noteColor, backgroundNoteColor)}
              </View>
              <View style={styles(cellSize).noteViewElement} testID={"note5"}>
                {getNoteContents(5, noteColor, backgroundNoteColor)}
              </View>
              <View style={styles(cellSize).noteViewElement} testID={"note6"}>
                {getNoteContents(6, noteColor, backgroundNoteColor)}
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles(cellSize).noteViewElement} testID={"note7"}>
                {getNoteContents(7, noteColor, backgroundNoteColor)}
              </View>
              <View style={styles(cellSize).noteViewElement} testID={"note8"}>
                {getNoteContents(8, noteColor, backgroundNoteColor)}
              </View>
              <View style={styles(cellSize).noteViewElement} testID={"note9"}>
                {getNoteContents(9, noteColor, backgroundNoteColor)}
              </View>
            </View>
          </View>
        ) : entry != 0 ? (
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: cellSize
                ? cellSize * (3 / 4) + 1
                : fallbackHeight * (3 / 4) + 1,
              textAlign: "center",
              lineHeight: cellSize ? cellSize : fallbackHeight,
            }}
          >
            {entry}
          </Text>
        ) : (
          <></>
        )}
      </View>
    </Pressable>
  );
};

const styles = (cellSize?: number) =>
  StyleSheet.create({
    noteViewElement: {
      width: cellSize ? cellSize / 4.5 : fallbackHeight / 4.5,
      height: cellSize ? cellSize / 4.5 : fallbackHeight / 4.5,
      margin: 1,
    },
  });

export default Cell;
