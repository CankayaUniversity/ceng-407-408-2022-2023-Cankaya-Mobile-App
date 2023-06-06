import React from "react";
import Back from "../components/Back";

const Login = () => {
const DeviceCheckMessage = () => {
    return <SafeAreaView style={styles.container}>
        <View>
            <Back/>
            <View style={styles.inputView}>
                <Text style={{alignSelf: "center"}}>Verification link sent to your e-mail ! Please click that link to
                    activate your e-mail ! </Text>
                <Text style={styles.text2}>Important note: When you confirm the activation, the identity of the phone
                    you are logged into will be saved in this e-mail, and you cannot enter this phone with another
                    e-mail or log in to a different phone with your e-mail.</Text>
                <Text style={{alignSelf: "center"}}>This device is not matched with saved one.</Text>
                <Text style={styles.text2}>Please communicate with Computer Center to save your new device.</Text>
            </View>
        </View>
    </SafeAreaView>;
};

export default Login;
export default DeviceCheckMessage;

const styles = StyleSheet.create({
    container: {
