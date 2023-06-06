import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DropdownList = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { label: 'CENG356', value: 'option1' },
    { label: 'CENG328', value: 'option2' },
    { label: 'CENG497', value: 'option3' },
    { label: 'CENG393', value: 'option4' },
  ];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option.value);
    setIsDropdownOpen(false);
  };

  const handleCreateQR = () => {

    console.log('QR kod oluşturuldu');
  };

  return (
      <View style={styles.container}>
        <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Text style={styles.dropdownButtonText}>
            {selectedOption ? selectedOption : 'Choose a course'}
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
        <TouchableOpacity
            style={styles.createQRButton}
            onPress={handleCreateQR}
        >
          <Text style={styles.createQRButtonText}>Create QR</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  createQRButton: {
    width: 200,
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createQRButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default DropdownList;
