import { View, Text } from "react-native";
import React from "react";

export default function QR(navigation) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text onPress={() => navigation.navigate("Home")}>QR</Text>
    </View>
  );
}
