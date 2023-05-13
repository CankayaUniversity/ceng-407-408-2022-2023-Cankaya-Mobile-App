import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import DropDownPicker from 'react-native-dropdown-picker';



const SelectionScreen = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [qrValue, setQrValue] = useState(null);

  const items = [
    { label: 'Seçenek 1', value: 'option1' },
    { label: 'Seçenek 2', value: 'option2' },
    { label: 'Seçenek 3', value: 'option3' },
    { label: 'Seçenek 4', value: 'option4' },
    { label: 'Seçenek 5', value: 'option5' }
  ];

  useEffect(() => {
    if (selectedValue) {
      // Seçilen değer değiştiğinde yeni bir QR kodu oluştur
      const randomQR = Math.floor(Math.random() * 1000000).toString();
      setQrValue(randomQR);
    }
  }, [selectedValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lütfen seçiminizi yapın:</Text>
      <DropDownPicker
        items={items}
        defaultValue={selectedValue}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.dropdownItem}
        labelStyle={styles.dropdownLabel}
        onChangeItem={item => setSelectedValue(item.value)}
      />
      {qrValue && (
        <View style={styles.qrContainer}>
          <QRCode value={qrValue} size={200} />
          <Text style={styles.qrText}>{qrValue}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  dropdownContainer: {
    height: 40,
    width: 200,
    marginTop: 20
  },
  dropdown: {
    backgroundColor: '#fafafa'
  },
  dropdownItem: {
    justifyContent: 'flex-start'
  },
  dropdownLabel: {
    fontSize: 16,
    textAlign: 'left',
    color: '#000'
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  qrText: {
    fontSize: 16,
    marginTop: 10
  }
});

export default SelectionScreen;
