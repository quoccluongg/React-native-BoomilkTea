import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// import Home from '../screens/Home'
import Tabs from '../tabBottom/tabs';


const Stack = createStackNavigator();


const AppStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Tabs} />
        </Stack.Navigator>
    )
}
export default AppStack;