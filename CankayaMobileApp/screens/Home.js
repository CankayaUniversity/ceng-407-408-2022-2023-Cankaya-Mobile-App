import {View, Text, SafeAreaView, Linking, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import React, { useState } from "react";
import BackgroundAnimation from "../components/BackgroundAnimation";
import Logo from "../components/Logo";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import Registration from "./Registration";
import {cankayaYellow} from "../src/constants";

const Home = (props) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let loginUser;
    loginUser = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            alert(error.message);
        }
    };

    //forget password
    const forgetPassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert("Password reset email sent")
            }).catch((error) => {
            alert(error)
        })
    }

    return (
        <>
            <BackgroundAnimation/>
            <SafeAreaView style={styles.container}>
                <Logo/>
                <View>
                    <View style={styles.inputView}>
                        <TextInput style={styles.input}
                                   placeholder="e-mail"
                                   placeholderTextColor="black"
                                   onChangeText={(email) => setEmail(email)}
                                   autoCapitalize="none"
                                   autoCorrect={false}/>
                        <TextInput style={styles.input}
                                   placeholder="password"
                                   placeholderTextColor="black"
                                   onChangeText={(password) => setPassword(password)}
                                   autoCapitalize="none"
                                   autoCorrect={false}
                                   secureTextEntry/>
                    </View>

                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => loginUser(email, password)}>
                            <Text style={styles.text1}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button2]}
                                          onPress={() => props.navigation.navigate("Registration")}>
                            <Text style={styles.text2}>Registration</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => props.navigation.navigate("Guest")}>
                            <Text style={styles.text1}>Guest</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() => forgetPassword()}
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.6)",
                            borderRadius: 50,
                            width: 150,
                            height: 20,
                            alignItems: "center",
                            justifyContent: "center",
                            marginVertical: 5,
                        }}
                        >
                        <Text style={{ fontWeight: "bold", fontSize: 12 }}>Forget Password?</Text>
                    </TouchableOpacity>

                    </View>
                </View>
                <View>
                    <View style={styles.backgroundFrame}>
                        <Text style={{color: "black", fontWeight: "bold", fontSize: 13}}>
                            Çankaya Üniversitesi Öğrenci Webmail Servisi
                        </Text>
                        <Text
                            style={{color: "blue"}}
                            onPress={() => Linking.openURL("https://bim.cankaya.edu.tr/")}
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
    input: {
        borderRadius: 100,
        color: "black",
        paddingHorizontal: 10,
        width: 350,
        height: "19%",
        backgroundColor: "rgb(220,220,220)",
        marginVertical: 5,
    },
    inputView: {
      marginTop: 40,
    },
    button: {
        backgroundColor: cankayaYellow,
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
    backgroundFrame: {
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: 50,
        width: 350,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 55,
    },
    text1: {
        color: 'black',
        fontSize: 15,
        fontWeight: "bold"
    },
    text2: {
        color: 'black',
        fontSize: 15,
        fontWeight: "bold"
    }
})
