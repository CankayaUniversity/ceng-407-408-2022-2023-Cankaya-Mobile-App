import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

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
        <Text style={{backgroundColor: '#ADD8E6', fontSize: 18, fontWeight: 'bold'}}>Question 1:</Text>
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
        <Text style={{backgroundColor: '#ADD8E6', fontSize: 18, fontWeight: 'bold'}}>Question 2:</Text>
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

// const styles = StyleSheet.create({
//   submitButton: {
//     backgroundColor: '#ADD8E6',
//     borderRadius: 5,
//     padding: 10,
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   submitButtonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//   },
// });

export default Survey3;
