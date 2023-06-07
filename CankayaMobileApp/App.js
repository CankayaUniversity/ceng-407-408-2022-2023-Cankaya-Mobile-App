import React, {useEffect} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {initiateDeviceID} from "./src/utils/deviceIDManager";

import {firebaseAuth} from "./src/utils/firebaseHelper";
import Home from "./screens/Home";
import {findUserByEmail} from "./src/firestoreQueries";
import AppContext, {useUser} from "./src/context";
import TakeA from "./screens/TakeA";
import ViewA from "./screens/ViewA";
import QRStudent from "./navigation/screens/QRStudent";
import Survey1 from "./screens/Survey1";
import Survey2 from "./screens/Survey2";
import Survey3 from "./screens/Survey3";
import DeviceCheckMessage from "./screens/DeviceCheckMessage";
import MailCheckMessage from "./screens/MailCheckMessage";
import QRResult from "./navigation/screens/QRResult";
import MainContainer from "./navigation/MainContainer";
import QRDenied from "./navigation/screens/QRDenied";


const Stack = createNativeStackNavigator();

const Main = () => {
    const {user, setUser} = useUser();

    const onAuthStateChanged = async (user) => {
        if (user?.emailVerified) {
            const user_ = await findUserByEmail({email: user.email});
            setUser(user_);
        }
    }

    useEffect(() => {
        initiateDeviceID();

        return firebaseAuth.onAuthStateChanged(onAuthStateChanged);
    }, []);

    if (!user || !user.emailVerified) {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen name="MailCheckMessage" component={MailCheckMessage}/>
                    <Stack.Screen
                        options={{headerShown: false}}
                        name="MainContainer"
                        component={MainContainer}
                    />
                    <Stack.Screen name="TakeA" component={TakeA}/>
                    <Stack.Screen name="ViewA" component={ViewA}/>
                    <Stack.Screen name="QRStudent" component={QRStudent}/>
                    <Stack.Screen name="Survey1" component={Survey1}/>
                    <Stack.Screen name="Survey2" component={Survey2}/>
                    <Stack.Screen name="Survey3" component={Survey3}/>
                    <Stack.Screen name="DeviceCheckMessage" component={DeviceCheckMessage}/>
                    <Stack.Screen name="QRResult" component={QRResult}/>
                    <Stack.Screen name="QRDenied" component={QRDenied}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{headerShown: false}}
                    name="MainContainer"
                    component={MainContainer}
                />
            </Stack.Navigator>
        </NavigationContainer>

    );
};

function App() {
    return (
        <AppContext>
            <Main />
        </AppContext>
    )
}

export default App;
