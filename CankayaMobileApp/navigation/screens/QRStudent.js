import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {BarCodeScanner} from 'expo-barcode-scanner';
import {getBusByPlateNumber, saveBusCheck} from "../../src/firestoreQueries";
import {useUser} from "../../src/context";

const QRStudent = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const {user} = useUser();

    const navigation = useNavigation();

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = async ({type, data}) => {
        setScanned(true);
        console.log('Scanned QR code id: ', data);
        const bus = await getBusByPlateNumber({ plateNumber: data });

        if (bus) {
            // alert('QR Code is valid!', data);
            navigation.navigate('QRResult');
            await saveBusCheck({ user: user, plateNumber: data, busID: bus.bid })
        } else {
            // alert('QR Code is not valid!', data);
            navigation.navigate('QRDenied');
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    scanText: {
        marginTop: 20,
        fontSize: 16,
        color: '#fff',
    },
});

export default QRStudent;
