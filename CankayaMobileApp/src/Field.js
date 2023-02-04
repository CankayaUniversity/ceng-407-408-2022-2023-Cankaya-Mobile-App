import { TextInput } from "react-native";
import React from "react";
import { green } from "./Constants";

const Field = (props) => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 100,
        color: "grey",
        paddingHorizontal: 10,
        width: "80%",
        height: "5%",
        backgroundColor: "rgb(220,220,220)",
        marginVertical: 10,
        autoCapitalize: "none",
      }}
      placeholderTextColor="grey"
    ></TextInput>
  );
};

export default Field;
