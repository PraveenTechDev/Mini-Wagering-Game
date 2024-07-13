import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.toggleButton}>
            <Image style={styles.eyeImg} source={!showPassword? icons.eye : icons.eyeHide} resizeMode='contain'/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10, 
    marginTop: 10,    
  },
  title: {
    fontSize: 16, 
    color: '#FFFFFF',
    fontWeight: '500', 
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: '#444444', 
    width: '100%',
    height: 50, 
    paddingHorizontal: 16,
    backgroundColor: '#222222',
    borderRadius: 15, 
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    color: '#FFFFFF', 
    fontWeight: '600',
    fontSize: 16, 
  },
  toggleButton: {
    padding: 8,
  },
  eyeImg: {
    width: 24,
    height: 24 
  },
});

export default FormField;
