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
        const bus = await getBusByPlateNumber({ plateNumber: data });

        if (bus) {
            // alert("VALID!");
            // ekran göster
            navigation.navigate('QRResult');
            // Save buscheck

            await saveBusCheck({ user: user, plateNumber: data, busID: bus.bid })
        } else {
            alert('QR Code is not valid!', data);
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
});

export default QRStudent;
