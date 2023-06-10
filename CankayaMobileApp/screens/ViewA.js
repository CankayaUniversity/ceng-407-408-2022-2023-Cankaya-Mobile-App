import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Table, Row, Rows } from 'react-native-table-component';
import { getCourses, getAttendanceByCourse } from "../src/firestoreQueries/index";

const DropdownList = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const fetchedCourses = await getCourses();
            setCourses(fetchedCourses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const fetchAttendanceData = async () => {
        try {
            if (selectedOption) {
                const fetchedAttendanceData = await getAttendanceByCourse(selectedOption.value);
                setAttendanceData(fetchedAttendanceData);
            }
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
        fetchAttendanceData(); // Ders seçildiğinde yoklama verilerini çek
    };

    const renderTable = () => {
            const tableData = attendanceData.map((attendance) => [attendance.date, attendance.student_id]);

            return (
                <ScrollView horizontal>
                    <View>
                        <Table borderStyle={styles.tableBorder}>
                            <Row
                                data={['Date', 'Student ID']}
                                style={styles.head}
                                textStyle={styles.headText}
                                flexArr={[1, 1]}
                            />
                            <Rows data={tableData} textStyle={styles.rowText} flexArr={[1, 1]} />
                        </Table>
                    </View>
                </ScrollView>
            );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <Text style={styles.dropdownButtonText}>
                    {selectedOption ? selectedOption.label : 'Choose a course'}
                </Text>
                <Icon
                    name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#000"
                />
            </TouchableOpacity>
            {isDropdownOpen && (
                <View style={styles.dropdownList}>
                    {courses.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            style={styles.dropdownListItem}
                            onPress={() => handleOptionSelect(option)}
                        >
                            <Text style={styles.dropdownListItemText}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            {renderTable()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    dropdownButtonText: {
        fontSize: 16,
    },
    dropdownList: {
        width: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 20,
    },
    dropdownListItem: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    dropdownListItemText: {
        fontSize: 16,
    },
    tableBorder: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
    },
    head: {
        height: 40,
        backgroundColor: '#f9bf3b',
    },
    headText: {
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    rowText: {
        margin: 10,
        textAlign: 'center',
    },
});

export default DropdownList;
