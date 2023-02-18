import {View, Text, SafeAreaView, Linking, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import BackgroundAnimation from "../components/BackgroundAnimation";
import Logo from "../components/Logo";

const Home = (props) => {
    return (
        <>
            <BackgroundAnimation/>
            <SafeAreaView style={styles.container}>
                <Logo/>
                <View>
                    <View>
                        <TextInput style={styles.input} placeholder="e-mail" placeholderTextColor="black"/>
                        <TextInput style={styles.input} placeholder="password" placeholderTextColor="black"
                                   secureTextEntry={true}/>
                    </View>

                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => alert("Logged In")}>
                            <Text style={styles.text1}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}
                                          onPress={() => props.navigation.navigate("Signup")}>
                            <Text style={styles.text2}>Signup</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => props.navigation.navigate("Guest")}>
                            <Text style={styles.text1}>Guest</Text>
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
        marginVertical: 10,
    },
    button: {
        backgroundColor: 'lightgrey',
        borderRadius: 100,
        alignItems: "center",
        width: 250,
        paddingVertical: 5,
        marginVertical: 10,
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
    },
    text1: {
        color: 'black',
        fontSize: 15,
        fontWeight: "bold"
    },
    text2: {
        color: 'blue',
        fontSize: 15,
        fontWeight: "bold"
    }
})
