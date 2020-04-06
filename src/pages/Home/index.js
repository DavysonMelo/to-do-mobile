import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  Alert,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import logo from '../../assets/logo.png';
import send from '../../assets/send.png';
import remove from '../../assets/cross.png';
import LoadingModal from '../../components/LoadingModal';
import styles from './styles'

export default function Register() {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [toDos, setToDos] = useState([]);
  const [title, setTitle] = useState('');
  const [modalVisible, setModalVisibility] = useState(false);
  const [visible, setVisible] = useState(false);
  const [uri, setUri] = useState('');
  const navigation = useNavigation();
  

  useEffect(() => {
    getUserInformation();
    loadToDos();
   },[toDos, userId]);

   async function getUserInformation() {
    const usertoken = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('userId');
    setToken(usertoken);
    setUserId(id);
   }

   async function loadToDos() {
    try {
      if(userId){
        const response = await api.get('todo', {
          headers: {
            Authorization: `Bearer ${token}`,
            userid: userId
          }
        });
        setToDos(response.data);
      }
    } catch(error) {
      Alert.alert(error);
    }
   }

   async function handleDelete(id) {
    try {
     await api.delete(`todo/${id}`, {
       headers: {
         Authorization: `Bearer ${token}`,
         userid: userId
       }
     })
     setToDos(toDos.filter(toDo => toDo._id !== id))
    } catch(error) {
      Alert.alert('Attention', 'Delete error')
    }
  }

  async function handleAddToDo() {
    try {
      if(title !== ''){
        setModalVisibility(true);
        const response = await api.post('todo', { title }, {
          headers: {
            Authorization: `Bearer ${token}`,
            userid: userId
          }
        });

        setTitle('');
        setToDos([...toDos, response.data]);
        setModalVisibility(false);  
      }else {
        Alert.alert('Attention', `To do field can't be empty`)
      }
    } catch(error) {
      Alert.alert('Attention', 'Add error');
    }
  }

  async function openImagePickerAsync() {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if(permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const response = await ImagePicker.launchImageLibraryAsync();
    setUri(response.uri);
    setVisible(true);
  }

  async function handleLogout() {
    AsyncStorage.clear();
    navigation.goBack();
  }

  return (
    <View style={styles.container} >
      <LoadingModal visible={modalVisible}/>
      <TouchableOpacity
        style={{ alignSelf: 'flex-end', marginRight: 40 }}
        onPress={handleLogout}
      >
        <Feather name="log-out" size={23} color="#138D72" />
      </TouchableOpacity>

      <Image style={styles.logo} source={logo}/>

      <View style={styles.form}>

      <TextInput
        style={styles.input}
        autoCapitalize="sentences" 
        placeholder="What do you have to do?"
        placeholderTextColor="#138D72"
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity onPress={handleAddToDo}>
        <Image style={styles.sendImg} source={send}/>
      </TouchableOpacity>
      </View>

      <View style={styles.photoButtons}>

        <TouchableOpacity onPress={() => navigation.navigate('camera')}>
          <Feather name="camera" color="#138A72" size={30}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={openImagePickerAsync}>
        <Feather name="image" color="#138A72" size={30}/>
      </TouchableOpacity>

      </View>

      <FlatList
        style={styles.list}
        data={toDos}
        keyExtractor={toDo => toDo._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: toDo }) => (
          <View style={styles.item}>
          <Text style={styles.itemTitle}>{toDo.title}</Text>

          <TouchableOpacity onPress={() => {handleDelete(toDo._id)}}>
          <Image style={styles.removeButton} source={remove}/>
          </TouchableOpacity>
        </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
      >
        <View style={styles.picture}>

          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={() => setVisible(false)}
          >
            <Feather name="x" size={50} color="#000"/>
          </TouchableOpacity>

          <Image
            style={{ width: '100%', height: 300 }}
            source={{ uri: uri }}
          />

        </View>
      </Modal>
      
    </View>
  );
}
