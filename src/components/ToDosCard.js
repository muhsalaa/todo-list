import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';

function ToDosCard({ title, check, completed, remove }) {
  return (
    <View style={styles.container}>
      <Switch value={completed} onChange={check} />
      <Text style={[styles.titleText, completed && { textDecorationLine: 'line-through' }]}>{title}</Text>
      <TouchableOpacity onPress={remove}>
        <Icons 
          name='delete'
          color='#0f1069'
          size={25}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#0f1096',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  titleText: {
    fontSize: 22,
    color: '#0f1096',
    fontWeight: '400',
    margin: 10,
    textTransform: 'capitalize',
    flex: 1
  }
});

export default ToDosCard;
