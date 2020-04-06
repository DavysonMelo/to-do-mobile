import React, { useState, useEffect, useRef } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';

import { Feather } from '@expo/vector-icons';

import styles from './styles';

export default function Photo() {
  const navigation = useNavigation();
  const camRef = useRef(null);
  const [ hasPermission, setHasPermission ] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [uri, setUri] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  },[])

  if(hasPermission === null) {
    return <View />
  }

  if(hasPermission === false) {
    return <Text>No permission to camera</Text>
  }

  async function takePicture() {
    if(camRef) {
      const data = await camRef.current.takePictureAsync();
      setUri(data.uri);
      setVisible(true);
    }
  }

  function back() {
    setVisible(false);
    navigation.goBack();
  }

  return(
    <SafeAreaView style={styles.container} >
      <Camera
          style={{ flex: 1 }}
          type={type}
          ref={camRef}
        >

        <View style={styles.camera}>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Feather name="repeat" size={23} color="#FFF"/>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.takePic}
          onPress={takePicture}
        >
            <Feather name="circle" size={50} color="#FFF" />
        </TouchableOpacity>
        
        {
          uri && 
          <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
          >
            <View style={styles.picture}>

              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={back}
              >
                <Feather name="x" size={50} color="#000"/>
              </TouchableOpacity>

              <Image
                style={{ width: '100%', height: 300 }}
                source={{ uri: uri }}
              />

            </View>
          </Modal>
        }

      </Camera>
    </SafeAreaView>
  )
}