import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const APP_SPECIFIC_DEVICE_ID_KEY = 'cankayaMobileAppDeviceUUID';

let isSecureStoreAvailable;
let deviceID;

export const initiateDeviceID = async () => {
    isSecureStoreAvailable = await SecureStore.isAvailableAsync();

    if (isSecureStoreAvailable) {
        const savedDeviceID = await SecureStore.getItemAsync(APP_SPECIFIC_DEVICE_ID_KEY);
        if (savedDeviceID) {
            deviceID = savedDeviceID;
        } else {
            const newDeviceID = uuidv4();
            await SecureStore.setItemAsync(APP_SPECIFIC_DEVICE_ID_KEY, newDeviceID);
            deviceID = newDeviceID;
        }
        console.log('Device ID ready: ', deviceID);
    }
}

export const getDeviceID = () => deviceID;
