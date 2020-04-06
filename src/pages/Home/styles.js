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
    width: 90,
    height: 90
  },

  form: {
    alignSelf: 'stretch',
    marginHorizontal: 40,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#138D72',
    marginBottom: 5
  },

  input: {
    height: 50,
    fontSize: 16,
    color: '#138D72',
    paddingRight: '30%'
  },

  sendImg:{
    width: 15,
    height: 19,
    resizeMode: 'contain'
  },

  list: {
    alignSelf: 'stretch',
    marginHorizontal: 40
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#138D72',
    marginBottom: 20
  },

  itemTitle: {
    color: '#138D72',
    lineHeight: 30,
    marginBottom: 5
  },

  removeButton: {
    width: 18,
    height: 17.14
  },

  photoButtons: {
    alignSelf: 'stretch',
    paddingHorizontal: '25%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },

  picture: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  }
});
