import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Keyboard } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

import ToDosCard from '../components/ToDosCard';

class App extends Component {
  state = {
    title: '',
    todos: [],
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(err => {
        alert(err);
      });
  }

  addToDos = () => {
    if (this.state.title.trim()) {
      const todos = [...this.state.todos, {
        id: 'xx' + Math.random().toString(36).substr(2, 5),
        title: this.state.title,
        completed: false,
      }];

      this.setState({ todos, title: '' });
      //Keyboard.dismiss();
    }
  }

  checkHandler = (id) => {
    const todos = [...this.state.todos];
    for (let item of todos) {
      if (item.id === id) {
        item.completed = !item.completed;
        break;
      }
    }

    this.setState({ todos });
  }

  removeItem = (id) => {
    const todos = [...this.state.todos].filter(item => item.id !== id);

    this.setState({ todos });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={{
            fontSize: 30,
            fontWeight: '500',
            color: '#fff',
          }}>ToDo List</Text>
        </View>
        {/* Todo List */}
        <FlatList
          data={this.state.todos}
          keyExtractor={( item ) => item.id}
          renderItem={({ item }) => {
            return (
              <ToDosCard 
                title={item.title} 
                completed={item.completed}
                check={() => this.checkHandler(item.id)}
                remove={() => this.removeItem(item.id)}
              />
            );
          }}
        />
        {/* Add todos input */}
        <View style={styles.textInputContainer}>
          <TextInput
            style={{ flex: 1, padding: 10, fontSize: 16 }}
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
          <TouchableOpacity style={styles.button} onPress={this.addToDos}>
            <Icons 
              name='plus'
              color='#fff'
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  header: {
    height: 80,
    width: '100%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#0F1096',
    marginBottom: 10,
    justifyContent: 'center'
  },
  textInputContainer: {
    height: 60,
    width: '100%',
    borderRadius: 5,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#0F1096',
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: '#fff'
  },
  button: {
    height: 60,
    width: 60,
    backgroundColor: '#0f1096',
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default App;
