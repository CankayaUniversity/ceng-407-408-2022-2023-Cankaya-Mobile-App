import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: 1200,
    height: 1200,
    top: 0,
    opacity: 0.8,
    transform: [
      {
        translateX: 0,
      },
      {
        translateY: 0,
      },
    ],
  },
  container: {
    alignItems: "center",
  },
  backgroundFrame: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 50,
    width: 350,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
