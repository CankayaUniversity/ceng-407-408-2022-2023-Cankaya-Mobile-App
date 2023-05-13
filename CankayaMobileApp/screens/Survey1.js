import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const Survey1 = () => {
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [question4, setQuestion4] = useState('');

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

  const handleSubmit = () => {
    // Handle submit logic here
  }

  // const handleSubmit = () => {
  //   console.log('Attendance:', question1);
  //   console.log('CPGA:', question2);
  //   console.log('Question 3:', question3);
  //   console.log('Question 4:', question4);
  // };

  return (
    <ScrollView>
      <Text style={{backgroundColor: '#ADD8E6', fontSize: 18, fontWeight: 'bold'}}>Attendance:</Text>
      <RadioButton.Group onValueChange={handleQuestion1Change} value={question1}>
        <RadioButton.Item label="%25<" value="option1" />
        <RadioButton.Item label="%25 - %49" value="option2" />
        <RadioButton.Item label="%50 - %74" value="option3" />
        <RadioButton.Item label="%75 - %100" value="option4" />
        <RadioButton.Item label="%50 - %74" value="option5" />
      </RadioButton.Group>

      <Text style={{backgroundColor: '#ADD8E6', fontSize: 18, fontWeight: 'bold'}}>CGPA:</Text>
      <RadioButton.Group onValueChange={handleQuestion2Change} value={question2}>
        <RadioButton.Item label="1.69<" value="option1" />
        <RadioButton.Item label="1.70 - 1.99" value="option2" />
        <RadioButton.Item label="2.00 - 2.49" value="option3" />
        <RadioButton.Item label="2.50 - 2.99" value="option4" />
        <RadioButton.Item label="3.00 - 3.49" value="option5" />
        <RadioButton.Item label="3.50 - 4.00" value="option6" />
      </RadioButton.Group>

      <Text style={{backgroundColor: '#ADD8E6', fontSize: 18, fontWeight: 'bold'}}>Question 2:</Text>
      <RadioButton.Group onValueChange={handleQuestion3Change} value={question3}>
        <RadioButton.Item label="Strongly Agree" value="option1" />
        <RadioButton.Item label="Agree" value="option2" />
        <RadioButton.Item label="Neutral" value="option3" />
        <RadioButton.Item label="Disagree" value="option4" />
        <RadioButton.Item label="Strongly Disagree" value="option5" />
      </RadioButton.Group>

      <Text style={{backgroundColor: '#ADD8E6', fontSize: 18, fontWeight: 'bold'}}>Question 3:</Text>
      <TextInput
        value={question4}
        onChangeText={handleQuestion4Change}
        style={{
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        fontSize: 14,
  }}
/>
      {/* <TouchableOpacity onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#ADD8E6',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Survey1;