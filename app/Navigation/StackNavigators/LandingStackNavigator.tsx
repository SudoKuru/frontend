import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import LandingPage from "../../Pages/LandingPage";
import ProfilePage from "../../Pages/ProfilePage";
import StatisticsPage from "../../Pages/StatisticsPage";

const Stack = createStackNavigator();

const LandingStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "Sudokuru",
        headerShown: false,
      }}
    >
      <Stack.Screen name="LandingPage" component={LandingPage} />
    </Stack.Navigator>
  );
};

export default LandingStackNavigator;
