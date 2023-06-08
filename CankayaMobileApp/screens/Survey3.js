import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View, SafeAreaView,
} from 'react-native';
import { submitSurveyToFirestore } from '../src/firestoreQueries/index';

const Survey3 = () => {
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');

  const handleQuestion1Change = (value) => {
    setQuestion1(value);
  };

  const handleQuestion2Change = (value) => {
    setQuestion2(value);
  };

  const handleQuestion3Change = (value) => {
    setQuestion3(value);
  };

  const handleSubmit = async () => {
    try {
      // Created a new survey object with the survey_id set to 1
      const surveyData = {
        // survey_id: 3,
        question1: question1,
        question2: question2,
        question3: question3,
      };
  
      await submitSurveyToFirestore(3, 'UniversitySurvey', surveyData); // Pass surveyId as 3 and surveyType as 'UniversitySurvey' for Survey3

      console.log('Survey 3 data stored successfully!');
      alert('Submitted successfully!'); // Show success message to the user
    } catch (error) {
      console.error('Error storing survey 3 data:', error);
    }
  };

  return (
    <SafeAreaView>
    <ScrollView>
      <View style={styles.questionContainer}>
        <Text style={styles.questionTitle}>1. Name 3 most favourite things about Çankaya University:</Text>
        <TextInput
          value={question1}
          onChangeText={handleQuestion1Change}
          style={styles.inputLarge}
        />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionTitle}>2. Name 3 least favourite things about Çankaya University:</Text>
        <TextInput
          value={question2}
          onChangeText={handleQuestion2Change}
          style={styles.inputLarge}
        />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionTitle}>3. How would you evaluate your experience at Çankaya University?</Text>
        <TextInput
          value={question3}
          onChangeText={handleQuestion3Change}
          style={styles.inputLarge}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 20,
  },
  questionTitle: {
    backgroundColor: '#ADD8E6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
  },
  inputLarge: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    height: 150, // Set the height for the enlarged text
    textAlignVertical: 'top', // Place the text at the top of the input
  },
  submitButton: {
    backgroundColor: '#ADD8E6',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Survey3;
