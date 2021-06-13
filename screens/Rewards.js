import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ImageBackground
} from 'react-native';


import { HeaderBar,CustomButton } from "../components";
import { dummyData,COLORS,FONTS,SIZES,icons } from '../constants'


// import { connect } from "react-redux";


const Rewards = ({navigation,appTheme}) => {

    function renderRewardPointSection(){
        return(
            <View
            style={{
                alignItems:"center",
                marginVertical:SIZES.padding
            }}
            >
                {/* Text */}
                <Text
                style={{
                    color:COLORS.primary,
                    ...FONTS.h1,
                    fontSize:35,
                }}
                >
                Phần Thưởng
                </Text>
                <Text
                style={{
                    marginTop:7,
                    color:COLORS.white1,
                    width:SIZES.width * 0.6,
                    textAlign:"center",
                    ...FONTS.h3,
                    lineHeight:18
                }}
                >
                    60 điểm bạn còn cách phần thưởng tiếp theo
                </Text>
                {/* Image */}

                <ImageBackground
                source={icons.reward_cup}
                resizeMode="contain"
                style={{
                    marginTop:SIZES.padding,
                    width:SIZES.width * 0.8,
                    height:SIZES.width * 0.8,
                    alignItems:"center",
                    justifyContent:"center"
                }}
                >
                    <View
                    style={{
                        width:70,
                        height:70,
                        borderRadius:35,
                        alignItems:"center",
                        justifyContent:"center",
                        backgroundColor:COLORS.white
                    }}
                    >
                        <Text style={{...FONTS.h1}}>280</Text>
                    </View>
                </ImageBackground>

            </View>
        )
    }
    function renderButton(){
        return(
            <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center'
            }}
            >
                {/* Scan */}
                <CustomButton
                    isPrimaryButton={true}
                    label="Lấy điểm"
                    containerStyle={{
                        width:130,
                        paddingVertical:5,
                        marginRight:SIZES.radius,
                        borderRadius:SIZES.radius * 2,
                    }}
                    labelStyle={{
                        ...FONTS.h3
                    }}
                    onPress={() => navigation.navigate("Location")}
                />


                {/* rRedem */}

                <CustomButton
                    isSecondaryButton={true}
                    label="Rút điểm"
                    containerStyle={{
                        width:130,
                        paddingVertical:5,
                        borderRadius:SIZES.radius * 2,
                    }}
                    labelStyle={{
                        ...FONTS.h3
                    }}
                    onPress={() => navigation.navigate("Location")}
                />
            </View>
        )
    }
    function renderAviableRewardsHeader(){
        return(
            <View
            style={{
                marginTop:SIZES.padding,
                marginBottom:SIZES.radius,
                paddingHorizontal:SIZES.padding
            }}
            >
                <Text style={{color:COLORS.white1,...FONTS.h2}}>Phần thưởng có sẵn</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <HeaderBar/>
            {/* Details */}

            <FlatList
            style={{
                marginTop:-25,
                borderTopLeftRadius:SIZES.radius * 2,
                borderTopRightRadius:SIZES.radius * 2,
                backgroundColor:COLORS.secondary
            }}
            data={dummyData.availableRewards}
            keyExtractor={item => `${item.id}`}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <View>
                    {/* <Reward Ponit */}
                    {renderRewardPointSection()}

                    {/* Button */}
                    {renderButton()}
                    {/* Header Label */}
                    {renderAviableRewardsHeader()}
                </View>
            }
            renderItem={({item}) => {
                return(
                    <View
                    style={{
                        alignItems:"center",
                        justifyContent:"center",
                        marginHorizontal:SIZES.padding,
                        marginBottom:SIZES.base,
                        paddingVertical:SIZES.base,
                        borderRadius:12,
                        backgroundColor:item.eligible ? COLORS.yellow : COLORS.black
                    }}
                    >
                        <Text style={{
                            color:item.eligible ? COLORS.black : COLORS.lightGray2,
                            ...FONTS.body3
                        }}>{item.title}</Text>
                    </View>
                )
            }}

            ListFooterComponent={
                <View style={{marginBottom:120}}></View>
            }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default Rewards;