import React from 'react'

import {
    Text,
    View,
    Image,
    StyleSheet,
    Button,
    TouchableOpacity

} from 'react-native'

import Onboarding from 'react-native-onboarding-swiper'

// const Skip = () => (
//     <Button
//     title="Skip"
//     color="#000"
//     />
// )

// const Next = () => (
// <Button
//     title="Next"
//     color="#000"
//     />
// )
    


const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        // SkipButtonComponent={Skip}
        // NextButtonComponent={Next}
        onSkip={() => navigation.replace("LoginScreen")}
        onDone={() => navigation.navigate("LoginScreen")}
        pages={[
          {
            backgroundColor: '#a6e4d0',
            image: <Image source={require('../assets/images/onboarding-img1.png')} />,
            title: 'Chào mừng bạn đến với BooMilk Tea',
            subtitle: 'Chất lượng đi đôi với sản phẩm.',
          },
          {
            backgroundColor: '#fdeb93',
            image: <Image source={require('../assets/images/onboarding-img2.png')} />,
            title: 'Chào mừng bạn đến với BooMilk Tea',
            subtitle: 'Chất lượng đi đôi với sản phẩm.',
          },
          {
            backgroundColor: '#e9bcbe',
            image: <Image source={require('../assets/images/onboarding-img3.png')} />,
            title: 'Chào mừng bạn đến với BooMilk Tea',
            subtitle: 'Chất lượng đi đôi với sản phẩm.',
          }
        ]}
      />
    );
    
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})

export default OnboardingScreen;