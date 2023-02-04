import React from "react";
import { View, Image } from "react-native";
import LogoCankaya from "../assets/logo.png";

const Logo = ({}) => {
  return (
    <View>
      <Image source={LogoCankaya} style={{ height: 200, width: 200 }} />
    </View>
  );
};
export default Logo;
