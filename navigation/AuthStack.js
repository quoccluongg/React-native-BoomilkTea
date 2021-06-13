import React from 'react';
import { Location, Order, OrderDetail,OnboardingScreen,LoginScreen,Profile,SignupScreen, AddProducts } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'

import Tabs from "../tabBottom/tabs";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
 import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import Profile from './screens/Profile';

import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Stack = createStackNavigator();

const App = () => {


    const [isFirstLaunch,setIsFirstLaunch] = React.useState(null)
    let routeName;

    React.useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then(value => {
            if(value == null){
                AsyncStorage.setItem('alreadyLaunched','true');
                setIsFirstLaunch(true)
            }else{
                setIsFirstLaunch(false)
            }
        });

        GoogleSignin.configure({
          webClientId: '762156959719-0t25vemi6mh1u23dh84k20rp4vt836ot.apps.googleusercontent.com',
        });

    },[])
    React.useEffect(() => {
        SplashScreen.hide();
    }, [])

    if(isFirstLaunch === null){
        return null;
    } else if(isFirstLaunch == true) {
        routeName = "OnboardingScreen";
    } else{
      routeName = "LoginScreen";
    }

    return (
        <Stack.Navigator
          // screenOptions={{
          //     headerShown: false
          // }}
          initialRouteName={routeName}
        >
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={({ navigation }) => ({
              title: "",
              headerStyle: {
                backgroundColor: "#f9fafd",
                shadowColor: "#f9fafd",
                elevation: 0,
              },
              headerLeft: () => <View style={{marginLeft:10}}>
                  <FontAwesome.Button
                  name="long-arrow-left"
                    size={25}
                    backgroundColor="#f9fafd"
                    color="#333"
                    onPress={() => navigation.navigate("LoginScreen")}
                  />
              </View>,
            })}
          />
        </Stack.Navigator>
    );
}

export default App;