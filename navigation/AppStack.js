import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from 'react-native-splash-screen'

// import Home from '../screens/Home'
import Tabs from '../tabBottom/tabs';
import { Location, Order, OrderDetail } from '../screens';


const Stack = createStackNavigator();


const AppStack = () => {
    React.useEffect(() => {
        SplashScreen.hide();
    }, [])

    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Tabs} options={{ header: () => null }} />
            <Stack.Screen name="Location" component={Location} options={{ header: () => null }} />
            <Stack.Screen name="Order" component={Order} options={{ header: () => null }} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ header: () => null }} />
        </Stack.Navigator>
    )
}
export default AppStack;