import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Button, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { fetchButtonPressStatus } from '../../src/firestoreQueries/index';

const SurveyStudent = () => {
  const navigation = useNavigation();
  const [selectedSurvey, setSelectedSurvey] = useState('Survey1');
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    fetchButtonPressStatus().then((buttonPressStatus) => {
      setIsPressed(buttonPressStatus);
    });
  }, []);

  const navigateToSurveyPage = () => {
    if (isPressed) {
      switch (selectedSurvey) {
        case 'Survey1':
          navigation.navigate('Survey1');
          break;
        case 'Survey2':
          navigation.navigate('Survey2');
          break;
        case 'Survey3':
          navigation.navigate('Survey3');
          break;
        default:
          break;
      }
    } else {
      Alert.alert('Surveys are not available yet.');
    }
  };

  const handleSurveySelection = (value) => {
    setSelectedSurvey(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/SurveyIcon.png')} style={styles.image} />
      <Text style={styles.title}>Please select a survey to fill in:</Text>
      <Picker
        selectedValue={selectedSurvey}
        onValueChange={handleSurveySelection}
        style={styles.picker}
      >
        <Picker.Item label="Course Survey" value="Survey1" />
        <Picker.Item label="Lecturer Survey" value="Survey2" />
        <Picker.Item label="University Survey" value="Survey3" />
      </Picker>
      <Button
        title="Select"
        onPress={navigateToSurveyPage}
        disabled={!isPressed}
      />
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
    image: {
      width: 100,
      height: 100,
      marginBottom: 10,
    },
  });

export default SurveyStudent;
