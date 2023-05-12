import {SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import Back from "../components/Back";


const Login = () => {
  return <SafeAreaView style={styles.container}>
    <Back />
    <View>
      <View style={styles.inputView}>
        <Text style={{alignSelf: "center"}}>Verification code sent to your e-mail !  Please enter the code: </Text>
        <TextInput style={styles.input}
                   placeholder="Verification Code"
                   placeholderTextColor="black"
            // onChangeText={(email) => setEmail(email)}
                   autoCapitalize="none"
                   autoCorrect={false}/>
      </View>
      <Text style={styles.text2}>Important note : When you enter the code, please note that your phone ID will be registered in this e-mail and you cannot enter this phone with another e-mail.</Text>
      <View style={styles.buttonView}>

        <TouchableOpacity style={styles.button}
            //onPress={() => handleLogin(email, password)}
        >
          <Text style={styles.text1}>Verify</Text>
        </TouchableOpacity>

      </View>
    </View>
  </SafeAreaView>;
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
  },
  input: {
    borderRadius: 100,
    color: "black",
    paddingHorizontal: 30,
    width: 175,
    height: "32%",
    backgroundColor: "rgb(220,220,220)",
    marginVertical: 5,
    alignSelf: "center"
  },
  inputView: {
    marginTop: 100,
  },
  button: {
    backgroundColor: '#E2D102',
    borderRadius: 100,
    alignItems: "center",
    width: 150,
    paddingVertical: 10,
    marginVertical: 5,
  },
  button2: {
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: "center",
    width: 150,
    paddingVertical: 10,
    marginVertical: 5,
  },
  buttonView: {
    alignItems: "center",
  },
  text1: {
    color: 'black',
    fontSize: 15,
    fontWeight: "bold"
  },
  text2: {
    color: 'red',
    fontSize: 15,
    fontWeight: "bold",
  },
})
