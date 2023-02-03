import { View, Text } from "react-native";
import React from "react";
import { darkGreen } from "./Constants";

const Login = () => {
  return (
    <View style={{ alignItems: "center", width: 460 }}>
      <Text
        style={{
          color: "black",
          fontSize: 64,
          fontWeight: "bold",
          marginVertical: 40,
        }}
      >
        Login
      </Text>
      <View
        style={{
          backgroundColor: "yellow",
          height: 900,
          width: 460,
          borderTopLeftRadius: 120,
          paddingTop: 100,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 40, color: darkGreen, fontWeight: "bold" }}>
          Welcome
        </Text>
      </View>
    </View>
  );
};

export default Login;
