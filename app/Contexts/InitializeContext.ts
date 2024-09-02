import React from "react";
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
} from "../Styling/ThemeColors";
import { profile } from "../Api/Puzzle.Types";
import { Profile } from "../Api/Profile";
import { sudokuStrategyArray } from "sudokuru";

const InitializeContext = () => {
  const [darkThemeSetting, setDarkThemeSetting] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState("Landing");
  const [learnedLessons, setLearnedLessons] = React.useState(["NONE"]);
  const [highlightIdenticalValuesSetting, setHighlightIdenticalValuesSetting] =
    React.useState(true);
  const [highlightBoxSetting, setHighlightBoxSetting] = React.useState(true);
  const [highlightRowSetting, setHighlightRowSetting] = React.useState(true);
  const [highlightColumnSetting, setHighlightColumnSetting] =
    React.useState(true);

  const [featurePreviewSetting, setFeaturePreviewSetting] =
    React.useState(false);

  const [strategyHintOrderSetting, setStrategyHintOrderSetting] =
    React.useState<sudokuStrategyArray>([
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
    ]);

  // set initial values of theme
  React.useEffect(() => {
    Profile.getProfile().then((data: profile) => {
      setDarkThemeSetting(data.theme);
      setHighlightIdenticalValuesSetting(data.highlightIdenticalValues);
      setHighlightBoxSetting(data.highlightBox);
      setHighlightRowSetting(data.highlightRow);
      setHighlightColumnSetting(data.highlightColumn);
      setFeaturePreviewSetting(data.previewMode);
      setStrategyHintOrderSetting(data.strategyHintOrder);
    });
  }, []);

  const theme = darkThemeSetting ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    Profile.setProfileValue("theme");
    return setDarkThemeSetting(!darkThemeSetting);
  }, [darkThemeSetting]);

  const updateCurrentPage = React.useCallback(
    (props: React.SetStateAction<string>) => {
      return setCurrentPage(props);
    },
    [currentPage]
  );

  const updateLearnedLessons = React.useCallback(
    (props: React.SetStateAction<string[]>) => {
      return setLearnedLessons(props);
    },
    [learnedLessons]
  );

  const toggleHighlightIdenticalValues = React.useCallback(() => {
    Profile.setProfileValue("highlightIdenticalValues");
    return setHighlightIdenticalValuesSetting(!highlightIdenticalValuesSetting);
  }, [highlightIdenticalValuesSetting]);

  const toggleHighlightBox = React.useCallback(() => {
    Profile.setProfileValue("highlightBox");
    return setHighlightBoxSetting(!highlightBoxSetting);
  }, [highlightBoxSetting]);

  const toggleHighlightRow = React.useCallback(() => {
    Profile.setProfileValue("highlightRow");
    return setHighlightRowSetting(!highlightRowSetting);
  }, [highlightRowSetting]);

  const toggleHighlightColumn = React.useCallback(() => {
    Profile.setProfileValue("highlightColumn");
    return setHighlightColumnSetting(!highlightColumnSetting);
  }, [highlightColumnSetting]);

  const toggleFeaturePreview = React.useCallback(() => {
    Profile.setProfileValue("previewMode");
    return setFeaturePreviewSetting(!featurePreviewSetting);
  }, [featurePreviewSetting]);

  const updateStrategyHintOrder = React.useCallback(
    (props: React.SetStateAction<sudokuStrategyArray>) => {
      Profile.setProfileValue("strategyHintOrder", props);
      return setStrategyHintOrderSetting(props);
    },
    [strategyHintOrderSetting]
  );

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      darkThemeSetting,
      updateCurrentPage,
      currentPage,
      updateLearnedLessons,
      learnedLessons,
      toggleHighlightIdenticalValues,
      highlightIdenticalValuesSetting,
      toggleHighlightBox,
      highlightBoxSetting,
      toggleHighlightRow,
      highlightRowSetting,
      toggleHighlightColumn,
      highlightColumnSetting,
      toggleFeaturePreview,
      featurePreviewSetting,
      updateStrategyHintOrder,
      strategyHintOrderSetting,
    }),
    [
      toggleTheme,
      darkThemeSetting,
      updateCurrentPage,
      currentPage,
      updateLearnedLessons,
      learnedLessons,
      toggleHighlightIdenticalValues,
      highlightIdenticalValuesSetting,
      toggleHighlightBox,
      highlightBoxSetting,
      toggleHighlightRow,
      highlightRowSetting,
      toggleHighlightColumn,
      highlightColumnSetting,
      toggleFeaturePreview,
      featurePreviewSetting,
      updateStrategyHintOrder,
      strategyHintOrderSetting,
    ]
  );

  return {
    theme,
    preferences,
  };
};
export default InitializeContext;
