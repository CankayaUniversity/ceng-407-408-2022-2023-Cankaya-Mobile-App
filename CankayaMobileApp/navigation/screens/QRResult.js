import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QRResult = ({ navigation }) => {
    const handlePress = () => {
        navigation.navigate('MainContainer'); // Burada hedeflediğiniz ana bileşen adını kullanmalısınız
    };

    return (
        <View style={styles.container}>
            <View style={styles.background} />
            <Text style={styles.text}>APPROVE</Text>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Go to Main</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'green',
        opacity: 0.6,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        zIndex: 1,
    },
    button: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#f9bf3b',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default QRResult;
