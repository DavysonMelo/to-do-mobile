import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import LoadingModal from '../../components/LoadingModal';
import logo from '../../assets/logo.png';
import styles from './styles'

export default function Register() {

  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [modalVisible, setModalVisibility] = useState(false);

  async function handleRegister() {

    const data = {
      name,
      email,
      password
    }

    try {
      if(name === '') {
        Alert.alert('Attention!', `Name field can't be empty!`);
      }else if(email === '') {
        Alert.alert('Attention!', `Email field can't be empty!`);
      }else if(password === '') {
        Alert.alert('Attention!', `Password field can't be empty!`);
      }else if(repeat === '') {
        Alert.alert('Attention!', `You must confirm your password!`);
      }else {
        if(password === repeat){
          setModalVisibility(true);
          const response = await api.post('user', data);

          const { _id } = response.data.user

          await AsyncStorage.setItem('token', response.data.token);
          await AsyncStorage.setItem('userId', _id);

          navigation.navigate('home');
          setModalVisibility(false);
        }else{
          Alert.alert('Attention!', 'Passwords must be the same!');
        }
      }
    } catch(error) {
      Alert.alert('Attention!', 'Register error');
    }

  }

  return (
    <View style={styles.container}>
      <LoadingModal visible={modalVisible}/>
      <TouchableOpacity
        style={{ alignSelf: 'flex-start', marginLeft: 15 }}
        onPress={() => navigation.goBack()} 
      >
        <Feather name="chevron-left" size={45} color="#138D72" />
      </TouchableOpacity>
      <Image style={styles.logo} source={logo}/>

      <View style={styles.form}>
      <TextInput
        style={styles.input}
        autoCapitalize="sentences"
        placeholder="Name"
        placeholderTextColor="#138D72"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        autoCapitalize="none" 
        placeholder="Email"
        placeholderTextColor="#138D72"
        textContentType="emailAddress"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder="Password" 
        placeholderTextColor="#138D72"
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        autoCapitalize="none"
        placeholder="Repeat"
        placeholderTextColor="#138D72"
        value={repeat}
        onChangeText={setRepeat}
      />

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={handleRegister}
      >
        <Text style={styles.textButton}>Sign up</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
