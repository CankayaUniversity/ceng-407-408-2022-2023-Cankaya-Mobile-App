import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import React from "react";
import Back from "../components/Back";

const Login = () => {
    return <SafeAreaView style={styles.container}>
        <View>
            <Back/>
            <View style={styles.inputView}>
                <Text style={{alignSelf: "center"}}>Verification link sent to your e-mail ! Please click that link to
                    activate your e-mail ! </Text>
                <Text style={styles.text2}>Important note: When you confirm the activation, the identity of the phone
                    you are logged into will be saved in this e-mail, and you cannot enter this phone with another
                    e-mail or log in to a different phone with your e-mail.</Text>
            </View>
        </View>
    </SafeAreaView>;
};

export default Login;

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
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
        alignSelf: "center",
        color: 'red',
        fontSize: 15,
        fontWeight: "bold",
    },
})
