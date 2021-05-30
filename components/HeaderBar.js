import React from 'react'

import {View,Text,SafeAreaView,TouchableOpacity,Image,StyleSheet} from 'react-native'


import {SIZES,COLORS,FONTS,icons} from "../constants"

const HeaderBar = () => {
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
                    <Text style={{color:COLORS.white,...FONTS.h2}}>Loung</Text>
                    <Text style={{color:COLORS.white,...FONTS.h2}}>Welcome Back</Text>
                </View>

            {/* {ToogleButton} */}

        </SafeAreaView>
    )
}
    
export default HeaderBar;