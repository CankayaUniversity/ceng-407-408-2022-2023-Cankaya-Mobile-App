import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Background from "./Background";
import Btn from "./Btn";
import { cankayaBlue } from "./Constants";
import Logo from "./Logo";

const Home = (props) => {
  return (
    <Background>
      <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
        <View style={{ alignItems: "center", marginBottom: 60 }}>
          <Logo />
        </View>
        <Btn
          bgColor="white"
          textColor={cankayaBlue}
          btnLabel="Giriş yap"
          Press={() => props.navigation.navigate("Login")}
        />
        <Btn
          bgColor="white"
          textColor={cankayaBlue}
          btnLabel="Kayıt ol"
          Press={() => props.navigation.navigate("Signup")}
        />
        <Btn
          bgColor="white"
          textColor={cankayaBlue}
          btnLabel="Misafir girişi"
          Press={() => props.navigation.navigate("Guest")}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({});
export default Home;
