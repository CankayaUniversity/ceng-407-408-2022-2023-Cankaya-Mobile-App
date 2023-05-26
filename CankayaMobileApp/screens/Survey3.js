import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  View,
} from 'react-native';

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

  const handleSubmit = () => {
    // Handle submit logic
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
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
