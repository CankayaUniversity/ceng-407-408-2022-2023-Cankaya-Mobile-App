import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { submitSurveyToFirestore } from '../src/firestoreQueries/index';

const Survey2 = () => {
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [question4, setQuestion4] = useState('');
  const [question5, setQuestion5] = useState('');
  const [question6, setQuestion6] = useState('');

  const handleQuestion1Change = (value) => {
    setQuestion1(value);
  };

  const handleQuestion2Change = (value) => {
    setQuestion2(value);
  };

  const handleQuestion3Change = (value) => {
    setQuestion3(value);
  };

  const handleQuestion4Change = (value) => {
    setQuestion4(value);
  };

  const handleQuestion5Change = (value) => {
    setQuestion5(value);
  };

  const handleQuestion6Change = (value) => {
    setQuestion6(value);
  };

  const handleSubmit = async () => {
    try {
      // Created a new survey object with the survey_id set to 2
      const surveyData = {
        // survey_id: 2,
        question1: question1,
        question2: question2,
        question3: question3,
        question4: question4,
        question5: question5,
        question6: question6,
      };
  
      await submitSurveyToFirestore(2, 'LecturerSurvey', surveyData); // Pass surveyId as 2 and surveyType as 'LecturerSurvey' for Survey2

      console.log('Survey 2 data stored successfully!');
      alert('Successfull!'); // Show success message to the user
    } catch (error) {
      console.error('Error storing survey 2 data:', error);
    }
  };

  return (
    <SafeAreaView>
    <ScrollView>
      <Text style={styles.questionTitle}>Choose your attendance percentage range.</Text>
      <RadioButton.Group onValueChange={handleQuestion1Change} value={question1}>
        <RadioButton.Item label="%25<" value="option1" />
        <RadioButton.Item label="%25 - %49" value="option2" />
        <RadioButton.Item label="%50 - %74" value="option3" />
        <RadioButton.Item label="%75 - %100" value="option4" />
        <RadioButton.Item label="%50 - %74" value="option5" />
      </RadioButton.Group>

      <Text style={styles.questionTitle}>What is your expected letter grade?</Text>
      <RadioButton.Group onValueChange={handleQuestion2Change} value={question2}>
        <RadioButton.Item label="AA" value="option1" />
        <RadioButton.Item label="BA\BB" value="option2" />
        <RadioButton.Item label="CB\CC" value="option3" />
        <RadioButton.Item label="DC\DD" value="option4" />
        <RadioButton.Item label="FD\FF" value="option5" />
      </RadioButton.Group>

      <Text style={styles.questionTitle}>1. The instructor arrived on time and left the class on time.</Text>
      <RadioButton.Group onValueChange={handleQuestion3Change} value={question3}>
        <RadioButton.Item label="Strongly Agree" value="option1" />
        <RadioButton.Item label="Agree" value="option2" />
        <RadioButton.Item label="Neutral" value="option3" />
        <RadioButton.Item label="Disagree" value="option4" />
        <RadioButton.Item label="Strongly Disagree" value="option5" />
      </RadioButton.Group>

      <Text style={styles.questionTitle}>2. The language of instruction for the course was English.</Text>
      <RadioButton.Group onValueChange={handleQuestion4Change} value={question4}>
        <RadioButton.Item label="Strongly Agree" value="option1" />
        <RadioButton.Item label="Agree" value="option2" />
        <RadioButton.Item label="Neutral" value="option3" />
        <RadioButton.Item label="Disagree" value="option4" />
        <RadioButton.Item label="Strongly Disagree" value="option5" />
      </RadioButton.Group>

      <Text style={styles.questionTitle}>3. The instructor followed the planned course content and chose suitable teaching materials.</Text>
      <RadioButton.Group onValueChange={handleQuestion5Change} value={question5}>
        <RadioButton.Item label="Strongly Agree" value="option1" />
        <RadioButton.Item label="Agree" value="option2" />
        <RadioButton.Item label="Neutral" value="option3" />
        <RadioButton.Item label="Disagree" value="option4" />
        <RadioButton.Item label="Strongly Disagree" value="option5" />
      </RadioButton.Group>

      <Text style={styles.questionTitle}>What are your suggestions and opinions?</Text>
      <TextInput
        value={question6}
        onChangeText={handleQuestion6Change}
        style={styles.inputLarge}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  questionTitle: {
    backgroundColor: '#ADD8E6',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  inputLarge: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 14,
    height: 100, // Set the height for the enlarged text
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

export default Survey2;
