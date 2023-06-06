import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {useEffect, useState} from "react";
import {useUser} from "../../src/context";

const TableHomePage = () => {
    const [profileLines, setProfileLines] = useState();
    const {user} = useUser();
    const {busChecks} = useUser();


    const getProfileLines = () => {
        return [
            {id: 1, header1: 'Name Surname', header2: [user.firstName, user.lastName].join(' ')},
            {id: 2, header1: 'Student No', header2: user.studentID},
            {id: 3, header1: 'Class', header2: user.className},
            {id: 4, header1: 'Faculty', header2: user.facultyName},
            {id: 5, header1: 'Department', header2: user.departmentName},
        ];
    };

    useEffect(() => {
        if (user) {
            const profileLines_ = getProfileLines();
            setProfileLines(profileLines_);
        }
    }, [user]);

    const renderRow = ({item, index}) => (
        <View style={[styles_HomePage.row, {backgroundColor: index % 2 === 0 ? 'white' : 'lightgray'}]}>
            <View style={styles_HomePage.cell}>
                <Text style={styles_HomePage.bold}>{item.header1}</Text>
            </View>
            <View style={styles_HomePage.cell}>
                <Text>{item.header2}</Text>
            </View>
        </View>
    );

    return (

        <View style={styles_HomePage.container}>
            <Text style={{ fontSize: 30, backgroundColor:"#f9bf3b"}}>Personal Information</Text>
            <FlatList data={profileLines} keyExtractor={(item) => item.id.toString()} renderItem={renderRow} />
        </View>
    );
};

const HomePage = () => {
    return <TableHomePage />;
};

const styles_HomePage = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:10,
        paddingVertical: 5,
    },
    cell: {
        flex: 1,
        alignItems: 'flex-start',
    },
    bold: {
        fontWeight: 'bold',
    },

});
function BusInformation() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Bus Information</Text>
        </View>
    );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator useLegacyImplementation>
            <Drawer.Screen name="Home Page" component={HomePage} />
            <Drawer.Screen name="Bus Information" component={BusInformation} />
        </Drawer.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer independent={true}>
            <MyDrawer />
        </NavigationContainer>
    );
}

