import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, Button, FlatList, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveButtonPressDate } from '../../src/firestoreQueries/index';

const SurveyLecturer = () => {
  // const [selectedSurvey, setSelectedSurvey] = useState('Survey1');
  const navigation = useNavigation();

  const surveys = [
    { label: 'Course Survey', value: 'Survey1' },
    { label: 'Lecturer Survey', value: 'Survey2' },
    { label: 'University Survey', value: 'Survey3' },
  ];

  // const handleSurveySelection = (value) => {
  //   setSelectedSurvey(value);
  // };

  const handleCreateButton = async () => {
    try {
      const createDate = new Date().toISOString();
      await saveButtonPressDate(createDate); // Pass the date directly
      console.log('Date stored successfully!');
      alert('Successful!'); // Show success message to the user
    } catch (error) {
      console.error('Error storing date:', error);
    }
  };

  const handleSurveyResultsButton = () => {
    navigation.navigate('SurveyResults'); // Navigate to SurveyResults page
  };

  const renderSurveyItem = ({ item }) => (
    <View style={styles.surveyItem}>
      <Text style={styles.surveyLabel}>{item.label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredContainer}>
        <View style={styles.content}>
          <Image source={require('../../assets/SurveyIcon.png')} style={styles.image} />
          <Text style={styles.title}>List of available surveys:</Text>
        </View>
        <FlatList
          data={surveys}
          renderItem={renderSurveyItem}
          keyExtractor={(item) => item.value}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.title}>Select an option:</Text>
        <View style={styles.buttons}>
          <Button title="Create Surveys" onPress={handleCreateButton} />
          <View style={styles.buttonSpacing} />
          <Button title="Survey Results" onPress={handleSurveyResultsButton} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:80, // MarginTop to move the container downwards
  },
  content: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 100, // MarginTop to move the content downwards
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  surveyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  surveyLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  buttonContainer: {
    marginBottom: 140,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSpacing: {
    marginRight: 10,
  },
});

export default SurveyLecturer;
