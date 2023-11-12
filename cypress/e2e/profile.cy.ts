import {
  GOLD_COLOR_RGB,
  IDENTICAL_VALUE_COLOR_RGB,
  NOT_HIGHLIGHTED_COLOR_RGB,
  PEER_SELECTED_COLOR_RGB,
  PURPLE_COLOR_RGB,
} from "../../app/Styling/HighlightColors";
import {
  CELL,
  DARK_THEME_DISABLED_TOGGLE,
  DARK_THEME_ENABLED_TOGGLE,
  HIGHLIGHT_BOX_DISABLED,
  HIGHLIGHT_BOX_ENABLED,
  HIGHLIGHT_COLUMN_DISABLED,
  HIGHLIGHT_COLUMN_ENABLED,
  HIGHLIGHT_IDENTICAL_VALUES_DISABLED,
  HIGHLIGHT_IDENTICAL_VALUES_ENABLED,
  HIGHLIGHT_ROW_DISABLED,
  HIGHLIGHT_ROW_ENABLED,
  OPEN_DRAWER_NAVIGATION,
  PLAY_DRAWER_BUTTON,
  SUDOKU_BOARD,
  VIEW_HOME_PAGE_BUTTON,
  VIEW_PROFILE_PAGE_BUTTON,
} from "../global/testIds";

describe("Profile Tests", () => {
  // Before tests insert learned lessons in localstorage
  beforeEach(() => {
    window.localStorage.setItem(
      "active_game",
      '[{"puzzle":"123458976400397821789162453007080160000503798090070340000705209512000607970000504","puzzleSolution":"123458976456397821789162453237984165641523798895671342364715289512849637978236514","moves":[{"puzzleCurrentState":"123458976400397821789162453007080160000503798090070340000705209512000607970000504","puzzleCurrentNotesState":"000000000000000000000000000011000000010001000010001010001001010000000000000000000000000000000011000000000000001110000000101000000000000001101000000000000000000000000000000000011000000000000000000000100101000100011010000101010000000000000001010000000000000000000000000000010000001000000000010001000000000000000000011010001010000000000000000000000000000000000000110100000000000000101100000001100000111000000000000000000000000000000000000100001000000000100001000000000000000100001100001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000101000010001000010101000010000000000000000000000000000010010000000000000010010000000000000000000000000000000"}],"strategies":["NAKED_SINGLE","HIDDEN_SINGLE"],"difficulty":112,"drillStrategies":["NAKED_SINGLE","POINTING_PAIR","POINTING_TRIPLET"],"currentTime":10,"numHintsUsed":31,"numWrongCellsPlayed":0}]'
    );
    cy.visit("");
    cy.get(VIEW_PROFILE_PAGE_BUTTON).click();
  });

  // testing color of Home Button to validate theme changes
  it("Theme toggle is functional", () => {
    cy.get(VIEW_HOME_PAGE_BUTTON)
      .children()
      .should("have.css", "color", GOLD_COLOR_RGB);
    cy.get(DARK_THEME_ENABLED_TOGGLE).click();
    cy.get(DARK_THEME_DISABLED_TOGGLE).should("exist");
    cy.get(VIEW_HOME_PAGE_BUTTON)
      .children()
      .should("have.css", "color", PURPLE_COLOR_RGB);

    cy.reload();
    cy.get(VIEW_PROFILE_PAGE_BUTTON).click();

    cy.get(VIEW_HOME_PAGE_BUTTON)
      .children()
      .should("have.css", "color", PURPLE_COLOR_RGB);
    cy.get(DARK_THEME_DISABLED_TOGGLE).should("exist");
    cy.get(DARK_THEME_DISABLED_TOGGLE).click();
    cy.get(DARK_THEME_ENABLED_TOGGLE).should("exist");
    cy.get(VIEW_HOME_PAGE_BUTTON)
      .children()
      .should("have.css", "color", GOLD_COLOR_RGB);
  });

  it("Highlight Identical Values toggle is functional", () => {
    cy.get(HIGHLIGHT_IDENTICAL_VALUES_ENABLED).click();
    cy.get(HIGHLIGHT_IDENTICAL_VALUES_DISABLED).should("exist");

    cy.reload();
    cy.get(VIEW_PROFILE_PAGE_BUTTON).click();
    cy.get(HIGHLIGHT_IDENTICAL_VALUES_DISABLED).should("exist");

    cy.get(OPEN_DRAWER_NAVIGATION).filter(":visible").click();
    cy.get(PLAY_DRAWER_BUTTON).click();
    cy.contains("Resume Puzzle").click();

    cy.get(SUDOKU_BOARD).within(() => {
      cy.get(CELL(0, 0)).click();
      cy.Cell_Should_Have_Color(1, 8, NOT_HIGHLIGHTED_COLOR_RGB);
      cy.Cell_Should_Have_Color(7, 1, NOT_HIGHLIGHTED_COLOR_RGB);
      cy.Cell_Should_Have_Color(2, 3, NOT_HIGHLIGHTED_COLOR_RGB);
      cy.Cell_Should_Have_Color(3, 6, NOT_HIGHLIGHTED_COLOR_RGB);
    });

    cy.get(VIEW_PROFILE_PAGE_BUTTON).filter(":visible").click();
    cy.get(HIGHLIGHT_IDENTICAL_VALUES_DISABLED).click();
    cy.get(HIGHLIGHT_IDENTICAL_VALUES_ENABLED).should("exist");

    cy.get(OPEN_DRAWER_NAVIGATION).filter(":visible").click();
    cy.get(PLAY_DRAWER_BUTTON).click();

    cy.get(SUDOKU_BOARD).within(() => {
      cy.get(CELL(0, 0)).click();
      cy.Cell_Should_Have_Color(1, 8, IDENTICAL_VALUE_COLOR_RGB);
      cy.Cell_Should_Have_Color(7, 1, IDENTICAL_VALUE_COLOR_RGB);
      cy.Cell_Should_Have_Color(2, 3, IDENTICAL_VALUE_COLOR_RGB);
      cy.Cell_Should_Have_Color(3, 6, IDENTICAL_VALUE_COLOR_RGB);
    });
  });

  it("Highlight Box is functional", () => {
    cy.get(HIGHLIGHT_BOX_ENABLED).click();
    cy.get(HIGHLIGHT_BOX_DISABLED).should("exist");

    cy.reload();
    cy.get(VIEW_PROFILE_PAGE_BUTTON).click();
    cy.get(HIGHLIGHT_BOX_DISABLED).should("exist");

    cy.get(OPEN_DRAWER_NAVIGATION).filter(":visible").click();
    cy.get(PLAY_DRAWER_BUTTON).click();
    cy.contains("Resume Puzzle").click();

    cy.get(SUDOKU_BOARD).within(() => {
      cy.get(CELL(1, 1)).click();
      cy.Board_Should_Have_Color_Except_For_Groups(
        1,
        1,
        -1,
        NOT_HIGHLIGHTED_COLOR_RGB
      );
      cy.Cell_Should_Have_Color(0, 0, NOT_HIGHLIGHTED_COLOR_RGB);
    });

    cy.get(VIEW_PROFILE_PAGE_BUTTON).filter(":visible").click();
    cy.get(HIGHLIGHT_BOX_DISABLED).click();
    cy.get(HIGHLIGHT_BOX_ENABLED).should("exist");

    cy.get(OPEN_DRAWER_NAVIGATION).filter(":visible").click();
    cy.get(PLAY_DRAWER_BUTTON).click();

    cy.get(SUDOKU_BOARD).within(() => {
      cy.get(CELL(1, 1)).click();
      cy.Board_Should_Have_Color_Except_For_Groups(
        1,
        1,
        0,
        NOT_HIGHLIGHTED_COLOR_RGB
      );
      cy.Cell_Should_Have_Color(0, 0, PEER_SELECTED_COLOR_RGB);
    });
  });

  it("Highlight Row is functional", () => {
    cy.get(HIGHLIGHT_ROW_ENABLED).click();
    cy.get(HIGHLIGHT_ROW_DISABLED).should("exist");

    cy.reload();
    cy.get(VIEW_PROFILE_PAGE_BUTTON).click();
    cy.get(HIGHLIGHT_ROW_DISABLED).should("exist");

    cy.get(OPEN_DRAWER_NAVIGATION).filter(":visible").click();
    cy.get(PLAY_DRAWER_BUTTON).click();
    cy.contains("Resume Puzzle").click();

    cy.get(SUDOKU_BOARD).within(() => {
      cy.get(CELL(1, 1)).click();
      cy.Board_Should_Have_Color_Except_For_Groups(
        -1,
        1,
        0,
        NOT_HIGHLIGHTED_COLOR_RGB
      );
    });

    cy.get(VIEW_PROFILE_PAGE_BUTTON).filter(":visible").click();
    cy.get(HIGHLIGHT_ROW_DISABLED).click();
    cy.get(HIGHLIGHT_ROW_ENABLED).should("exist");

    cy.get(OPEN_DRAWER_NAVIGATION).filter(":visible").click();
    cy.get(PLAY_DRAWER_BUTTON).click();

    cy.get(SUDOKU_BOARD).within(() => {
      cy.get(CELL(1, 1)).click();
      cy.Board_Should_Have_Color_Except_For_Groups(
        1,
        1,
        0,
        NOT_HIGHLIGHTED_COLOR_RGB
      );
      cy.Cell_Should_Have_Color(1, 3, PEER_SELECTED_COLOR_RGB);
    });
  });

  it("Highlight Column is functional", () => {
    cy.get(HIGHLIGHT_COLUMN_ENABLED).click();
    cy.get(HIGHLIGHT_COLUMN_DISABLED).should("exist");

    cy.reload();
    cy.get(VIEW_PROFILE_PAGE_BUTTON).click();
    cy.get(HIGHLIGHT_COLUMN_DISABLED).should("exist");

    cy.get(OPEN_DRAWER_NAVIGATION).filter(":visible").click();
    cy.get(PLAY_DRAWER_BUTTON).click();
    cy.contains("Resume Puzzle").click();

    cy.get(SUDOKU_BOARD).within(() => {
      cy.get(CELL(1, 1)).click();
      cy.Board_Should_Have_Color_Except_For_Groups(
        1,
        -1,
        0,
        NOT_HIGHLIGHTED_COLOR_RGB
      );
    });

    cy.get(VIEW_PROFILE_PAGE_BUTTON).filter(":visible").click();
    cy.get(HIGHLIGHT_COLUMN_DISABLED).click();
    cy.get(HIGHLIGHT_COLUMN_ENABLED).should("exist");

    cy.get(OPEN_DRAWER_NAVIGATION).filter(":visible").click();
    cy.get(PLAY_DRAWER_BUTTON).click();

    cy.get(SUDOKU_BOARD).within(() => {
      cy.get(CELL(1, 1)).click();
      cy.Board_Should_Have_Color_Except_For_Groups(
        1,
        1,
        0,
        NOT_HIGHLIGHTED_COLOR_RGB
      );
      cy.Cell_Should_Have_Color(3, 1, PEER_SELECTED_COLOR_RGB);
    });
  });
});