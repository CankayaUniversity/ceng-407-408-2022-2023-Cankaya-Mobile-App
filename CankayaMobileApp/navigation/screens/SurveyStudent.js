import React from 'react';
import {View, Text, StyleSheet} from "react-native";

export default function SurveyStudent(){
    return(
        <View style={styles.container}>
            <Text>Survey page for Student</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
