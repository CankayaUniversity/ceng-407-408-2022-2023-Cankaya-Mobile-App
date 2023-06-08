import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { getAllSurveyDataFromFirestore } from '../src/firestoreQueries/index';

function SurveyResults() {
  const [surveyId, setSurveyId] = useState('');
  const [surveyData, setSurveyData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allSurveyData, setAllSurveyData] = useState([]);

  useEffect(() => {
    fetchAllSurveyData();
  }, []);

  const fetchAllSurveyData = async () => {
    try {
      const surveyData = await getAllSurveyDataFromFirestore();
      setAllSurveyData(surveyData);
    } catch (error) {
      console.error('Error fetching survey data:', error);
    }
  };

  const handleSurveyIdChange = (value) => {
    setSurveyId(value);
  };

  const getSurveyData = () => {
    const matchingSurvey = allSurveyData.find((survey) => survey.documentId === surveyId);

    if (matchingSurvey) {
      setSurveyData(matchingSurvey.data);
    } else {
      setSurveyData(null);
    }
  };

  const renderSurveyData = () => {
    if (isLoading) {
      return <Text style={{ textAlign: 'center' }}>Loading survey data...</Text>;
    }
  
    if (!surveyData) {
      return <Text style={{ textAlign: 'center' }}>No survey data available.</Text>;
    }
  
    const sortedKeys = Object.keys(surveyData).sort();
  
    return (
      <View>
        {/* Display survey results */}
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Survey Results</Text>
        {/* Access the survey data and display it */}
        {/* <Text>Survey ID: {surveyData.survey_id}</Text>
        <Text>Type: {surveyData.type}</Text> */}
  
        {/* Render additional survey questions */}
        {sortedKeys.map((key) => (
          <Text key={key}>
            {key}: {surveyData[key]}
          </Text>
        ))}
      </View>
    );
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Survey Results</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter survey ID"
        value={surveyId}
        onChangeText={handleSurveyIdChange}
      />
      <Button title="Show Data" onPress={getSurveyData} />

      {/* Render survey data */}
      {renderSurveyData()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10, // Left padding for the input text
  },
});

export default SurveyResults;
