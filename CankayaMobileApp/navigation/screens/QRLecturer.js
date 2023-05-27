import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const QRLecturer = () => {
    const navigation = useNavigation();

    const handleButton1Press = () => {
        navigation.navigate('TakeA');
    };

    const handleButton2Press = () => {
        navigation.navigate('ViewA');
    };
    const handleButton3Press = () => {
        navigation.navigate('QRStudent');
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#f8ca65' }]}  onPress={handleButton1Press}>
                <Text style={styles.buttonText}>Take Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#f9bf3b' }]} onPress={handleButton2Press}>
                <Text style={styles.buttonText}>View Attendance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: '#fab310' }]} onPress={handleButton3Press}>
                <Text style={styles.buttonText}>Camera</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default QRLecturer;

