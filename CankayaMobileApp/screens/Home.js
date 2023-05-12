import {View, Text, SafeAreaView, Linking, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import BackgroundAnimation from "../components/BackgroundAnimation";
import Logo from "../components/Logo";
import {useNavigation} from "@react-navigation/native";
import {firebase} from "../config";

const Home = (props) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //forget password
    const forgetPassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert("Password reset email sent")
            }).catch((error) => {
            alert(error)
        })
    }

    const handleLogin = () => {
        //debugger;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                userCredential.user.sendEmailVerification({
                    handleCodeInApp: true,
                    url: 'https://cankaya-mobile-app.firebaseapp.com',
                })
                    .then(() => {
                        alert('Verification email sent')
                    }).catch((error) => {
                    alert(error.message)
                })
                    .then(() => {
                        firebase.firestore().collection('users')
                            .doc(firebase.auth().currentUser.uid)
                            .set({
                                email,
                            })
                    })
                    .catch((error) => {
                        alert(error.message)
                    })

            })
            .catch((error) => {
                        // If registration fails, handle the error appropriately
                        alert(error.message);
                    });

    };

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
                                          onPress={() => {
                                              handleLogin(email, password)
                                              //debugger;
                                              props.navigation.navigate("Login")
                                          }}
                        >
                            <Text style={styles.text1}>Login</Text>
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
                            <Text style={{fontWeight: "bold", fontSize: 12}}>Forget Password?</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View>
                    <View style={styles.backgroundFrame}>
                        <Text style={{color: "black", fontWeight: "bold", fontSize: 13}}>
                            Cankaya University Student Webmail Service
                        </Text>
                        <Text
                            style={{color: "blue"}}
                            onPress={() => Linking.openURL("https://bim.cankaya.edu.tr/")}
                        >
                            Request Support!
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
        paddingHorizontal: 20,
        width: 350,
        height: "19%",
        backgroundColor: "rgb(220,220,220)",
        marginVertical: 10,
    },
    inputView: {
        marginTop: 40,
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
