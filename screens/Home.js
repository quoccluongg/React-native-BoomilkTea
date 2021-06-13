// import { transform } from '@babel/core';
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ImageBackground,
    Animated,
    Image
} from 'react-native';
import {HeaderBar,CustomButton} from '../components'
import { COLORS, SIZES,constants,icons,images,dummyData, FONTS } from '../constants';
import appTheme from '../constants/theme';
// import firestore from '@react-native-firebase/firestore';

const promoTabs = constants.promoTabs.map((promoTab) => ({
    ...promoTab,
    ref:React.createRef()
}))

const TabIndicator = ({measureLayout,scrollX}) => {
    // active click change tab
    const inputRange = promoTabs.map((_,i) => i * SIZES.width)

    const tabIndicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange:measureLayout.map(measure => measure.width)
    })

    const translateX  = scrollX.interpolate({
        inputRange,
        outputRange:measureLayout.map(measure => measure.x)
    })

    return(
        <Animated.View
        style={{
            position:"absolute",
            height:"100%",
            width:tabIndicatorWidth,
            left:0,
            borderRadius:SIZES.radius,
            backgroundColor:COLORS.primary,
            transform:[{
                translateX
            }]
        }}
        >

        </Animated.View>
    )
}

const Tabs = ({appTheme,scrollX,onPromoTabPress}) => {


    const [measureLayout,setMeasureLayout] = React.useState([])
    const containerRef = React.useRef();

    const tabPosition = Animated.divide(scrollX,SIZES.width)


    React.useEffect(() => {
        let ml =[]

        promoTabs.forEach(promo => {
            promo.ref.current.measureLayout(
                containerRef.current,
                (x,y,width,height) => {
                    console.log(x,y,width,height);
                    
                    ml.push({
                        x,y,width,height
                    })


                    if(ml.length === promoTabs.length){
                        setMeasureLayout(ml)
                    }
                }
            )
        })
    },[containerRef.current])


    return(
        <View
        ref={containerRef}
        style={{
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"space-between",
            marginTop:SIZES.padding,
            backgroundColor:appTheme.tabBackgroundColor,
            borderRadius:SIZES.radius 
        }}
        
        >

            {/* Tab Indicator */}
            {measureLayout.length > 0 && <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />}
            

            {/* Tab */}
            {/* Get các tab title */}
            {promoTabs.map((item,index) => {

                const textColor = tabPosition.interpolate({
                    inputRange:[index-1 ,index ,index +1 ],
                    outputRange:[COLORS.lightGray2,COLORS.white,COLORS.lightGray2],
                    extrapolate:"clamp"
                })


                return(
                    <TouchableOpacity
                    key={`PromoTab-${index}`}
                    onPress={() => onPromoTabPress(index)}
                    >
                        <View
                        ref={item.ref}
                        style={{
                            paddingHorizontal:15,
                            alignItems:"center",
                            justifyContent:"center",
                            height:40,
                        }}
                        >
                            <Animated.Text style={{color:textColor,...FONTS.h3}}>{item.title}</Animated.Text>
                        </View>
                    </TouchableOpacity>
                )
            })}

        </View>
    )
}

const Home = ({ navigation }) => {

    // const [posts,setPosts] = useState(null);
    // const [loading,setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {

    //             const list = [];

    //            await firestore()
    //             .collection('posts')
    //             .get()
    //             .then((querySnapshot) => {
    //                 console.log('Total Posts: ', querySnapshot.size);

    //                 querySnapshot.forEach(doc => {
    //                     const {post,postImg} = doc.data();
    //                     list.push(
    //                         {
    //                             id: doc.id,
    //                             name: post,
    //                             description : "BoomilkTea",
    //                             calories: "379 - 570",
    //                             image: postImg
    //                         },
    //                     );
    //                 })
    //             })

    //             setPosts(list);

    //             if(loading){
    //                 setLoading(false);
    //             }

    //             console.log("Post :" , list);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     fetchPosts();

    // },[])

    const scrollX = React.useRef(new Animated.Value(0)).current;

    const promoScrollViewRef = React.useRef()

    // Click chuyen tab hieu ung
    const onPromoTabPress = React.useCallback(promoTabIndex => {
        promoScrollViewRef?.current?.scrollToOffset({
            offset:promoTabIndex * SIZES.width
        })
    })

    function renderAvailabeRewads(){
        return(
            <TouchableOpacity
            style={{
                flexDirection:"row",
                marginTop:SIZES.padding,
                marginHorizontal:SIZES.padding,
                height:100
            }}
            onPress={() => navigation.navigate("Rewards")}
            >
                    {/* Reward Cup */}  
                    {/* Khung chứa ly trà sữa */}
                    <View
                    style={{
                        width:100,
                        height:"100%",
                        alignItems:"center",
                        justifyContent:"center",
                        backgroundColor:COLORS.pink,
                        borderTopLeftRadius:15,
                        borderBottomLeftRadius:15,
                    }}
                    >
                        {/* Hình ảnh ly trà Sữa*/}
                        <ImageBackground
                        source={icons.reward_cup}
                        resizeMode="contain"
                        style={{
                            width:85,
                            height:85,
                            marginLeft:3,
                            alignItems:"center",
                            justifyContent:"center"
                        }}
                        >
                            <View
                            style={{
                                 width:30,
                                 height:30,
                                 borderRadius:15,
                                 alignItems:"center",
                                 justifyContent:"center",
                                 backgroundColor:COLORS.transparentBlack
                            }}
                            >
                                <Text
                                style={{
                                    color:COLORS.white,...FONTS.h4
                                }}
                                >
                                    200
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>


                    {/* Reward Details */}

                    <View
                    style={{
                        flex:1,
                        backgroundColor:COLORS.lightPink,
                        marginLeft:-10,
                        borderRadius:15,
                        alignItems:"center",
                        justifyContent:"center"
                    }}
                    >
                        {/* Tên Trà Sữa */}
                        <Text style={{color:COLORS.primary,...FONTS.h2,
                        fontSize:20}}>Phần thưởng có sẵn</Text>

                        <View
                        style={{
                            marginTop:5,
                            padding:SIZES.base,
                            borderRadius:SIZES.radius * 2,
                            backgroundColor:COLORS.primary
                        }}
                        >
                            {/* Miêu tả trà sữa bn tiền */}
                            <Text style={{color:COLORS.white,...FONTS.body3}}>150 Điểm - 20k </Text>
                        </View>
                    </View>
            </TouchableOpacity>
        )
    }


    function renderPromoDeals(){
        return(
            <View
            style={{
                flex:1,
                alignItems:"center",
            }}
            >
                {/* Header -Tab */}
                <Tabs appTheme={appTheme}
                    scrollX={scrollX}
                    onPromoTabPress={onPromoTabPress}
                />

                {/* Details */}
                {/* dummyData.promos */}
                <Animated.FlatList
                    ref={promoScrollViewRef}
                    data={dummyData.promos}
                    horizontal
                    pagingEnabled
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    onScroll={Animated.event([
                        {nativeEvent:{contentOffset:{x:scrollX}}}
                    ],{
                        useNativeDriver:false
                    })}
                    renderItem={({item,index}) => {
                        return (
                          <View
                            style={{
                              flex: 1,
                              alignItems: "center",
                              width: SIZES.width,
                              paddingTop: SIZES.padding,
                            }}
                          >
                            {/* Image */}
                            {/* images.strawberryBackground */}
                            <Image
                              source={images.strawberryBackground}
                              resizeMode="contain"
                              style={{
                                width: "100%",
                                height:175
                              }}
                            />

                            {/* Name */}
                            <Text
                              style={{
                                color: COLORS.red,
                                ...FONTS.h1,
                                fontSize: 20,
                              }}
                            >
                              {item.name}
                            </Text>

                            {/* Description */}
                            <Text
                              style={{
                                marginTop: 3,
                                color: COLORS.white,
                                ...FONTS.body4,
                              }}
                            >
                              {item.description}
                            </Text>
                            {/* Calories */}
                            <Text
                              style={{
                                marginTop: 3,
                                color: COLORS.white,
                                ...FONTS.body4,
                              }}
                            >
                              Nhiệt : {item.calories}
                            </Text>
                            {/* Button */}
                            <CustomButton
                              label="Đặt ngay"
                              isPrimaryButton={true}
                              containerStyle={{
                                marginTop: 10,
                                paddingHorizontal: SIZES.padding,
                                paddingVertical: SIZES.base,
                                borderRadius: SIZES.radius * 2,
                              }}
                              labelStyle={{
                                ...FONTS.h3,
                              }}
                              onPress={() => navigation.navigate("Location")}
                            />
                          </View>
                        );
                    }}
                />
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <HeaderBar/>
            <ScrollView
            style={{
                flex:1,
                marginTop:-25,
                borderTopLeftRadius:SIZES.radius *1,
                borderTopRightRadius:SIZES.radius * 1,
                backgroundColor:COLORS.secondary
                
            }}
            contentContainerStyle={{
                paddingBottom:100
            }}


            >
                    {/* Reward */}
                    {/* Nằm dưới header */}
                {renderAvailabeRewads()}

                    {/* Promo */}
                    {/* Chứa các item trà sữa */}
                    {renderPromoDeals()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    }
})

function mapStateToProps(state){
    return{
        appTheme:state.appTheme,
        error:state.error
    }
}
function mapDispatchToProps(dispatch){
    return{}
}

export default Home;