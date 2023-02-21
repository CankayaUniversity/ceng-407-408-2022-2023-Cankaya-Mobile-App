import React, {useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {firebase} from "./config";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import Guest from "./screens/Guest";
import {View} from "react-native";
import Dashboard from "./components/Dashboard";

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
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return <View><NavigationContainer/></View>
        ;

    if (!user) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Guest" component={Guest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                />
            </Stack.Navigator>
        </NavigationContainer>

    );
}
export default App;
