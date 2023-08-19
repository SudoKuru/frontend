import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, useTheme } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const StatisticsButton = () => {
  const navigation: any = useNavigation();
  const theme = useTheme();

  return (
    <Button
      mode="contained"
      testID={"ViewStatisticsPageButton"}
      style={{ marginLeft: 5, marginRight: 5 }}
      onPress={() => navigation.navigate("Statistics")}
    >
      <MaterialCommunityIcons
        name="chart-line"
        size={26}
        color={theme.colors.onPrimaryContainer}
      />
    </Button>
  );
};

export default StatisticsButton;