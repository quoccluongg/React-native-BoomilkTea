import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,TouchableOpacity,
    ImageBackground,
    ScrollView
} from 'react-native';

import {dummyData,COLORS,FONTS,icons,SIZES} from '../constants'


import {IconButton} from '../components';

import {connect} from 'react-redux'

const OrderDetail = ({navigation,route}) => {

    const [selectedItem,setSelectedItem] = React.useState(null)
    const [selectedSize,setSelectedSize] = React.useState(32)
    const [selectedMilkIndex,setSelectedMilkIndex] = React.useState(0)


    React.useEffect(() => {
        let {selectedItem} = route.params
        setSelectedItem(selectedItem)
    },[])
    
function milkButtonHandler(action){
    if(action == "next" && selectedMilkIndex < dummyData.milkList.length - 1){
        setSelectedMilkIndex(selectedMilkIndex + 1)
    }   else if(action == "prev" && selectedMilkIndex > 0){
        setSelectedMilkIndex(selectedMilkIndex - 1)
    }
}


    function reanderHeaderSection(){
        return(
            <View
            style={{
                width:"100%",
                height:"50%",
                alignItems:"center",
                justifyContent:"center"
            }}
            >
                <View
                style={{
                    position:"absolute",
                    top:0,
                    bottom:0,
                    right:0,
                    left:40,
                    borderBottomLeftRadius:100,
                    backgroundColor:COLORS.primary

                }}
                />
                        <Image
                    source={selectedItem?.thumbnail}
                    resizeMode="contain"
                    style={{
                        width:SIZES.width * 0.7,
                        height:SIZES.height * 0.7
                    }}
                    />
                    
                    {/* Back Button */}
                    <IconButton
                    containerStyle={{
                        position:"absolute",
                        top:20,
                        left:20,
                        padding:10,
                        borderRadius:SIZES.radius,
                        backgroundColor:COLORS.black
                    }}
                    icon={icons.leftArrow}
                    onPress={() => navigation.goBack()}
                    />

            </View>
        )
    }


    function renderDetailSection(){
        return (
          <View
            style={{
              flex: 1,
              paddingHorizontal: 30,
              marginTop: SIZES.padding,
              justifyContent: "space-between",
            }}
          >
            {/* Name and Decs */}
            <View>
              <Text
                style={{
                  color: COLORS.yellow,
                  ...FONTS.h1,
                  fontSize: 20,
                }}
              >
                {selectedItem?.name}
              </Text>
              <Text
                style={{
                  marginTop: SIZES.base,
                  color: COLORS.white,
                  ...FONTS.body3,
                }}
              >
                {selectedItem?.description}
              </Text>
            </View>

            {/* Size */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: SIZES.radius,
              }}
            >
              {/* Label */}
              <Text
                style={{
                  flex: 1,
                  color: COLORS.yellow,
                  ...FONTS.h2,
                  fontSize: 17,
                }}
              >
                Pick a Size
              </Text>

              {/* Cup */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                  onPress={() => setSelectedSize(20)}
                >
                  <ImageBackground
                    source={icons.coffee_cup}
                    style={{
                      width: 80,
                      height: 80,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    imageStyle={{
                      tintColor:selectedSize == 20 ?  COLORS.primary : COLORS.gray2,
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body3,
                      }}
                    >
                      20oz
                    </Text>
                  </ImageBackground>
                  <Text
                    style={{
                      marginTop: 3,
                      color: COLORS.white,
                      ...FONTS.h3,
                    }}
                  >
                    40k
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                        style={{
                            alignItems:"center",
                            justifyContent:"flex-end"
                        }}
                        onPress={() => setSelectedSize(32)}
                        >
                            <ImageBackground
                            source={icons.coffee_cup}
                            style={{
                                width:100,
                                height:100,
                                alignItems:"center",
                                justifyContent:"center"
                            }}
                            imageStyle={{
                                tintColor: selectedSize == 32 ? COLORS.primary : COLORS.gray2
                            }}
                            >
                                <Text
                                style={{
                                    color:COLORS.white,...FONTS.body3
                                }}
                                >
                                    30oz
                                </Text>
                            </ImageBackground>
                            <Text
                            style={{
                                marginTop:3,
                                color:COLORS.white,
                                ...FONTS.h3
                            }}
                            >
                                47k
                            </Text>
                        </TouchableOpacity>
              </View>
            </View>

            {/* Milk */}
            <View
            style={{
                flexDirection:"row",
                marginTop:SIZES.padding
            }}
            >
                <View
                style={{
                    flex:1,
                    alignItems:"center"
                }}
                >
                    <Text style={{color:COLORS.yellow,...FONTS.h2,fontSize:17}}>Milk</Text>
                    <View
                    style={{
                        flexDirection:"row",
                        width:100,
                        height:100,
                        marginTop:SIZES.base,
                        alignItems:"center",
                        borderRadius:SIZES.radius,
                        backgroundColor:COLORS.primary
                    }}
                    >
                        <IconButton
                        icon={icons.leftArrow}
                        containerStyle={{
                            marginLeft:-15,
                            width:30,
                            height:30,
                            borderRadius:3,
                            backgroundColor:COLORS.white
                        }}
                        iconStyle={{
                            width:15,
                            height:15,
                            tintColor:COLORS.black
                        }}
                         onPress={() => milkButtonHandler("prev")}
                        />
                        <Image
                        source={dummyData.milkList[selectedMilkIndex].image}
                        resizeMode="contain"
                        style={{
                            flex:1,
                            height:100,
                            width:100,
                            tintColor:COLORS.white
                        }}
                        />

                        <IconButton
                        icon={icons.rightArrow}
                        containerStyle={{
                            marginRight:-15,
                            width:30,
                            height:30,
                            borderRadius:3,
                            backgroundColor:COLORS.white
                        }}
                        iconStyle={{
                            width:15,
                            height:15,
                            tintColor:COLORS.black
                        }}
                        onPress={() => milkButtonHandler("next")}
                        />
                            
                    </View>
                    <Text
                            style={{
                                marginTop:SIZES.base,
                                color:COLORS.white,
                                ...FONTS.body3
                            }}
                            >
                                {dummyData.milkList[selectedMilkIndex].name}
                            </Text>
                </View>

            </View>
          </View>
        );
    }


    return (
        <View 
        style={{
            flex:1,
            backgroundColor:COLORS.secondary,
        }}
        >
            <ScrollView
                contentContainerStyle={{
                    paddingBottom:150,
                    flex:1,
                }}
            >
                {/* Header */}
                {reanderHeaderSection()}
                {/* Deaials */}
                {renderDetailSection()}
            </ScrollView>
        </View>
    )
}



export default OrderDetail;