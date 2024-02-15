import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AddTodo from './AddTodo';
import Task from './Task';

const TodoList = () => {
  const [TodoData, setTodoData] = useState([]);
  const [newId, setNewId] = useState(151);
  const setDataId = data => {
    data.id = newId;
    setNewId(newId + 1);
    return data;
  };

  const getData = () => {
    console.log('data fetched');
    fetch('https://dummyjson.com/todos')
      .then(res => res.json())
      .then(data => setTodoData(data.todos))
      .catch(error => console.log('Error fetching data:', error));
  };

  const addData = newTodo => {
    console.log('adding data');
    console.log(newTodo);
    fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        todo: newTodo,
        completed: false,
        userId: 5,
      }),
    })
      .then(res => res.json())
      .then(data => setTodoData([setDataId(data), ...TodoData]))
      .catch(error => console.log('Error fetching data:', error));
  };

  const deleteData = id => {
    console.log('deleting data', id);
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => setTodoData(TodoData.filter(todo => todo.id !== id))) //here we are not using data bcoz server doesnt have this todo in its database because we created it
      .catch(error => console.log('Error fetching data:', error));
  };

  const setTaskCompleted = (id, completed) => {
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'PUT' /* or PATCH */,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        completed: {completed},
      }),
    })
      .then(res => res.json())
      .then(data =>
        setTodoData([
          {...TodoData.find(todo => todo.id === id), completed: completed},
          ...TodoData.filter(todo => todo.id !== id),
        ]),
      )
      .catch(error => console.log('Error fetching data:', error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>ToDo List</Text>
      <AddTodo
        styles={styles}
        placeholder={'Type here...'}
        handlePress={addData}
      />
      <ScrollView
        contentContainerStyle={styles.tasksContainer1}
        style={styles.tasksContainer2}>
        {TodoData.map((todo, index) => (
          <Task
            styles={styles}
            key={index}
            todo={todo.todo}
            isCompleted={todo.completed}
            id={todo.id}
            handleDelete={deleteData}
            setTaskCompleted={setTaskCompleted}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  h1: {
    fontSize: 40,
    fontWeight: 'bold',
    backgroundColor: '#9c41f4',
    color: 'black',
    width: '100%',
    textAlign: 'center',
    borderWidth: 3,
    borderColor: 'black',
    elevation: 40,
    textShadowColor: 'rgba(0,0,0, 0.5)', // Shadow color with 50% opacity
    textShadowOffset: {width: 2, height: 2}, // Shadow offset
    textShadowRadius: 5, // Shadow radius
  },
  addTodo: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
    padding: 5,
  },
  textInput: {
    backgroundColor: 'white',
    color: 'black',
    padding: 10,
    flex: 3,
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#c2b2dc',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    borderWidth: 1,
    borderRadius: 5,
    elevation: 20,
  },
  btnText: {
    color: 'black',
    fontSize: 20,
  },
  task: {
    backgroundColor: 'rgba(255,255, 255, 0.5)',
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 20,
    elevation: 80,
  },
  text: {
    color: 'black',
    fontSize: 16,
    flex: 1,
  },
  tasksContainer1: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tasksContainer2: {
    flexDirection: 'column',
    backgroundColor: '#43077d',
    width: '100%',
  },
  lineThrough: {
    textDecorationLine: 'line-through',
  },
});

export default TodoList;
