import React from 'react';
import Providers from './navigation';
import {LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);


const App = () => {
    return <Providers/>
}

export default App;