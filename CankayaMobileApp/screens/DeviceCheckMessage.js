import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import React from "react";
import Back from "../components/Back";

const DeviceCheckMessage = () => {
    return <SafeAreaView style={styles.container}>
        <View>
            <Back/>
            <View style={styles.inputView}>
                <Text style={{alignSelf: "center"}}>This device is not matched with saved one.</Text>
                <Text style={styles.text2}>Please communicate with Computer Center to save your new device.</Text>
            </View>
        </View>
    </SafeAreaView>;
};
export default DeviceCheckMessage;

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
