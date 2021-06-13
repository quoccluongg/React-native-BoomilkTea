import React, { useContext, useEffect, useState } from 'react'

import {View,Text,SafeAreaView,TouchableOpacity,Image,StyleSheet} from 'react-native'


import {SIZES,COLORS,FONTS,icons} from "../constants"
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';


const HeaderBar = () => {

    const {user} = useContext(AuthContext);
   const [userData, setUserData] = useState(null);

   const getUser = async() => {
     await firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
    .catch((error)=>{
      console.log("error",error);
   });
  }

  useEffect(() => {
    getUser();
  }, [])



    return(
        <SafeAreaView
        style={{
            height:100,
            width:"100%",
            backgroundColor:COLORS.purple,
            flexDirection:'row'
        }}
        >
            {/* {Gretting} */}
                <View
                style={{
                    flex:1,
                    paddingLeft:SIZES.padding
                }}
                >
                    <Text style={{color:COLORS.white,...FONTS.h2}}>{userData ? userData.fname : "Quoc"} {userData ? userData.lname : "Luong"}</Text>
                    <Text style={{color:COLORS.white,...FONTS.h2}}>Chào mừng bạn đến BooMilkTea</Text>
                </View>

            {/* {ToogleButton} */}

        </SafeAreaView>
    )
}
    
export default HeaderBar;