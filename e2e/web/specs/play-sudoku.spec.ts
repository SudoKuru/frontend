import { resumeGame } from "../fixture";
import { expect } from "@playwright/test";
import { PlayPage } from "../page/play.page";
import { SudokuBoardComponent } from "../components/sudoku-board.component";
import {
  IDENTICAL_VALUE_COLOR_RGB,
  NOT_HIGHLIGHTED_COLOR_RGB,
  NOT_SELECTED_CONFLICT_COLOR_RGB,
  PEER_SELECTED_COLOR_RGB,
  SELECTED_COLOR_RGB,
  SELECTED_CONFLICT_COLOR_RGB,
} from "../../../app/Styling/HighlightColors";

resumeGame.describe("special sudoku buttons", () => {
  resumeGame("pause button", async ({ page }) => {
    const sudokuBoard = new SudokuBoardComponent(page);
    await sudokuBoard.pause.click();
    const playPage = new PlayPage(page);
    await playPage.playPageIsRendered();
  });
});

resumeGame.describe("board highlighting", () => {
  resumeGame(
    "highlighting should render correctly when a cell is selected",
    async ({ page }) => {
      const sudokuBoard = new SudokuBoardComponent(page);
      await sudokuBoard.cellHasColor(7, 6, NOT_SELECTED_CONFLICT_COLOR_RGB);
      await sudokuBoard.cellHasColor(7, 7, NOT_HIGHLIGHTED_COLOR_RGB);
      await sudokuBoard.cell[7][7].click();
      for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
          if (row === 7 && column === 6) {
            sudokuBoard.cellHasColor(
              row,
              column,
              NOT_SELECTED_CONFLICT_COLOR_RGB
            );
          } else if (row === 7 && column === 7) {
            sudokuBoard.cellHasColor(row, column, SELECTED_COLOR_RGB);
          } else if (row === 7) {
            sudokuBoard.cellHasColor(row, column, PEER_SELECTED_COLOR_RGB);
          } else if (column === 7 && row !== 7) {
            sudokuBoard.cellHasColor(row, column, PEER_SELECTED_COLOR_RGB);
          } else if (row > 5 && column > 5) {
            sudokuBoard.cellHasColor(row, column, PEER_SELECTED_COLOR_RGB);
          } else {
            sudokuBoard.cellHasColor(row, column, NOT_HIGHLIGHTED_COLOR_RGB);
          }
        }
      }
    }
  );

  // TODO: Add test: Board Highlighting should render correctly when cell is unselected

  resumeGame(
    "Board Highlighting should render correctly when cell value is entered",
    async ({ page }) => {
      const sudokuBoard = new SudokuBoardComponent(page);
      await sudokuBoard.cell[7][7].click();
      await sudokuBoard.cell[7][7].press("1");
      for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
          if (
            (row === 0 && column === 0) ||
            (row === 1 && column === 8) ||
            (row === 2 && column === 4) ||
            (row === 3 && column === 3) ||
            (row === 4 && column === 1) ||
            (row === 5 && column === 6) ||
            (row === 6 && column === 2) ||
            (row === 7 && column === 5) ||
            (row === 8 && column === 7)
          ) {
            sudokuBoard.cellHasColor(row, column, IDENTICAL_VALUE_COLOR_RGB);
          } else if (row === 7 && column === 6) {
            sudokuBoard.cellHasColor(
              row,
              column,
              NOT_SELECTED_CONFLICT_COLOR_RGB
            );
          } else if (row === 7 && column === 7) {
            sudokuBoard.cellHasColor(row, column, SELECTED_CONFLICT_COLOR_RGB);
          } else if (row === 7 || column == 7 || (row > 5 && column > 5)) {
            sudokuBoard.cellHasColor(row, column, PEER_SELECTED_COLOR_RGB);
          } else {
            sudokuBoard.cellHasColor(row, column, NOT_HIGHLIGHTED_COLOR_RGB);
          }
        }
      }
    }
  );
});
