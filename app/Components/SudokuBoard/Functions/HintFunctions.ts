import { getHint, SudokuStrategy } from "sudokuru";
import { CellProps } from "../../../Functions/LocalDatabase";
import { Hint } from "../SudokuBoard";
import { generateBoxIndex } from "../sudoku";

export const getSudokuHint = (
  puzzle: CellProps[][],
  solution: number[][],
  strategies: SudokuStrategy[]
): Hint => {
  const puzzleState = convertPuzzleStateToSudokuruFormat(puzzle);
  const puzzleSolution = convertPuzzleSolutionToSudokuruFormat(solution);
  let hint = getHint(
    puzzleState.puzzleValues,
    puzzleState.puzzleNotes,
    strategies,
    puzzleSolution
  ) as unknown as Hint;
  hint = hintInjections(hint);
  return hint;
};

/**
 * This function takes in the hint object and overrides / injects values
 * The Frontend uses groups to indicate regions of interest of a hint, whereas sudokuru package uses groups
 * to store what groups cause a strategy to occur. NAKED_SINGLE is not caused by any groups, but Frontend wants to highlight the box
 * @param hint Hint object returned from sudokuru package
 * @returns Updated Hint object
 */
export const hintInjections = (hint: Hint) => {
  if (hint.strategy == "NAKED_SINGLE") {
    hint.groups.push([2, generateBoxIndex(hint.cause[0][0], hint.cause[0][1])]);
  }
  return hint;
};

/**
 * Conversion function to be used for retrieving hints from Sudokuru package.
 * Sudokuru package uses string[][] for solution, while Frontend uses number[][]
 * @param puzzleSolution Sudoku puzzle solution in Frontend format
 * @returns Sudoku puzzle solution in Sudokuru package format
 */
const convertPuzzleSolutionToSudokuruFormat = (
  puzzleSolution: number[][]
): string[][] => {
  const convertedPuzzleSolution: string[][] = [];
  puzzleSolution.forEach(function (value, index) {
    convertedPuzzleSolution.push([]);
    convertedPuzzleSolution[index] = value.map(String);
  });
  return convertedPuzzleSolution;
};

/**
 * Conversion function to be used for retrieving hints from Sudokuru package.
 * Sudokuru package uses two string[][] objects for representing notes and values.
 * @param puzzle Sudoku puzzle notes and values in Frontend format
 * @returns
 */
const convertPuzzleStateToSudokuruFormat = (puzzle: CellProps[][]) => {
  const convertedPuzzleValues: string[][] = [];
  const convertedPuzzleNotes: string[][] = [];
  for (let r = 0; r < puzzle.length; r++) {
    convertedPuzzleValues.push([]);
    for (let c = 0; c < puzzle[r].length; c++) {
      convertedPuzzleNotes.push([]);
      let value: string = "0";
      if (puzzle[r][c].type === "note") {
        const entry = puzzle[r][c].entry as number[];
        for (let n = 0; n < entry.length; n++) {
          convertedPuzzleNotes[c + r * puzzle.length].push(entry[n].toString());
        }
      } else {
        const entry = puzzle[r][c].entry as number;
        value = entry.toString();
      }

      convertedPuzzleValues[r].push(value);
    }
  }
  return {
    puzzleValues: convertedPuzzleValues,
    puzzleNotes: convertedPuzzleNotes,
  };
};