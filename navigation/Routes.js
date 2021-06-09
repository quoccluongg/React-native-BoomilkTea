import React,{useContext,useState,useEffect} from 'react';
import {AuthContext} from './AuthProvider'
import auth from '@react-native-firebase/auth'
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import { NavigationContainer } from '@react-navigation/native';


const Routes = () => {

const {user,setUser} = useContext(AuthContext);
const [initializing,setInitializing] = useState(true);

const onAuthStateChanged = (user) => {
  setUser(user);
  if (initializing) setInitializing(false);
}

useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
},[]);


    if(initializing) return null;


    return (
      <NavigationContainer>
        {user ? <AppStack/> : <AuthStack/>}
      </NavigationContainer>
    );
};

export default Routes;