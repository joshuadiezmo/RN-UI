import React, { Component } from 'react';
import {
    View,
  AppRegistry,
  ImageBackground,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { Header } from 'react-navigation';

import { isIphoneX } from 'react-native-iphone-x-helper';

import FastImage from 'react-native-fast-image'

import {getStatusBarHeight} from '../Utils/Helpers'

import ImageWithDefault from '../Utils/ImageWithDefault'

const remote = 'http://s1.bwallpapers.com/wallpapers/2014/05/09/blue-full-hd-desktop-wallpapers_034316171.jpg';

// https://thekevinscott.com/background-images-in-react-native/
export default class BackgroundImage extends Component {

// https://github.com/react-navigation/react-navigation/blob/master/examples/NavigationPlayground/js/StackWithTranslucentHeader.js
    // Inset to compensate for navigation bar being transparent.
    // And improved abstraction for this will be built in to react-navigation
    // at some point.
    getHeaderInset() {
        const NOTCH_HEIGHT = isIphoneX() ? 25 : 0;
    
        // $FlowIgnore: we will remove the HEIGHT static soon enough
        const BASE_HEADER_HEIGHT = Header.HEIGHT;
    
        const HEADER_HEIGHT =
          Platform.OS === 'ios'
            ? BASE_HEADER_HEIGHT + NOTCH_HEIGHT
            : BASE_HEADER_HEIGHT + getStatusBarHeight();
    
          return HEADER_HEIGHT
        return Platform.select({
          ios: {
            contentInset: { top: HEADER_HEIGHT },
            contentOffset: { y: -HEADER_HEIGHT },
          },
          android: {
            contentContainerStyle: {
              paddingTop: HEADER_HEIGHT,
            },
          },
        });
      }

  render() {
    const resizeMode = 'center';
    const text = 'This is some text inlaid in an <Image />';

    return (
      // <ImageBackground
      //   style={{
      //     backgroundColor: '#ccc',
      //     flex: 1,
      //     resizeMode,
      //   //   position: 'absolute',
      //     width: '100%',
      //     height: '100%',
      //     justifyContent: 'center',
      //   }}
      //   source={{ uri: remote }}
      // >

      
        <View style={{flex:1, paddingTop: this.getHeaderInset(), flexDirection:'row'}}>
            <FastImage
              style={StyleSheet.absoluteFill}
              source={{
              uri: 'https://wallpaper.wiki/wp-content/uploads/2017/05/wallpaper.wiki-Beautiful-Full-HD-Wallpapers-PIC-WPE0011747.jpg',
              headers:{ Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
          />
            <TouchableOpacity
                style={{height:60,
                        width: 60,
                        borderRadius: 30,
                        margin: 20,
                        backgroundColor:'blue'
                        }}        
                >
                <ImageWithDefault 
                    source={{uri: 'https://scontent.fbkk8-2.fna.fbcdn.net/v/t1.0-9/49682566_926064284253361_1603030473750085632_n.jpg?_nc_cat=107&_nc_ht=scontent.fbkk8-2.fna&oh=393d859cd955afe7d6e8f2053c4f5116&oe=5C906265'}}
                    style={{width: 60, height: 60, borderRadius: 30, }}
                />      
            </TouchableOpacity>
            {/* <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end'}}>
                <TouchableOpacity style={{margin:5}}>
                    <Text style={{color:'white'}}>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{margin:5}}>
                    <Text style={{color:'white'}}>SHARE</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
  }
}

// AppRegistry.registerComponent('BackgroundImage', () => BackgroundImage);