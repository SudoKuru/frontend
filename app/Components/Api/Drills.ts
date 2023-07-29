import { calculateNotes } from "sudokuru";
import { activeGame } from "../../Types/puzzle.types";
import { drill } from "../../Types/puzzle.types";

const GET_DRILL_GAME: string = "api/v1/drillGames?drillStrategies[]=";

/**
 * Functions to handle requesting drills
 */
export class Drills {
  public static strategies: string[][] = [
    [
      "NAKED_SET",
      "NAKED_SINGLE",
      "NAKED_PAIR",
      "NAKED_TRIPLET",
      "NAKED_QUADRUPLET",
    ],
    [
      "HIDDEN_SET",
      "HIDDEN_SINGLE",
      "HIDDEN_PAIR",
      "HIDDEN_TRIPLET",
      "HIDDEN_QUADRUPLET",
    ],
    ["POINTING_PAIR"],
  ];

  public static async getGame(
    url: string,
    strategy: string,
    token: string
  ): Promise<drill> {
    const res: Response = await fetch(url + GET_DRILL_GAME + strategy, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (res.status === 200) {
      let data: activeGame[] = await res.json();
      let boardString: string = data[0].puzzle;
      let notes: string = calculateNotes(boardString);
      return {
        puzzleCurrentState: boardString,
        puzzleCurrentNotesState: notes,
        puzzleSolution: data[0].puzzleSolution,
      };
    } else if (res.status === 404) {
      return null;
    } else {
      console.log(
        "Error: " + GET_DRILL_GAME + " GET request has status " + res.status
      );
      return null;
    }
  }
}
