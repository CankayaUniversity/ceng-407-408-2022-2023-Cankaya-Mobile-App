import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const Survey = () => {
  const navigation = useNavigation();
  const [selectedSurvey, setSelectedSurvey] = useState('survey1');

  const handleSurveySelection = (value) => {
    setSelectedSurvey(value);
    if (value === 'survey1') {
      navigation.navigate('Survey1');
    } else if (value === 'survey2') {
      navigation.navigate('Survey2');
    } else if (value === 'survey3') {
      navigation.navigate('Survey3');
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Survey</Text>
      <Picker
        selectedValue={selectedSurvey}
        onValueChange={handleSurveySelection}
        style={styles.picker}
      >
        <Picker.Item label="Survey 1" value="Survey1" />
        <Picker.Item label="Survey 2" value="Survey2" />
        <Picker.Item label="Survey 3" value="Survey3" />
      </Picker>
    </View>
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
  picker: {
    width: '80%',
  },
});
export default Survey;
