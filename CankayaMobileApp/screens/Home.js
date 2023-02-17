import {
  View,
  Text,
  SafeAreaView,
  Linking,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import BackgroundAnimation from "../components/BackgroundAnimation";
import { cankayaBlue } from "../src/Constants";
import Logo from "../src/Logo";

const Home = (props) => {
  return (
    <>
      <BackgroundAnimation />
      <SafeAreaView style={styles.container}>
        <View>
          <Logo />
          <View style={styles.inputContainer}>
            <TextInput placeholder="e-mail" style={styles.input} />
            <TextInput
              placeholder="password"
              style={styles.input}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => {}} style={styles.button}>
              <Text style={styles.button}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={[styles.buttonOutline]}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}} style={styles.button}>
              <Text style={styles.button}>Guest</Text>
            </TouchableOpacity>
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

const styles = StyleSheet.create({
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
