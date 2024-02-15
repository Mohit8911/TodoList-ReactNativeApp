import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {CheckBox} from 'react-native-elements';

const Task = ({
  styles,
  id,
  todo,
  isCompleted,
  handleDelete,
  setTaskCompleted,
}) => {
  return (
    <View style={styles.task}>
      <CheckBox
        checked={isCompleted}
        checkedColor="black"
        onPress={() => setTaskCompleted(id, !isCompleted)}
      />
      <Text style={[styles.text, isCompleted ? styles.lineThrough : 'none']}>
        {todo}
      </Text>
      <TouchableOpacity onPress={() => handleDelete(id)}>
        <Icon name="delete" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Task;
