import React from 'react'
import { View,Keyboard, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { windowHeight, windowWidth } from '../utils/Dimention'

export default function FormInput({iconType,labelValue,placeholderText,...rest}) {

    return (
        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={25} color="#666" />
            </View>
            <TextInput
            onSubmitEditing={Keyboard.dismiss}
            style={styles.input}
            value={labelValue}
            numberOfLines={1}
            placeholderTextColor="#666"
            placeholder={placeholderText}
            {...rest}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    inputContainer:{
        marginTop:5,
        marginBottom:10,
        width:"100%",
        height:windowHeight / 12,
        borderColor:"#ccc",
        borderRadius:3,
        borderWidth:1,
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#fff"
    },
    iconStyle:{
        padding: 10,
        height:"100%",
        justifyContent:"center",
        alignItems:"center",
        borderRightWidth:1,
        borderRightColor:"#ccc",
        width:50,
    },
    input:{
        padding:10,
        flex:1,
        fontSize:16,
        color:"#333",
        justifyContent:"center",
        alignItems:"center",
    },
    inputField:{
        padding: 10,
        marginTop:5,
        marginBottom:10,
        width:windowWidth /1.5,
        height:windowHeight /15,
        fontSize:16,
        borderRadius:8,
        borderWidth:1
    }
})
