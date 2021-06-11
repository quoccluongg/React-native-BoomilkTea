import React, { useState,useContext } from 'react';
import { View,Text, StyleSheet, SafeAreaView, TextInput, Platform, TouchableOpacity,Image, Alert, ActivityIndicator } from 'react-native'
import {dummyData,COLORS,SIZES,FONTS,icons} from '../constants'
import {IconButton,TabButton} from '../components'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';

import {AuthContext}from '../navigation/AuthProvider'


const AddProducts = ({navigation}) => {

  const {user,logout} = useContext(AuthContext);


  const [image,setImage] = useState(null);
  const [uploading,setUpLoading] = useState(false);
  const [transferred,setTransferred] = useState(0);
  const [post,setPost] = useState(null);


  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width:1200,
      height:780,
      cropping:true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    })
  }

  const submitPost = async () => {
    const imageUrl = await uploadImage();
    console.log("Image url: ",imageUrl );
    console.log("Post: " ,post);

    firestore()
    .collection('posts')
    .add({
      userId : user.uid,
      post: post,
      postImg : imageUrl,
      description:null
    })
    .then(() => {
      console.log('Post added !');
      Alert.alert(
        'Posts success !',
        "Your are has been uploaded FireBase Successfully !"
      );

      setPost(null);
    })
    .catch((e) => {
      console.log('Something post',e);
    })

  }




  const uploadImage = async () => {
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);


        // Add timestamp to Filename
        const extension = filename.split('.').pop();
        const name  = filename.split('.').slice(0,-1).join('.');
        filename = name + Date.now() + '.' + extension;

      setUpLoading(true);
      setTransferred(0);

      const storageRef = storage().ref(`photos/${filename}`);

      const task = storageRef.putFile(uploadUri);

      //Set transferred state
      task.on('state_changed', taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

        setTransferred(
           Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes)  * 100
        )
      });

        try {
          await task;

          const url = await storageRef.getDownloadURL();

          setUpLoading(false);
          setImage(null);
          // Alert.alert(
          //   'Image uploaded !',
          //   "Your are has been uploaded FireBase Successfully !"
          // );

          return url;

        } catch (error) {
          console.log(error);
          return null;
        }
        
  }

    function renderHeader(){
        return (
          <SafeAreaView
            style={{
              height: 50,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              justifyContent:"center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: SIZES.radius,
                alignItems: "center",
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
                  style={{ color:
                     COLORS.white, ...FONTS.h1,
                      fontSize: 25 }}
                >
                  Post
                </Text>
              </View>
              {/* Empty */}
              <View style={{width:25}}/>
            </View>
          </SafeAreaView>
        );
    }

function renderContentPost (){
  return(
    <View style={{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      width:"100%",
      backgroundColor:"#2e64e515"
    }}>
      {image != null ? <Image style={{
        width:"100%",
        height:250,
        marginBottom:15
      }} source={{uri : image }} /> : null}
      <TextInput
      placeholder="What's on your mind?"
      multiline
      numberOfLines={4}
      value={post}
      onChangeText={(content) =>setPost(content) }
      style={{
        justifyContent:"center",
        alignContent:"center",
        fontSize:24,
        textAlign:"center",
        width:"90%"
      }}
      />
    {uploading ? (
      <View style={{
        justifyContent:"center",
        alignContent:"center"
      }}>
        <Text>{transferred} % Complete</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <TouchableOpacity
      style={{
        flexDirection:"row",
        justifyContent:"center",
        backgroundColor:"#2e64e515",
        borderRadius:5,
        paddingVertical:10,
        paddingHorizontal:25
      }}
      onPress={submitPost}
      >
        <Text
        style={{
          fontSize:18,
          fontWeight:"bold",
          color:"#2e64e5"
        }}
        >
          Post
        </Text>
      </TouchableOpacity>

    )}

      <ActionButton style={styles.actionButton} buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Choose Photo" onPress={choosePhotoFromLibrary}>
            <Icon name="camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

    </View>
  )
}

    return(
        <View style={styles.container}>
            {renderHeader()}
            {renderContentPost()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
    actionButton:{
      position:"absolute",
      bottom:50,
      left:0
    }
})


export default AddProducts;
