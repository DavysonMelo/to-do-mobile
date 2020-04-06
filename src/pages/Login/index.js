import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import LoadingModal from '../../components/LoadingModal';
import logo from '../../assets/logo.png';
import styles from './styles'

export default function Login() {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisibility] = useState(false);

  useEffect(() => {
    async function handleAuthorizedUser(){
      try{
        const token = await AsyncStorage.getItem('token');

          if(token) {
            setModalVisibility(true);
            navigation.navigate('home',  { token } );
            setModalVisibility(false);
          }
      }catch(error){
        console.log('Erro async storage', error);
      }
    }
    handleAuthorizedUser();
}, []);

  async function handleLogin() {

    try {
      if(email === ''){
        Alert.alert('Attention!', `Email field can't be empty!`);
      }else if(password === ''){
        Alert.alert('Attention!', `Password field can't be empty!`);
      }else{
        setModalVisibility(true);
        const response = await api.post('sessions', { email, password });
        const { _id } = response.data.user
      
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('userId', _id);

        navigation.navigate('home');
        setModalVisibility(false);
      }
    } catch(error) {
      Alert.alert('Attention!', 'Invalid login');
    }
  }

  return (
    <View style={styles.container}>
      <LoadingModal visible={modalVisible}/>
      <Image style={styles.logo} source={logo}/>

      <View style={styles.form}>

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
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('register')}
      >
        <Text style={styles.textsignUpButton}>Not registered? Sign up</Text>
      </TouchableOpacity>      

      <TouchableOpacity
        style={styles.signInButton}
        onPress={handleLogin}
      >
        <Text style={styles.textButton}>Sign in</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
