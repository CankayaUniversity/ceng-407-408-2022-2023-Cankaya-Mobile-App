
import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';
import { doc, setDoc } from "firebase/firestore";
import { getCourses, saveQRCodeToFirestore,saveQRScanDataToFirestore } from "../src/firestoreQueries/index";

const DropdownList = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const fetchedCourses = await getCourses();
      setCourses(fetchedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    setShowQRCode(false);
  };

  const handleCreateQR = () => {
    if (selectedOption) {
      const QRData = Math.random().toString(36).substring(7);
      setShowQRCode(true);
      console.log('QR kod oluşturuldu');
      console.log('randomValue: ' + QRData);

      saveQRCodeToFirestore(QRData, selectedOption.value); // Pass the selected courseId
    }
  };
  const handleQRCodeScan = async (scannedData) => {
    try {
      // QR kodunun tarandığı dökümanın ID'si
      const documentId = attendanceRef.id;

      // Firestore'dan attendance dökümanını güncelle
      const attendanceRef = doc(firestore, "attendance", documentId);
      await updateDoc(attendanceRef, {
        scannedData: scannedData,
      });

      console.log("QR kodu tarandı ve veritabanı güncellendi.");
    } catch (error) {
      console.error("Hata: QR kodu taranırken bir hata oluştu", error);
    }
  };

  return (
      <View style={styles.container}>
        <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Text style={styles.dropdownButtonText}>
            {selectedOption ? selectedOption.label : 'Choose a course'}
          </Text>
          <Icon
              name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#000"
          />
        </TouchableOpacity>
        {isDropdownOpen && (
            <View style={styles.dropdownList}>
              {courses.map((option) => (
                  <TouchableOpacity
                      key={option.value}
                      style={styles.dropdownListItem}
                      onPress={() => handleOptionSelect(option)}
                  >
                    <Text style={styles.dropdownListItemText}>{option.label}</Text>
                  </TouchableOpacity>
              ))}
            </View>
        )}
        {showQRCode && (
            <View style={styles.qrCodeContainer}>
              <WebView
                  style={styles.qrCode}
                  source={{
                    html: `<img src="https://api.qrserver.com/v1/create-qr-code/?data=${selectedOption.value}&size=500x500" />`,
                  }}
              />
            </View>
        )}
        <TouchableOpacity
            style={styles.createQRButton}
            onPress={handleCreateQR}
        >
          <Text style={styles.createQRButtonText}>Create QR</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  dropdownList: {
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 20,
  },
  dropdownListItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownListItemText: {
    fontSize: 16,
  },
  createQRButton: {
    width: 200,
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createQRButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  qrCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 200,
    marginLeft: 200,
  },
  qrCode: {
    height: 450,
    width: 450,
    objectFit: 'contain',
  },
});

export default DropdownList;
