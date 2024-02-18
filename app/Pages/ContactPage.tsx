import React from "react";
import { View } from "react-native";
import {
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const ContactPage = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState("");
  const [text, setText] = React.useState("");

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={{ alignItems: "center", alignSelf: "center" }}>
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: 50,
              lineHeight: 50,
              fontWeight: "bold",
            }}
          >
            Contact Us
          </Text>
          <Text variant="headlineSmall">Why are you contacting us today?</Text>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            style={{ width: "220%" }}
            buttons={[
              {
                value: "feature",
                icon: "lightbulb-on",
                label: "Feature Request",
              },
              {
                value: "bug",
                icon: "bug",
                label: "Bug Report",
              },
              { value: "other", icon: "note-text", label: "Other" },
            ]}
          />
          <TextInput
            label="Message"
            value={text}
            style={{ backgroundColor: "white" }}
            textColor="black"
            onChangeText={(text) => setText(text)}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ContactPage;
