import { View, Text, SafeAreaView, Linking } from "react-native";
import React from "react";
import BackgroundAnimation from "../components/BackgroundAnimation";
import Btn from "../src/Btn";
import { cankayaBlue } from "../src/Constants";
import Logo from "../src/Logo";
import Field from "../src/Field";
import styles from "../src/styles";

const Home = (props) => {
  return (
    <>
      <BackgroundAnimation />
      <SafeAreaView style={styles.container}>
        <Logo />
        <View
          style={{
            marginVertical: 50,
          }}
        >
          <View>
            <Field placeholder="e-mail" />
            <Field placeholder="password" secureTextEntry={true} />
          </View>
          <View>
            <Btn
              bgColor="white"
              textColor={cankayaBlue}
              btnLabel="Login"
              Press={() => alert("Logged In")}
            />
            <Btn
              bgColor="white"
              textColor={cankayaBlue}
              btnLabel="Signup"
              Press={() => props.navigation.navigate("Signup")}
            />
            <Btn
              bgColor="white"
              textColor={cankayaBlue}
              btnLabel="Guest"
              Press={() => props.navigation.navigate("Guest")}
            />
          </View>
        </View>
        <View>
          <View style={styles.backgroundFrame}>
            <Text style={{ color: "black", fontWeight: "bold", fontSize: 13 }}>
              Çankaya Üniversitesi Öğrenci Webmail Servisi
            </Text>
            <Text
              style={{ color: "blue" }}
              onPress={() => Linking.openURL("http://bim.cankaya.edu.tr/")}
            >
              Destek İsteyin !
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
