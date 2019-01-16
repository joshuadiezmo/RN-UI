import React from 'react'
import {FlatList, 
        StyleSheet, 
        View, 
        Text, 
        Alert, 
        TouchableOpacity,
        TouchableHighlight,
        Image} from 'react-native'

import ExpandableList from 'react-native-expandable-section-list'

import Icon from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux';

import Swipeout from 'react-native-swipeout'

var _ = require('lodash');
import ImageWithDefault from '../../Utils/ImageWithDefault'
import * as actions from '../../Actions'

import Constant from '../../Utils/Constant'
import DictStyle from './dictStyle'

import {getStatusBarHeight} from '../../Utils/Helpers'

class ListGroupMemberPage extends React.Component{

    static navigationOptions = ({ navigation }) => ({
        title: "Members",
        headerRight: (
            <View style={{flexDirection:'row', flex:1}}>
                <TouchableOpacity 
                    style={{paddingRight:10}}
                    onPress={()=>{
                        // GroupMemberInvite
                        const { params = {} } = navigation.state
                        params.handleInvite()
                    }}>
                    <Text style={{color:'black', fontSize:16}}>Invite</Text>
                </TouchableOpacity> 
            </View>
        ),
    });

    constructor(){
        super();
        this.state = { 
            renderContent: false,
            data:[]
        }
    }

    handleInvite = () => {
        this.props.navigation.navigate("GroupMemberInvite")
    }

    componentWillMount(){
        this.props.navigation.setParams({ handleInvite: this.handleInvite })

        const { navigation } = this.props;
        const group = navigation.getParam('group', null);

        let members = []
        let pending = []
        _.each(group.group_profile.members,  function(_v, _k) { 
            switch(_v.status){
                case Constant.GROUP_STATUS_MEMBER_INVITED:{
                    pending.push({
                        name:_v.friend_name,
                        status:_v.status,
                        image_url:_v.friend_image_url
                    })
                    break;
                }
                case Constant.GROUP_STATUS_MEMBER_JOINED:{
                    members.push({
                        name:_v.friend_name,
                        status:_v.status,
                        image_url:_v.friend_image_url
                    })
                    break;
                }
            }
        });

        this.setState({
            data: [{title: 'Members',member: members}, {title: 'Pending', member: pending}]
        })
    }

    FlatListItemSeparator = () => {
        return (
            <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "#607D8B",
            }}
            />
        );
    }

    GetFlatListItem (item) {
        Alert.alert(item);   
    }

    render_FlatList_header = () => {
        var header_View = (
            <View>
                <TouchableOpacity 
                        onPress={()=>{
                            this.props.navigation.navigate('MyApplicationProfilePage')
                        }}>
                <View style={{  backgroundColor:'white', 
                                flexDirection:'row', 
                                paddingTop:10, 
                                paddingBottom:10,
                                paddingLeft:5,
                                paddingRight:5}}
                    onPress={{}}>
                    <TouchableOpacity 
                        style={{height:60,
                                width: 60,
                                borderRadius: 10}}
                                onPress={
                                    ()=>this.props.navigation.navigate("FriendProfilePage")
                                  }>
                        <FastImage
                            style={{width: 60, height: 60, borderRadius: 10}}
                            source={{
                            uri: 'https://unsplash.it/400/400?image=1',
                            headers:{ Authorization: 'someAuthToken' },
                            priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </TouchableOpacity>
                    <View style={{paddingLeft:10, justifyContent:'center'}}>
                        <Text>Name Group : Somkid</Text>
                    </View>
            
                </View>
                </TouchableOpacity>
                {/* {this.FlatListItemSeparator()} */}

            </View>
        );
        return header_View ; 
    };

    render_FlatList_footer = () => {
        var footer_View = (
            <View style={styles.header_footer_style}>
            <Text style={styles.textStyle}> FlatList Footer </Text>
            </View>
        );
        return footer_View; 
    };

    _renderRow = (rowItem, rowId, sectionId) => {

        console.log(rowItem)

        let swipeoutRight = []

        switch(rowItem.status){
            case Constant.GROUP_STATUS_MEMBER_INVITED:{
                swipeoutRight = [
                    {
                        component: <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}><Text style={{color:'white'}}>Cancel</Text></View>,
                        backgroundColor: 'red',
                        onPress: () => { 
                            alert('Cancel')
                        }
                    }
                ]
                break;
            }
            case Constant.GROUP_STATUS_MEMBER_JOINED:{
                swipeoutRight = [
                    {
                        component: <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}><Text style={{color:'white'}}>Delete</Text></View>,
                        backgroundColor: 'red',
                        onPress: () => { 
                            alert('Delete')
                        }
                    }
                ]
                break;
            }
        }
        
        return( 
            <Swipeout 
                style={{backgroundColor:'white'}} 
                right={swipeoutRight}>
                <View style={{flex:1, height:100, padding:10, backgroundColor:'white', flexDirection:'row', alignItems:'center',}}>
                  <TouchableHighlight 
                      style={{height:60,
                              width: 60,
                              borderRadius: 10}}>
                      <ImageWithDefault 
                        source={{uri: rowItem.image_url}}
                        style={{width: 60, height: 60, borderRadius: 10, borderColor:'gray', borderWidth:1}}
                      />
                  </TouchableHighlight>
                  <View style={{flex:1, justifyContent:'center', marginLeft:5}}>
                    <Text style={{fontSize:18}}>{rowItem.name}</Text>
                 </View>
                </View>
            </Swipeout>)
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({
        //     group: nextProps.selected,
        // });

        console.log("008 - componentWillReceiveProps");
    }

    _renderSection = (section, sectionId, state)  => {
        let {data} = this.state

        let m_length = data[sectionId].member.length
        if(m_length == 0){
            console.log('000001')
            return ;
        }
  
        let ic_collapse;
        if(state){
        ic_collapse = <Image
                        style={{width: 20, height: 20}}
                        source={require('../../Images/collapse_down.png')}
                        // resizeMode={FastImage.resizeMode.contain}
                    />
        }else{
            ic_collapse = <Image
                          style={{width: 20, height: 20}}
                          source={require('../../Images/collapse_up.png')}
                          // resizeMode={FastImage.resizeMode.contain}
                    />
        }
  
        return (
            <View
                style={{ 
                        height: 30, 
                        flexDirection: 'row',
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        borderBottomWidth: 0.5,
                        borderBottomColor: DictStyle.colorSet.lineColor }}>
            <View style={{ flexDirection: 'row', 
                        alignItems: 'center'}}>
                <Text style={{ fontSize: DictStyle.fontSet.mSize, 
                                color: 'gray',
                                paddingLeft: 10,
                                fontWeight:'700' }}>
                {section + "(" + m_length +")"}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {ic_collapse}
            </View>
            </View>
        )
    }
      
    render() {
        // let {renderContent, data} = this.state;

        return (
            // <View style={{flex:1, marginTop:getStatusBarHeight()}}>
            //     <View style={{flexDirection:'row', height:60, }}>
            //         <TouchableOpacity 
            //             style={{
            //                     borderWidth: 1, 
            //                     borderColor: 'red',
            //                     borderRadius: 10,
            //                     height:40, 
            //                     width:60,
            //                     justifyContent: 'center', 
            //                     alignItems: 'center',
            //                     margin:10
            //                         }}
            //             onPress={()=>{
            //                 this.props.navigation.goBack()
            //             }}>
            //             <Text style={{color:'red'}}>Close</Text>
            //         </TouchableOpacity> 

            //         <TouchableOpacity 
            //             style={{
            //                     borderWidth: 1, 
            //                     borderColor: 'black',
            //                     borderRadius: 10,
            //                     height:40, 
            //                     width:60,
            //                     justifyContent: 'center', 
            //                     alignItems: 'center',
            //                     margin:10,
            //                     position:'absolute',
            //                     right:0
            //                         }}
            //             onPress={()=>{
            //                 this.props.navigation.navigate('ListClassUserPage')
            //             }}>
            //             <Text style={{color:'black'}}>Invite</Text>
            //         </TouchableOpacity> 
            //     </View>
                <ExpandableList
                    style={{flex:1}}
                    ref={instance => this.ExpandableList = instance}
                    dataSource={this.state.data}
                    headerKey="title"
                    memberKey="member"
                    renderRow={this._renderRow}
                    headerOnPress={(i, state) => {
                    } }
                    renderSectionHeaderX={this._renderSection}
                    openOptions={[0, 1]}
                    removeClippedSubviews={false}
                />
            // </View> 
        );
    }
}

const styles = StyleSheet.create({
    
    MainContainer :{
        justifyContent: 'center',
        flex:1,     
    },
        
    FlatList_Item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
        
    header_footer_style:{
        width: '100%', 
        height: 44, 
        backgroundColor: '#4CAF50', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    
    textStyle:{
        textAlign: 'center', 
        color: '#fff', 
        fontSize: 21
    }
});

const mapStateToProps = (state) => {
    console.log(state)

    if(!state._persist.rehydrated){
      return {}
    }
  
    return{
      auth:state.auth
    }
}

export default connect(mapStateToProps, actions)(ListGroupMemberPage);