import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

const AddTodo = ({styles, placeholder, handlePress}) => {
  const [newTodo, setNewTodo] = useState('');
  return (
    <View style={styles.addTodo}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <TouchableOpacity style={styles.btn} onPress={() => handlePress(newTodo)}>
        <Text style={styles.btnText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTodo;
