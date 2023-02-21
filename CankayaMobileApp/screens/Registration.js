import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React, {useState} from "react";
import {firebase} from "../config";
import Back from "../components/Back";
import {cankayaYellow} from "../src/constants";

const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    let registerUser;
    registerUser = async (email, password, firstName, lastName) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then (() => {
                firebase.auth().currentUser.sendEmailVerification({
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
                                firstName,
                                lastName,
                                email,
                            })
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
            })
            .catch((error) => {
                alert(error.message)
            })
    }
    return (
        <View style ={styles.container}>
            <Back />
            <Text style={{fontWeight: 'bold', fontSize:23}}>
                Register
            </Text>
            <View style={{marginTop: 40}}>
                <TextInput
                    style={styles.textInput}
                    placeholder="First Name"
                    onChangeText={(firstName) => setFirstName(firstName)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Last Name"
                    onChangeText={(lastName) => setLastName(lastName)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                onPress={() => registerUser(email,password,firstName,lastName)}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:22}}>Register</Text>
            </TouchableOpacity>
        </View>
    )
};

export default Registration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 100,
    },
    textInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: 400,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        marginBottom: 10,
        textAlign: "center",
    },
    button: {
        marginTop: 50,
        height: 60,
        width: 200,
        backgroundColor: cankayaYellow,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },
});
