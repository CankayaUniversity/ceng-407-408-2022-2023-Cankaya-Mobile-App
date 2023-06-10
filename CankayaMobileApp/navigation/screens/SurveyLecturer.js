import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, Button, FlatList, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveButtonPressDate, fetchButtonPressStatus } from '../../src/firestoreQueries/index';

const SurveyLecturer = () => {
  const navigation = useNavigation();
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  useEffect(() => {
    fetchButtonPressStatusFromFirestore();
  }, []);

  const fetchButtonPressStatusFromFirestore = async () => {
    const buttonPressStatus = await fetchButtonPressStatus();
    if (buttonPressStatus !== null) {
      setIsButtonPressed(buttonPressStatus);
    }
  };

  const surveys = [
    { label: 'Course Survey', value: 'Survey1' },
    { label: 'Lecturer Survey', value: 'Survey2' },
    { label: 'University Survey', value: 'Survey3' },
  ];

  const handleCreateButton = async () => {
    try {
      // const createDate = new Date().toISOString();
      await saveButtonPressDate(true); // Save the button press status as true
      setIsButtonPressed(true); // Update the button press status in the component state
      console.log('Button press status stored successfully!');
      alert('Surveys Created Successfully!'); // Show success message to the user
    } catch (error) {
      console.error('Error storing button press status:', error);
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
          <Button title="Create Surveys" onPress={handleCreateButton} disabled={isButtonPressed} />
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
      marginTop:80, // Add marginTop to move the container downwards
    },
    content: {
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 100, // Add marginTop to move the content downwards
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
      marginBottom: 20,
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 10,
    },
    buttonContainer: {
      marginBottom: 140,
      alignItems: 'center',
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
