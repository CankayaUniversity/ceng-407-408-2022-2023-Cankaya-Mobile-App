import React, {useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";

import {firebaseAuth} from "./src/utils/firebaseHelper";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Guest from "./screens/Guest";
import {findUserByEmail} from "./src/firestoreQueries";
import AppContext, {useUser} from "./src/context";

import TakeA from "./screens/TakeA";
import ViewA from "./screens/ViewA";
import QRStudent from "./navigation/screens/QRStudent";

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
        // signOut(firebaseAuth);
        return firebaseAuth.onAuthStateChanged(onAuthStateChanged);
    }, []);

    if (!user || !user.emailVerified) {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen
                        options={{headerShown: false}}
                        name="Guest"
                        component={Guest}
                    />
                    <Stack.Screen name="TakeA" component={TakeA}/>
                    <Stack.Screen name="ViewA" component={ViewA}/>
                    <Stack.Screen name="QRStudent" component={QRStudent}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{headerShown: false}}
                    name="Guest"
                    component={Guest}
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
