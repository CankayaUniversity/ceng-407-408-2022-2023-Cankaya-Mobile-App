import React, {useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {firebase} from "./config";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Guest from "./screens/Guest";
import {View} from "react-native";
import TakeA from "./screens/TakeA";
import ViewA from "./screens/ViewA";

const Stack = createNativeStackNavigator();

function App() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    //Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        return firebase.auth().onAuthStateChanged(onAuthStateChanged);
    }, []);

    if (initializing) return <View><NavigationContainer/></View>
        ;

    if (!user) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Guest" component={Guest} />
        <Stack.Screen name="TakeA" component={TakeA} />
        <Stack.Screen name="ViewA" component={ViewA} />
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
}
export default App;
