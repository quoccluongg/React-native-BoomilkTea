import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ImageBackground,
    Image,
    SafeAreaView
} from 'react-native';

 import {COLORS,SIZES,FONTS,icons,dummyData} from '../constants'
 import {IconButton,CustomButton} from '../components'
import { AuthContext } from '../navigation/AuthProvider';


 const Profile = ({navigation}) => {
   const {user,logout} = useContext(AuthContext);


    function renderHeaderProfile() {
        return (
          <SafeAreaView
            style={{
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: SIZES.radius,
                alignItems: "center",
                paddingVertical: SIZES.base,
              }}
            >
              {/* Back Button */}
              <IconButton
                icon={icons.leftArrow}
                onPress={() => navigation.goBack()}
              />
              {/* Title */}
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: COLORS.white, ...FONTS.h1, fontSize: 25 }}
                >
                  User Info
                </Text>
              </View>
              {/* Empty */}
              <View style={{ width: 25 }} />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  backgroundColor: COLORS.pink,
                  zIndex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.sunny}
                  resizeMode="contain"
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
              </View>
              {/* Name */}
              <Text
                style={{
                    color:COLORS.white,
                    ...FONTS.h2,
                     fontSize:21
                }}
                >
                    Sun
                </Text>
            </View>
          </SafeAreaView>
        );
    }


    function renderBodyInfoSecton(){
        return (
          <View>
            <View style={styles.listRender}>
              <Text style={styles.userItem}>Username</Text>
              <Text style={styles.userItem}>Dam Quoc Luong</Text>
            </View>

            <View style={styles.listRender}>
              <Text style={styles.userItem}>Email</Text>
              <Text style={styles.userItem}>damquocluongd872@gmalc.com</Text>
            </View>

            <View style={styles.listRender}>
              <Text style={styles.userItem}>phone</Text>
              <Text style={styles.userItem}>03662326326</Text>
            </View>

            {/* Button */}
            <View
            style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center",
                marginTop:20
            }}
            >
            <CustomButton
                    isPrimaryButton={true}
                    label="Log Out"
                    containerStyle={{
                        width:200,
                        paddingVertical:15,
                        marginRight:SIZES.radius,
                        borderRadius:SIZES.radius * 2,
                        
                    }}
                    labelStyle={{
                        ...FONTS.h3,
                        fontSize:20
                    }}
                    onPress={() => logout()}
                />

            </View>

          </View>
        );
    }


     return(
        <View style={styles.container}>
            {/* Header */}
            {renderHeaderProfile()}
            {/* Body Info */}
            {renderBodyInfoSecton()}
        </View>
     )
 }

 const styles = StyleSheet.create({
     container :{
         flex:1,
         backgroundColor:COLORS.yellow
     },
     userItem : {
        color:COLORS.white,
        ...FONTS.body3,
        fontSize:16,
        fontWeight:"bold"
     },
     listRender : {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderWidth:1,
        borderBottomColor:COLORS.white1,
        paddingHorizontal:SIZES.padding,
        paddingVertical:SIZES.padding,
        borderTopColor:"transparent",
        borderRightColor:"transparent",
        borderLeftColor:"transparent",
     }
 })
 

 export default Profile;