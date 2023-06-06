import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const SurveyStudent = () => {
  const navigation = useNavigation();
  const [selectedSurvey, setSelectedSurvey] = useState('Survey1');

  const handleSurveySelection = (value) => {
    setSelectedSurvey(value);
  };

  const handleSelectButton = () => {
    if (selectedSurvey === 'Survey1') {
      navigation.navigate('Survey1');
    } else if (selectedSurvey === 'Survey2') {
      navigation.navigate('Survey2');
    } else if (selectedSurvey === 'Survey3') {
      navigation.navigate('Survey3');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose a Survey to fill:</Text>
      <Picker
        selectedValue={selectedSurvey}
        onValueChange={handleSurveySelection}
        style={styles.picker}
      >
        <Picker.Item label="Course Survey" value="Survey1" />
        <Picker.Item label="Lecturer Survey" value="Survey2" />
        <Picker.Item label="University Survey" value="Survey3" />
      </Picker>
      <Button title="Select" onPress={handleSelectButton} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  picker: {
    width: '100%',
  },
});

export default SurveyStudent;
