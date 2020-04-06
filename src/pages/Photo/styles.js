import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },

  camera: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },

  cameraButton: {
    flex: 0.1,
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 20
  },

  cameraFlip: {
    fontSize: 18,
    marginBottom: 10,
    color: '#FFF' 
  },

  takePic: {
    alignSelf: 'center',
    marginBottom: 30
  },

  picture: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  }
});