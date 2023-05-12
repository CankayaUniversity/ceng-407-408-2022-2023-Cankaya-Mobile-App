import { TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Back = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ alignSelf: "flex-start" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back-circle-outline" size={60} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Back;
