import { View, Text } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage(navigation) {
  return (
    <WebView
      source={{
        uri: "https://www.cankaya.edu.tr",
      }}
    />
  );
}
