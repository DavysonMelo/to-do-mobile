import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    paddingTop: Constants.statusBarHeight + 20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    width: 120,
    height: 120
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 40,
    marginTop: 30
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

  textsignUpButton: {
    color: '#138A72',
    textDecorationLine: 'underline',
    marginBottom: 30
  },

  signInButton: {
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
