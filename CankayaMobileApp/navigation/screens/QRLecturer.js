import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const QRLecturer = () => {
    const navigation = useNavigation();

    const handleButton1Press = () => {
        navigation.navigate('ViewA');
    };

    const handleButton2Press = () => {
        navigation.navigate('TakeA');
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleButton1Press}>
                <Text style={styles.buttonText}>Take Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleButton2Press}>
                <Text style={styles.buttonText}>View Attendance</Text>
            </TouchableOpacity>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'yellow',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default QRLecturer;

