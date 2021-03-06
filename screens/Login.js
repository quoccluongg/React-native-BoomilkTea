import React,{useContext, useState} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Button,
    TouchableOpacity,
    Platform,

} from 'react-native'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import SocialButton from '../components/SocialButton'
import { AuthContext } from '../navigation/AuthProvider'


const LoginScreen = ({navigation}) => {

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  const {login,googleLogin} = useContext(AuthContext);

  // const {login}  = useContext(AuthContext)

    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.text}>BoomilkTea</Text>
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

        <FormButton
          buttonTitle="Sign In"
          onPress={() => login(email, password)}
        />

        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        {Platform.OS === "android" ? (
          <View style={{
            flex:1,
            width:"100%"
          }}>
            <SocialButton
              buttonTitle="Sign In with Facebook"
              btnType="facebook"
              color="#4867aa"
              backgroundColor="#e6eaf4"
              onPress={() => {}}
            />

            <SocialButton
              buttonTitle="Sign In with Google"
              btnType="google"
              color="#de414d"
              backgroundColor="#f5e7ea"
              onPress={() => googleLogin()}
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate("SignupScreen")}
        >
          <Text style={styles.navButtonText}>
            Don't have an account? Create here
          </Text>
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
    logo:{
      width:150,
      height:150,
      resizeMode:"cover"
    },
    text:{
      fontSize:28,
      marginBottom:10,
      color:"#051d5f"
    },
    navButton:{
      marginTop:15,
    },
    forgotButton:{
      marginVertical:15,
    },
    navButtonText:{
      fontSize:18,
      fontWeight:"500",
      color:"#2e64e5"
    }
})

export default LoginScreen;