import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Styles from '../../styles';

import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';

import FriendsPage from './FriendsPage'
import GroupsPage from './GroupsPage'
import ClasssPage from './ClasssPage'

export default class ContactsHome extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Contacts",
        tabBarVisible: false,

        headerLeft: (
            <TouchableOpacity
                style={Styles.headerButton}
                onPress={() => navigation.openDrawer()}>
                <Icon name="bars" size={25} />
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity
                style={Styles.headerButton}
                onPress={() => {
                    const { params = {} } = navigation.state
                    params.handleHeaderRight()
                } }>
                <Icon name="plus" size={20} />
            </TouchableOpacity>
          ),
    });

    constructor(props){
        super(props)

        this.state= {
            positionSelect:0,
            renderContent: false,
        }
    }

    componentDidMount () {
        setTimeout(() => {this.setState({renderContent: true})}, 0);
        this.props.navigation.setParams({ handleHeaderRight: this.handleHeaderRight })
    }

    handleHeaderRight = () => {
        // alert(this.state.positionSelect)
        switch(this.state.positionSelect){
            case 0:{
                this.props.navigation.navigate("AddFriendsPage")
            }
            break
            case 1:{
                this.props.navigation.navigate("AddGroupsPage")
            }
            break
            case 2:{
                this.props.navigation.navigate("AddClasssPage")
            }
            break

        }
    }

    handleChangeTab({i, ref, from, }) {
        // this.children[i].onEnter();
        // this.children[from].onLeave();

        console.log("handleChangeTab : i =" + i)

        this.setState({
            positionSelect:i
        })
    }

    render() {
        let {renderContent} = this.state;

        return (
            <View style={[style.container, {backgroundColor:'white'}]}>
                { renderContent &&
                <ScrollableTabView
                    // style={{height:500}}
                    initialPage={0}
                    renderTabBar={() => <DefaultTabBar />}
                    locked={true}
                    tabBarPosition='top'
                    //  contentProps={...props}
                    onChangeTab={this.handleChangeTab.bind(this)}>
                    <FriendsPage tabLabel='Friends' index={0} amount={4} params={this.props} />
                    <GroupsPage tabLabel='Groups' index={1} amount={5} params={this.props} />
                    <ClasssPage tabLabel='Classs' index={2} amount={6} params={this.props}/>
                </ScrollableTabView>
                }
            </View>
        );
    }
}

let style = StyleSheet.create({
    container: {
        flex: 1
    },
});