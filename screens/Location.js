import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image,
    TextInput,
    FlatList
} from 'react-native';

import {connect} from 'react-redux'
import {IconButton,TabButton} from '../components'
import {dummyData,COLORS,SIZES,FONTS,icons} from '../constants'

const Location = ({ navigation,appTheme }) => {

const [selectedTab,setSelectedTab] = React.useState(0)

    function renderHeader(){
        return (
          <SafeAreaView
            style={{
              height: 70,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: SIZES.radius,
                alignItems: "center",
              }}
            >
              {/* Back Button */}
              <IconButton
                icon={icons.leftArrow}
                onPress={() => navigation.goBack()}
              />
              {/* Title */}
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color:
                     COLORS.white, ...FONTS.h1,
                      fontSize: 25 }}
                >
                  Locations
                </Text>
              </View>
              {/* Empty */}
              <View style={{width:25}}/>
            </View>
          </SafeAreaView>
        );
    }
    function renderTopBarSection() {
      return(
        <View
        style={{
          flexDirection:"row",

        }}
        >
          {/* Nearby */}
          <TabButton
          containerStyle={{
            width:80,

          }}
          label="Nearby"
          selected={selectedTab == 0}
          onPress={() => setSelectedTab(0)}
          />

          {/* Previous */}
          <TabButton
          containerStyle={{
            width:100
          }}
          label="Previous"
          selected={selectedTab == 1}
          onPress={() => setSelectedTab(1)}
          />

          {/* Favourite */}
          <TabButton
          containerStyle={{
            width:100,
          }}
          label="Favourite"
          selected={selectedTab == 2}
          onPress={() => setSelectedTab(2)}
          />


        </View>
      )
    }
    function renderSearchBar(){
      return(
        <View
        style={{
          flexDirection:"row",
          marginTop:SIZES.radius,
          height:40,
          paddingHorizontal:SIZES.padding,
          borderRadius:20,
          backgroundColor:COLORS.lightGreen2,
          alignItems:'center'
        }}
        >
          <TextInput
          style={{
            flex:1,
            height:50,
            color:COLORS.black,
            ...FONTS.body3
          }}
          placeholder="Enter here"
          placeholderTextColor={COLORS.lightGray2}
          />

          <Image 
          source={icons.search}
          style={{
            width:30,
            height:30,
            tintColor:COLORS.lightGray2
          }}
          />
        </View>
      )
    }
    function renderLocationList(){
      return (
        <FlatList
          style={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.radius,
          }}
          data={dummyData.locations}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginBottom: SIZES.radius,
                borderRadius: SIZES.radius * 2,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.radius,
                backgroundColor: COLORS.transparentBlack,
              }}
              onPress={() =>
                navigation.navigate("Order", {
                  selectedLocation: item,
                })
              }
            >
              {/* Name & Bookmark */}
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.white,
                    ...FONTS.h2,
                  }}
                >
                  {item.title}
                </Text>

                <Image
                  source={
                    item.bookmarked ? icons.bookmarkFilled : icons.bookmark
                  }
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: item.bookmarked ? COLORS.red2 : COLORS.white,
                  }}
                />
              </View>

              {/* Address */}
              <View
                style={{
                  marginTop: SIZES.base,
                  width: "80%",
                }}
              >
                <Text
                  style={{
                    color: COLORS.white1,
                    ...FONTS.body3,
                    lineHeight: 21,
                  }}
                >
                  {item.address}
                </Text>
              </View>

              {/* Operateion Hours */}
              <View
                style={{
                  marginTop: SIZES.base,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white1,
                    ...FONTS.body5,
                    lineHeight: 16,
                  }}
                >
                  {item.operation_hours}
                </Text>
              </View>

              {/* Pick-Up */}
              <View
                style={{
                  flexDirection: "row",
                  marginTop: SIZES.base,
                }}
              >
                <View
                  style={{
                    borderColor: COLORS.white1,
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: 5,
                  }}
                >
                  <Text style={{ color: COLORS.white1, ...FONTS.body3 }}>
                    Pick-Up
                  </Text>
                </View>
                {/* Delivery */}
                <View
                  style={{
                    borderColor: COLORS.white1,
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: 5,
                    marginLeft:20
                  }}
                >
                  <Text style={{ color: COLORS.white1, ...FONTS.body3 }}>
                  Delivery
                  </Text>
                </View>
              </View>
              
             
            </TouchableOpacity>
          )}
        />
      );
    }


    return (
        <View style={styles.container}>
            {/* Header */}

            {renderHeader()}

            {/* Details */}

            <View
            style={{
              flex:1,
              backgroundColor:COLORS.secondary,
              marginTop:-20,
              borderTopLeftRadius:SIZES.radius * 2,
              borderTopRightRadius:SIZES.radius * 2,
              padding:SIZES.padding
            }}
            >
              {renderTopBarSection()}
              {renderSearchBar()}
              {renderLocationList()}
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    }
})

export default Location;