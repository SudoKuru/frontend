import { profile } from "./Puzzle.Types";
import { getKeyJSON, storeData } from "../Functions/AsyncStorage";

type profileValue =
  | "theme"
  | "highlightBox"
  | "highlightColumn"
  | "highlightIdenticalValues"
  | "highlightRow"
  | "previewMode"
  | "strategyHintOrder";
export class Profile {
  public static async getProfile(): Promise<profile> {
    const value = await getKeyJSON("profile");
    if (value == null) {
      const profile: profile = {
        theme: true,
        highlightBox: true,
        highlightColumn: true,
        highlightIdenticalValues: true,
        highlightRow: true,
        previewMode: false,
        strategyHintOrder: [
          "AMEND_NOTES",
          "SIMPLIFY_NOTES",
          "NAKED_SINGLE",
          "HIDDEN_SINGLE",
          "NAKED_PAIR",
          "HIDDEN_PAIR",
          "POINTING_PAIR",
          "NAKED_TRIPLET",
          "HIDDEN_TRIPLET",
          "POINTING_TRIPLET",
          "NAKED_QUADRUPLET",
          "HIDDEN_QUADRUPLET",
        ],
      };
      await this.setProfile(profile);
      return profile;
    }
    return value;
  }

  public static async setProfile(profile: profile) {
    storeData("profile", JSON.stringify(profile));
  }

  public static async setProfileValue(
    profileValue: profileValue,
    newValue?: any
  ) {
    let value: profile = await this.getProfile();
    switch (profileValue) {
      case "theme":
        value.theme = !value.theme;
        break;
      case "highlightBox":
        value.highlightBox = !value.highlightBox;
        break;
      case "highlightColumn":
        value.highlightColumn = !value.highlightColumn;
        break;
      case "highlightIdenticalValues":
        value.highlightIdenticalValues = !value.highlightIdenticalValues;
        break;
      case "highlightRow":
        value.highlightRow = !value.highlightRow;
        break;
      case "previewMode":
        value.previewMode = !value.previewMode;
        break;
      case "strategyHintOrder":
        value.strategyHintOrder = newValue;
        break;
    }
    this.setProfile(value);
  }
}
