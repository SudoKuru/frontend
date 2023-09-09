import {
  NOT_HIGHLIGHTED_COLOR_RGB,
  PEER_SELECTED_COLOR_RGB,
  SELECTED_COLOR_RGB,
  IDENTICAL_VALUE_COLOR_RGB,
  NOT_SELECTED_CONFLICT_COLOR_RGB,
  SELECTED_CONFLICT_COLOR_RGB,
  REMOVE_NOTE_TEXT_COLOR_RGB,
  NOTE_TEXT_COLOR_RGB,
  PLACE_NOTE_TEXT_COLOR_RGB,
} from "../../app/Styling/HighlightColors";

describe("Sudoku play component functions", () => {
  // Before tests insert learned lessons in localstorage
  beforeEach(() => {
    window.localStorage.setItem(
      "learned_lessons",
      '["SUDOKU_101","AMEND_NOTES","NAKED_SINGLE","SIMPLIFY_NOTES","NAKED_SET","HIDDEN_SINGLE","HIDDEN_SET","POINTING_SET"]'
    );
    window.localStorage.setItem(
      "active_game",
      '[{"puzzle":"003070040006002301089000000000107080517000006000400000271009005095000000000020000","puzzleSolution":"123675948456982371789314562964157283517238496832496157271849635395761824648523719","moves":[{"puzzleCurrentState":"123675948456982371789314562964157283517238496832496157271849635395761100648523719","puzzleCurrentNotesState":"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000110000000000000"}],"strategies":["NAKED_SINGLE","HIDDEN_SINGLE","NAKED_PAIR"],"difficulty":348,"drillStrategies":["NAKED_SINGLE","POINTING_PAIR","POINTING_TRIPLET"],"currentTime":374,"numWrongCellsPlayed":235}]'
    );
    cy.visit("");
    cy.get("[data-testid=OpenDrawerNavigation]").click();
    cy.get("[data-testid=PlayButton]").click();
    cy.contains("Resume Puzzle").click();
  });

  it("Pause button functions", () => {
    cy.get("[data-testid^=PauseButton]").click();
    cy.contains("Resume Puzzle");
  });

  it("Board Highlighting should render correctly when cell is selected", () => {
    cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {
      cy.Cell_Should_Have_Color(7, 6, NOT_SELECTED_CONFLICT_COLOR_RGB);
      cy.Cell_Should_Have_Color(7, 7, NOT_HIGHLIGHTED_COLOR_RGB);
      cy.Select_Cell(7, 7);
      for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
          if (row === 7 && column === 6) {
            cy.Cell_Should_Have_Color(
              row,
              column,
              NOT_SELECTED_CONFLICT_COLOR_RGB
            );
          } else if (row === 7 && column === 7) {
            cy.Cell_Should_Have_Color(row, column, SELECTED_COLOR_RGB);
          } else if (row === 7) {
            cy.Cell_Should_Have_Color(row, column, PEER_SELECTED_COLOR_RGB);
          } else if (column === 7 && row !== 7) {
            cy.Cell_Should_Have_Color(row, column, PEER_SELECTED_COLOR_RGB);
          } else if (row > 5 && column > 5) {
            cy.Cell_Should_Have_Color(row, column, PEER_SELECTED_COLOR_RGB);
          } else {
            cy.Cell_Should_Have_Color(row, column, NOT_HIGHLIGHTED_COLOR_RGB);
          }
        }
      }
    });
  });

  it("Board Highlighting should render correctly when cell value is entered", () => {
    cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {
      cy.Select_Cell(7, 7).type("1");
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
            cy.Cell_Should_Have_Color(row, column, IDENTICAL_VALUE_COLOR_RGB);
          } else if (row === 7 && column === 6) {
            cy.Cell_Should_Have_Color(
              row,
              column,
              NOT_SELECTED_CONFLICT_COLOR_RGB
            );
          } else if (row === 7 && column === 7) {
            cy.Cell_Should_Have_Color(row, column, SELECTED_CONFLICT_COLOR_RGB);
          } else if (row === 7 || column == 7 || (row > 5 && column > 5)) {
            cy.Cell_Should_Have_Color(row, column, PEER_SELECTED_COLOR_RGB);
          } else {
            cy.Cell_Should_Have_Color(row, column, NOT_HIGHLIGHTED_COLOR_RGB);
          }
        }
      }
    });
  });

  for (let i = 1; i <= 9; i++) {
    it(
      "Typing '" +
        i +
        "' in empty cell should fill cell with '" +
        i +
        "' value",
      () => {
        cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {
          cy.Select_Cell(7, 7).type(i.toString());
          cy.get("[data-testid=cellr7c7value\\:" + i + "]").should("exist");
        });
      }
    );
  }

  for (let i = 1; i <= 9; i++) {
    it(
      "Clicking numpad '" +
        i +
        "' in empty cell should fill cell with '" +
        i +
        "' value",
      () => {
        cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {
          cy.Select_Cell(7, 7);
          cy.get("[data-testid=numberControl" + i + "]").click();
          cy.get("[data-testid=cellr7c7value\\:" + i + "]").should("exist");
        });
      }
    );
  }

  for (let i = 1; i <= 9; i++) {
    it(
      "Typing '" + i + "' in empty cell should fill cell with '" + i + "' note",
      () => {
        cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {
          cy.get("[data-testid=toggleNoteModeButton]").click();
          cy.Select_Cell(7, 7).type(i.toString());
          cy.get("[data-testid=cellr7c7notes\\:" + i + "]").should("exist");
        });
      }
    );
  }

  for (let i = 1; i <= 9; i++) {
    it(
      "Clicking numpad '" +
        i +
        "' in empty cell should fill cell with '" +
        i +
        "' note",
      () => {
        cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {
          cy.get("[data-testid=toggleNoteModeButton]").click();
          cy.Select_Cell(7, 7);
          cy.get("[data-testid=numberControl" + i + "]").click();
          cy.get("[data-testid=cellr7c7notes\\:" + i + "]").should("exist");
        });
      }
    );
  }

  it("Board Highlighting should render correctly when undo button is entered", () => {
    cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {
      cy.Select_Cell(7, 7).type("1");
      cy.get("[data-testid=undoButton]").click();
      for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
          if (row === 7 && column === 6) {
            cy.Cell_Should_Have_Color(
              row,
              column,
              NOT_SELECTED_CONFLICT_COLOR_RGB
            );
          } else {
            cy.Cell_Should_Have_Color(row, column, NOT_HIGHLIGHTED_COLOR_RGB);
          }
        }
      }
    });
  });

  it("Undo button should remove value entered on previous move from keypad", () => {
    cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {
      cy.Select_Cell(7, 7).type("1");
      cy.get("[data-testid=undoButton]").click();
      cy.Get_Cell(7, 7).children().should("not.exist");
    });
  });

  //todo write this test
  it.skip("Undo button should remove value entered on previous move from numpad", () => {
    cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {});
  });

  //todo write this test
  it.skip("Undo button should replace value erased on previous move from erase button", () => {
    cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {});
  });

  //todo write this test
  it.skip("Undo button should replace notes erased on previous move from erase button", () => {
    cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {});
  });

  //todo write this test
  it.skip("Undo button should replace value overridden on previous move with keypad", () => {
    cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {});
  });

  //todo write this test
  it.skip("Undo button should replace value overridden on previous move with numpad", () => {
    cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {});
  });

  //todo write this test
  it.skip("Undo button should remove note entered on previous move with numpad", () => {
    cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {});
  });

  //todo write this test
  it.skip("Undo button should remove note entered on previous move with keypad", () => {
    cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {});
  });

  //todo write this test
  it.skip("Undo button should replace note removed on previous move with numpad", () => {
    cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {});
  });

  //todo write this test
  it.skip("Undo button should replace note removed on previous move with keypad", () => {
    cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {});
  });

  it("Selecting invalid cell should update highlighting of cell correctly", () => {
    cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {
      cy.Select_Cell(7, 6);
      cy.Cell_Should_Have_Color(7, 6, SELECTED_CONFLICT_COLOR_RGB);
    });
  });

  it("Erase button should be disabled if a cell with a given is selected", () => {
    cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {
      cy.get("[data-testid=cellr0c2value\\:3]").should("exist");
      cy.Select_Cell(0, 2);
      cy.get("[data-testid=eraseButton]").should(
        "have.css",
        "pointer-events",
        "none"
      );
    });
  });

  //todo write this test
  it.skip("Erase button should be disabled if a cell with a correct value is selected", () => {});

  //todo write this test
  it.skip("Erasing an incorrect value should succeed", () => {});

  //todo break this up into individual tests
  it.only("Should solve game", () => {
    cy.get("[data-testid=" + "sudokuBoard" + "]").within(() => {
      cy.Select_Cell(7, 6);
      cy.get("[data-testid=eraseButton]").click();
      cy.Cell_Should_Have_Color(7, 6, SELECTED_COLOR_RGB);
      cy.get("[data-testid=toggleNoteModeButton]").click();
      cy.Select_Cell(7, 6).type("12");
      cy.get("[data-testid=numberControl3]").click();
      cy.get("[data-testid=cellr7c6notes\\:123]").should("exist");
      cy.get("[data-testid=toggleNoteModeButton]").click();
      cy.Select_Cell(7, 6).type("8");
      cy.get("[data-testid=cellr7c6value\\:8]").should("exist");
      cy.Select_Cell(7, 7).get("[data-testid=numberControl2]").click();
      cy.get("[data-testid=cellr7c7value\\:2]").should("exist");
      cy.get("[data-testid=hintButton]").click();
      cy.get("[data-testid=note4]")
        .children()
        .should("have.css", "color", NOTE_TEXT_COLOR_RGB);
      cy.get("[data-testid=note5]")
        .children()
        .should("have.css", "color", REMOVE_NOTE_TEXT_COLOR_RGB);
      cy.get("[data-testid=rightArrow]")
        .click()
        .get("[data-testid=checkMark]")
        .click();
      cy.get("[data-testid=cellr7c8notes\\:4]").should("exist");
      cy.get("[data-testid=hintButton]").click();
      cy.get("[data-testid=note4]")
        .children()
        .should("have.css", "color", PLACE_NOTE_TEXT_COLOR_RGB);
      cy.get("[data-testid=rightArrow]").click();
      cy.get("[data-testid=sudokuBoard]").should("not.exist");
    });
  });
});
