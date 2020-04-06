import React from 'react';
import {View, ActivityIndicator, Modal, StyleSheet} from 'react-native';
export default function LoadingModal({visible}){
    return(
        <View>
            <Modal
                transparent={true}
                visible={visible}
                animationType="fade"
            >
                <View 
                style={styles.modal}>
                    <View style={styles.loadingInfo}>
                        <ActivityIndicator size="large" color="#138A72"/>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modal:{
        backgroundColor:'#00000080',
        flex:1,
    },
    loadingInfo:{
        marginTop: '100%',
        marginHorizontal: '27%',
    }
})