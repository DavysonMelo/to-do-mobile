import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    paddingTop: Constants.statusBarHeight + 20,
    alignItems: 'center',
  },

  logo: {
    width: 120,
    height: 120
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 40,
    marginTop: 20
  },

  input: {
    height: 50,
    paddingHorizontal: 20,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#138A72',
    textAlign: 'left',
    color: '#138D72',
    marginBottom: 30
  },

  signUpButton: {
    height: 42,
    backgroundColor: '#138D72',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },

  textButton: {
    color: '#FFF',
    fontWeight: 'bold'
  }
});
