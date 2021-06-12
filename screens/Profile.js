import React, { useContext, useEffect, useState } from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';


 const Profile = ({navigation}) => {
   const {user,logout} = useContext(AuthContext);
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
                  source={{uri : userData ? userData.userImg : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'}}
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
                    {userData ? userData.fname : "Dam"} {userData ? userData.lname : "Loung"}
                </Text>
                <Text style={{
                  color:"#fff",
                  fontWeight:"bold",
                  fontSize:16
                }}>{user.uid}</Text>
            </View>
          </SafeAreaView>
        );
    }


    function renderBodyInfoSecton(){
        return (
          <View>
            
            {/* <View style={styles.listRender}>
            <FontAwesome name="user-o" color="#333333" size={20} />
              <Text style={styles.userItem}>{userData ? userData.fname : "Dam"} {userData ? userData.lname : "Loung"}</Text>
            </View>

            <View style={styles.listRender}>
            <FontAwesome name="address-card" color="#333333" size={20} />
              <Text style={styles.userItem}>{userData ? userData.about : "V.I.P"}</Text>
            </View> */}
            <View style={styles.listRender}>
            <FontAwesome name="map-marker" color="#fff" size={25} />
              <Text style={styles.userItem}>{userData ? userData.country : "Da Nang"}</Text>
            </View>
            <View style={styles.listRender}>
            <FontAwesome name="envelope" color="#fff" size={25} />
              <Text style={styles.userItem}>{userData ? userData.email : "luongd872@gmail.com"}</Text>
            </View>
            <View style={styles.listRender}>
            <FontAwesome name="phone" color="#fff" size={25} />
              <Text style={styles.userItem}>{userData ? userData.phone : "0343262882"}</Text>
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
                        width:100,
                        paddingVertical:15,
                        marginRight:SIZES.radius,
                        borderRadius:SIZES.radius,
                    }}
                    labelStyle={{
                        ...FONTS.h3,
                        fontSize:20
                    }}
                    onPress={() => logout()}
                />
                <CustomButton
                    isPrimaryButton={true}
                    label="Edit"
                    containerStyle={{
                        width:100,
                        paddingVertical:15,
                        marginRight:SIZES.radius,
                        borderRadius:SIZES.radius
                        
                    }}
                    labelStyle={{
                        ...FONTS.h3,
                        fontSize:20
                    }}
                    onPress={() => navigation.navigate('EditProfile')}
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
        fontSize:18,
        fontWeight:"bold"
     },
     listRender : {
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderWidth:1,
        borderBottomColor:COLORS.white1,
        paddingHorizontal:5,
        paddingVertical:5,
        borderTopColor:"transparent",
        borderRightColor:"transparent",
        borderLeftColor:"transparent",
        marginTop:"5%"
     }
 })
 

 export default Profile;