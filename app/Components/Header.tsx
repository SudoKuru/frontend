import React from "react";
import ProfileButton from "./Profile/ProfileButton";
import StatisticsButton from "./Statistics/StatisticsButton";
import { Image, Pressable, StyleSheet, View } from "react-native";
import HomeButton from "./Home/HomeButton";
import { useNavigation } from "@react-navigation/native";
import { PreferencesContext } from "../Contexts/PreferencesContext";
import { IconButton } from "react-native-paper";

interface header {
  page?: string;
}

const Header = (props: header) => {
  const navigation: any = useNavigation();

  const { isThemeDark, updateCurrentPage } =
    React.useContext(PreferencesContext);

  const DARK_LOGO = require("./goldLogoText.png");
  const LIGHT_LOGO = require("./darkBlueLogoText.png");

  let logoUrl = isThemeDark ? DARK_LOGO : LIGHT_LOGO;

  return (
    <View
      style={{
        flexDirection: "row",
        margin: 5,
      }}
    >
      <IconButton
        icon="menu"
        size={20}
        onPress={() => navigation.toggleDrawer()}
      />
      {
        /*
         * If we are on the Landing page, Logo will not navigate to the Landing page
         * If we are on any other page, Logo will navigate to the Landing page
         */
        props.page == "Landing" ? (
          <Image
            style={{
              resizeMode: "cover",
              height: 45,
              width: 100,
            }}
            source={logoUrl}
          />
        ) : (
          <Pressable
            onPress={() => {
              updateCurrentPage("Landing");
              navigation.navigate("Landing");
            }}
          >
            <Image
              style={{
                resizeMode: "cover",
                height: 45,
                width: 100,
              }}
              source={logoUrl}
            />
          </Pressable>
        )
      }
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          marginRight: 15,
          marginLeft: 10,
        }}
      >
        {props.page == "No" ? (
          <></>
        ) : props.page == "Statistics" ? (
          <HomeButton />
        ) : (
          <StatisticsButton />
        )}
        {props.page == "No" ? (
          <></>
        ) : props.page == "Profile" ? (
          <HomeButton />
        ) : (
          <ProfileButton />
        )}
      </View>
    </View>
  );
};

export default Header;
