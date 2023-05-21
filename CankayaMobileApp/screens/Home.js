import {View, Text, SafeAreaView, Linking, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

import BackgroundAnimation from "../components/BackgroundAnimation";
import Logo from "../components/Logo";

import {firebaseAuth} from "../src/utils/firebaseHelper";

import {checkLecturer, checkStudent, findUserByEmailAndPassword} from "../src/firestoreQueries";
import {useUser} from "../src/context";

const Home = (props) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [waitForVerification, setWaitForVerification] = useState();
    const [userInFirebaseAuth, setUserInFirebaseAuth] = useState();
    const {user, setUser} = useUser();

    //forget password
    const forgetPassword = () => {
        firebaseAuth.sendPasswordResetEmail(email)
            .then(() => {
                alert("Password reset email sent")
            }).catch((error) => {
            alert(error)
        })
    }

    const handleLogin = async () => {
        const userDB_ = await findUserByEmailAndPassword({ email, password });
        setUser(userDB_);

        let userCredentialsFirebaseAuth;
        try {
            userCredentialsFirebaseAuth = await signInWithEmailAndPassword(firebaseAuth, email, password);
        } catch (e) {
            if(e.code === "auth/user-not-found") {
                console.warn(`${email} user not found in Firebase Auth. Creating the user on Firebase Auth...`);
                userCredentialsFirebaseAuth = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            } else {
                throw e;
            }
        }

        setUserInFirebaseAuth(userCredentialsFirebaseAuth.user);

        if (!userCredentialsFirebaseAuth.user.emailVerified) {
            await sendEmailVerification(userCredentialsFirebaseAuth.user);
            setWaitForVerification(true);
            return props.navigation.navigate("Login");
        }

        return props.navigation.navigate("Guest");
    };

    const deviceCheck = async () => {
        const isStudent = await checkStudent({ userID: user.id });

        if (isStudent) {
            // const deviceUniqueID = await getUniqueId();
            console.log("device check...");
            // console.log("device id", deviceUniqueID);
        }

        props.navigation.navigate("Guest");
    };

    useEffect(() => {
        if (waitForVerification && userInFirebaseAuth) {
            const interval = setInterval(async () => {
                await userInFirebaseAuth.reload();

                const newUser = firebaseAuth.currentUser;

                if (newUser.emailVerified) {
                    clearInterval(interval);
                    setWaitForVerification(false);
                    setUserInFirebaseAuth({...newUser.toJSON()});
                    setUser({...user, emailVerified: true});
                    deviceCheck();
                }
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [waitForVerification, userInFirebaseAuth])

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
                                                  .catch((error) => {
                                                  // If registration fails, handle the error appropriately
                                                  alert(error.message || error);
                                              })
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
