import React from 'react';
import { Location, Order, OrderDetail,OnboardingScreen,LoginScreen,Profile,SignupScreen } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'

import Tabs from "../tabBottom/tabs";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
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
        })
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
          <Stack.Screen name="Home" component={Tabs} />

          <Stack.Screen name="Location" component={Location} />

          <Stack.Screen name="Order" component={Order} />

          <Stack.Screen name="OrderDetail" component={OrderDetail} />
          <Stack.Screen name="Profile" component={Profile} />
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