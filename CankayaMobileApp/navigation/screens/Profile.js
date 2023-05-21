import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {useEffect, useState} from "react";
import {useUser} from "../../src/context";

const TableHomePage = () => {
    const [profileLines, setProfileLines] = useState();
    const {user} = useUser();

    const getProfileLines = () => {
        return [
            {id: 1, header1: 'Name Surname', header2: [user.firstName, user.lastName].join(' ')},
            {id: 2, header1: 'Student No', header2: user.studentID},
            {id: 3, header1: 'Class', header2: user.className},
            {id: 4, header1: 'Faculty', header2: user.facultyName},
            {id: 5, header1: 'Department', header2: user.departmentName}
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
function Transcript() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Transcript</Text>
        </View>
    );
}

function Curriculum() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Curriculum</Text>
        </View>
    );
}

const dataTakenCourses = [
    {id: 1, header1: 'Course Code', header2: 'Course Name', header3: 'Credit', header4: 'Section',
        header5: 'ME', header6: 'Midterm 1', header7: 'Midterm 2', header8: 'Laboratory',
        header9: 'Homework', header10: 'Extra', header11: 'Final', header12: 'Grade', header13: 'WebOnline Courses'},
    {id: 2, header1: 'Course Code', header2: 'Course Name', header3: 'Credit', header4: 'Section',
        header5: 'ME', header6: 'Midterm 1', header7: 'Midterm 2', header8: 'Laboratory',
        header9: 'Homework', header10: 'Extra', header11: 'Final', header12: 'Grade', header13: 'WebOnline Courses'},
];
const TableTakenCourses = () => {
    const renderRow = ({item, index}) => (
            <View style={[styles_TakenCourses.row, {backgroundColor: 'white', flex: 1}]}>
                <View style={styles_TakenCourses.cell}>
                    <Text>{item.header1}</Text>
                </View>
                <View style={styles_TakenCourses.cell}>
                    <Text>{item.header2}</Text>
                </View>
                <View style={styles_TakenCourses.cell}>
                    <Text>{item.header3}</Text>
                </View>
                <View style={styles_TakenCourses.cell}>
                    <Text>{item.header4}</Text>
                </View>
                <View style={styles_TakenCourses.cell}>
                    <Text>{item.header5}</Text>
                </View>
                <View style={styles_TakenCourses.cell}>
                    <Text>{item.header6}</Text>
                </View>
                <View style={styles_TakenCourses.cell}>
                    <Text>{item.header7}</Text>
                </View>
                <View style={styles_TakenCourses.cell}>
                    <Text>{item.header8}</Text>
                </View>
                <View style={styles_TakenCourses.cell}>
                    <Text>{item.header9}</Text>
                </View>
                <View style={styles_TakenCourses.cell}>
                    <Text>{item.header10}</Text>
                </View>
                <View style={styles_TakenCourses.cell}>
                    <Text>{item.header11}</Text>
                </View>
                <View style={styles_TakenCourses.cell}>
                    <Text>{item.header12}</Text>
                </View>
                <View style={styles_TakenCourses.cell}>
                    <Text>{item.header13}</Text>
                </View>
            </View>
    );
    return (
        <View style={styles_TakenCourses.container}>
        <FlatList style={styles_TakenCourses.borderStyle} data={dataTakenCourses}
                      keyExtractor={(item) => item.id.toString()} renderItem={renderRow}/>
            <Text style={styles_TakenCourses.bottomText}>The grades of the courses that do not appear here, haven't been entered yet. You can contact your department for the announcement date.</Text>
        </View>
    );
};
const TakenCourses = () => {
    return (
        <ScrollView horizontal={true}>
            <View style={styles_TakenCourses.container}>
                <TableTakenCourses/>
            </View>
        </ScrollView>
    );
};

const styles_TakenCourses = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#737677',
        borderWidth: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#737677',
    },
    cell: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    borderStyle: {
        borderColor: '#737677'
    },
    bottomText: {
        textAlign: 'center',
        fontSize: 15,
    },
});
function FeeInfo() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Fee Information</Text>
        </View>
    );
}
function CourseSchedule() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Course Schedule</Text>
        </View>
    );
}
function OfficialRecords() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Official Records</Text>
        </View>
    );
}
function ProficiencyResults() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Proficiency Results</Text>
        </View>
    );
}
const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator useLegacyImplementation>
            <Drawer.Screen name="Home Page" component={HomePage} />
            <Drawer.Screen name="Transcript" component={Transcript} />
            <Drawer.Screen name="Curriculum" component={Curriculum} />
            <Drawer.Screen name="Taken Courses" component={TakenCourses} />
            <Drawer.Screen name="Fee Information" component={FeeInfo} />
            <Drawer.Screen name="Course Schedule" component={CourseSchedule} />
            <Drawer.Screen name="Official Records" component={OfficialRecords} />
            <Drawer.Screen name="Proficiency Results" component={ProficiencyResults} />
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

