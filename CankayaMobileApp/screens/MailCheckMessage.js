import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import React from "react";
import Back from "../components/Back";

const MailCheckMessage = () => {
    return <SafeAreaView style={styles.container}>
        <View>
            <Back/>
            <View style={styles.inputView}>
                <Text style={{alignSelf: "center"}}>Verification link sent to your e-mail ! Please click that link to
                    activate your e-mail ! </Text>
                <Text style={styles.text}>Important note: When you confirm the activation, the identity of the phone
                    you are logged into will be saved in this e-mail, and you cannot enter this phone with another
                    e-mail or log in to a different phone with your e-mail.</Text>
            </View>
        </View>
    </SafeAreaView>;
};

export default MailCheckMessage;

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
    },
    inputView: {
        marginTop: 100,
    },
    text: {
        alignSelf: "center",
        color: 'red',
        fontSize: 15,
        fontWeight: "bold",
    },
})
