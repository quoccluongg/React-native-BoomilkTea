import React,{useContext, useState} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Button,
    TouchableOpacity,
    Platform

} from 'react-native'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import SocialButton from '../components/SocialButton'
import { AuthContext } from '../navigation/AuthProvider'


const SignupScreen = ({navigation}) => {

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  // const [confirmPassword,setConfirmPassword] = useState();
 
  const {register} = useContext(AuthContext);


    return (
      <View style={styles.container}>
        <Text style={styles.text}>Create an account</Text>
        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />

        {/* <FormInput
          labelValue={confirmPassword}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="confirm Password"
          iconType="lock"
          secureTextEntry={true}
        /> */}

        <FormButton
          buttonTitle="Sign Up"
          onPress={() => register(email, password)}
        />

        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            By registering, you confirm that you accept our
          </Text>
          <TouchableOpacity onPress={() => alert("Terms Clicked !")}>
            <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
              Terms of service
            </Text>
          </TouchableOpacity>
          <Text style={styles.color_textPrivate}> and </Text>
          <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
            Privacy Policy
          </Text>
        </View>

        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        {Platform.OS === "android" ? (
          <View
          style={{
            flex:1,
            width:"100%"
          }}
          >
            <SocialButton
              buttonTitle="Sign Up with Facebook"
              btnType="facebook"
              color="#4867aa"
              backgroundColor="#e6eaf4"
              onPress={() => {}}
            />

            <SocialButton
              buttonTitle="Sign Up with Google"
              btnType="google"
              color="#de414d"
              backgroundColor="#f5e7ea"
              onPress={() => {}}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.navButtonText}>Have an account ? Sign In</Text>
        </TouchableOpacity>
      </View>
    );
    
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#f9fafd",
        padding: 20,
    },
    text:{
      fontSize:28,
      marginBottom:10,
      color:"#051d5f"
    },
    navButton:{
      marginTop:20,
    },
    navButtonText:{
      fontSize:18,
      fontWeight:"500",
      color:"#2e64e5"
    },
    color_textPrivate:{
      fontSize:13,
      fontWeight:"400",
      color:"grey"
    },
    textPrivate:{
      flexDirection:"row",
      flexWrap:"wrap",
      marginVertical:20,
      justifyContent:"center"
    }
})

export default SignupScreen;