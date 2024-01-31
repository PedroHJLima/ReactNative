import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

const FormScreen = () => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    const person = {
      name,
      age,
      birthdate: formatDate(birthdate),
      gender,
    };

    console.log('Person:', person);
  };

  const handleBirthdateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setBirthdate(selectedDate);

      // Calcula a idade
      const currentYear = new Date().getFullYear();
      const birthYear = selectedDate.getFullYear();
      setAge(currentYear - birthYear);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome Completo:</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder='Pedro Henrique J de Lima'
        onChangeText={setName}
        maxLength={30}
      />

      <Text style={styles.label}>Data de Nascimento:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateInput}>{formatDate(birthdate)}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={birthdate}
          mode="date"
          display="default"
          onChange={handleBirthdateChange}
        />
      )}

      <Text style={styles.label}>Idade:</Text>
      <TextInput
        style={styles.input}
        value={age.toString()}
        editable={false}
      />

      <Text style={styles.label}>Gênero:</Text>
      <RNPickerSelect
            items={[
                { label: 'Masculino', value: 'Masculino' },
                { label: 'Feminino', value: 'Feminino' }
            ]}
            onValueChange={(value) => setGender(value)}
        />

      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333333',
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    color: '#333333',
  },
  dateInput: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    color: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FormScreen;
