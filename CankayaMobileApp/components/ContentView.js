import { View, StyleSheet } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function ContentView() {
  return (
    <WebView
      style={styles.container}
      originWhitelist={["*"]}
      source={{ uri: "https://www.google.com.tr" }}
    />
  );
}
