import React, { useEffect, useRef } from "react";
import { Animated, Easing, ImageBackground } from "react-native";
import backgroundImage from "../assets/background2.jpeg";
import styles from "../src/styles";
import {
  INPUT_RANGE_START,
  INPUT_RANGE_END,
  OUTPUT_RANGE_START,
  OUTPUT_RANGE_END,
  ANIMATION_TO_VALUE,
  ANIMATION_DURATION,
} from "../src/constants";

const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

export default function BackgroundAnimation() {
  const initialValue = 0;
  const translateValue = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    const translate = () => {
      translateValue.setValue(initialValue);
      Animated.timing(translateValue, {
        toValue: ANIMATION_TO_VALUE,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => translate());
    };

    translate();
  }, [translateValue]);

  const translateAnimation = translateValue.interpolate({
    inputRange: [INPUT_RANGE_START, INPUT_RANGE_END],
    outputRange: [OUTPUT_RANGE_START, OUTPUT_RANGE_END],
  });

  return (
    <AnimatedImage
      resizeMode="repeat"
      style={[
        styles.background,
        {
          transform: [
            {
              translateX: translateAnimation,
            },
            {
              translateY: translateAnimation,
            },
          ],
        },
      ]}
      source={backgroundImage}
    />
  );
}
