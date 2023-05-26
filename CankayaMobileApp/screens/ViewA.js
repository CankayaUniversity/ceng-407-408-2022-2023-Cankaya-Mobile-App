import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Table, Row, Rows } from 'react-native-table-component';

const DropdownList = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { label: 'CENG356', value: 'CENG356' },
        { label: 'CENG328', value: 'CENG328' },
        { label: 'CENG497', value: 'CENG497' },
        { label: 'CENG393', value: 'CENG393' },
    ];
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigation = useNavigation();

    const handleOptionSelect = (option) => {
        setSelectedOption(option.value);
        setIsDropdownOpen(false);
    };

    const renderTable = () => {
        if (selectedOption) {
            // Verileri burada doldurun veya bir API'den alın
            const data = [
                ['1', 'Veri 1', 'Veri 2', 'Veri 3'],
                ['2', 'Veri 4', 'Veri 5', 'Veri 6'],
                ['3', 'Veri 7', 'Veri 8', 'Veri 9'],
                ['4', 'Veri 10', 'Veri 11', 'Veri 12'],
                ['5', 'Veri 10', 'Veri 11', 'Veri 12'],
                ['6', 'Veri 10', 'Veri 11', 'Veri 12'],
                ['7', 'Veri 10', 'Veri 11', 'Veri 12'],
                ['8', 'Veri 10', 'Veri 11', 'Veri 12'],
                ['9', 'Veri 10', 'Veri 11', 'Veri 12'],
                ['10', 'Veri 10', 'Veri 11', 'Veri 12'],
                ['11', 'Veri 10', 'Veri 11', 'Veri 12'],
                ['12', 'Veri 10', 'Veri 11', 'Veri 12'],
                ['13', 'Veri 10', 'Veri 11', 'Veri 12'],
                ['14', 'Veri 10', 'Veri 11', 'Veri 12'],
            ];

            return (
                <ScrollView horizontal>
                    <View>
                        <Table borderStyle={styles.tableBorder}>
                            <Row
                                data={['Week', 'Name Surname', 'Student No', 'Attendance']}
                                style={styles.head}
                                textStyle={styles.headText}
                                flexArr={[1, 1, 1, 1]}
                            />
                            <Rows data={data} textStyle={styles.rowText} flexArr={[null, null, null, null]} />
                        </Table>
                    </View>
                </ScrollView>
            );
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <Text style={styles.dropdownButtonText}>
                    {selectedOption ? selectedOption : 'Select a Course'}
                </Text>
                <Icon
                    name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#000"
                />
            </TouchableOpacity>
            {isDropdownOpen && (
                <View style={styles.dropdownList}>
                    {options.map((option) => (
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
