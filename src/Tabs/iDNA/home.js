import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Styles from '../../styles';

import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';

// import friendsPage from './friendsPage'
import MyAppPage from './MyAppPage'
import CenterPage from './CenterPage'
import FollowingPage from './FollowingPage'

class iDNAHome extends Component {

    /*
    static navigationOptions = ({ navigation }) => ({
        title: "iDNA",
        headerLeft: (
            <TouchableOpacity
                style={Styles.headerButton}
                onPress={() => navigation.openDrawer()}>
                <Icon name="bars" size={25} />
            </TouchableOpacity>
        ),
        headerRight: (
            this.state.positionSelect == 0 &&
            <TouchableOpacity
                style={Styles.headerButton}
                onPress={() => {
                    const { params = {} } = navigation.state
                    params.handleHeaderRight()
                } }>
                <Icon name="plus" size={20} />
            </TouchableOpacity>
          ),
    })
    */

    static navigationOptions = ({navigation}) => {
        const {params = {}, positionSelect} = navigation.state;

        // console.log(navigation.state)

        return {
            title: "iDNA",
            headerLeft: (
                <TouchableOpacity
                    style={Styles.headerButton}
                    onPress={() => navigation.openDrawer()}>
                    <Icon name="bars" size={25} />
                </TouchableOpacity>
            ),
            headerRight: (
                params.positionSelect == 0 &&
                <TouchableOpacity
                    style={Styles.headerButton}
                    onPress={() => {
                        const { params = {} } = navigation.state
                        params.handleHeaderRight()
                    } }>
                    <Icon name="plus" size={20} />
                </TouchableOpacity>
              ),
        }
    };

    constructor(props){
        super(props)

        this.state= {
            positionSelect:0
        }
    }

    componentDidMount () {
        this.props.navigation.setParams({ 
            handleHeaderRight: this.handleHeaderRight,
            positionSelect: this.state.positionSelect
        })
    }

    handleHeaderRight = () => {
        switch(this.state.positionSelect){
            case 0:{
                this.props.navigation.navigate("CreateApplicationPage")
            }
        }
    }

    handleChangeTab({i, ref, from, }) {
        // this.children[i].onEnter();
        // this.children[from].onLeave();

        console.log("handleChangeTab : i =" + i)

        this.setState({
            positionSelect:i
        })

        this.props.navigation.setParams({positionSelect: i});
    }
      
    render() {
        return (
            <View style={[style.container, {backgroundColor:'white'}]}>
                {/* <Button
                    onPress={() => this.props.navigation.navigate("Details")}
                    title="Go To Details"
                /> */}

                <ScrollableTabView
                    // style={{height:500}}
                    initialPage={0}
                    renderTabBar={() => <DefaultTabBar />}
                    locked={true}
                    tabBarPosition='top'
                    //  contentProps={...props}
                    onChangeTab={this.handleChangeTab.bind(this)}
                    >
                    <MyAppPage tabLabel='My App' index={0} amount={4} params={this.props} />
                    <CenterPage tabLabel='Center' index={1} amount={5} params={this.props} />
                    <FollowingPage tabLabel='Following' index={2} amount={6} params={this.props} />
                    {/*<FlowPage tabLabel="Tab #4" index={3} amount={7}/>
                    <FlowPage tabLabel='Tab #5' index={2} amount={6}/>
                    <FlowPage tabLabel="Tab #6" index={3} amount={7}/>
                    <FlowPage tabLabel='Tab #5' index={2} amount={6}/>
                    <FlowPage tabLabel="Tab #6" index={3} amount={7}/> */}
                </ScrollableTabView>
            </View>
        );
    }
}

class FlowPage extends React.Component{
	constructor(props){
            super(props)
            
            this.state = {
                  renderContent: false,
            }
      }
      
      componentDidMount() {
            // console.log("FlowPage : " + this.props.tabLabel);
            //  setTimeout(() => {this.setState({renderContent: true})}, 0);
      }

	render(){
            // const { index } = this.props;
            // console.log("Parent index > " + index)

            console.log("+1")
            console.log(this.props)

            console.log("+2")
            
		return (
                  <View style={{flex:1}}>
            {
                  <Text> XXX</Text>
		// <ScrollableTabView
        //     style={{height:250}}
        //     initialPage={0}
        //     renderTabBar={() => <ScrollableTabBar />}
        //     locked={false}
        //     tabBarPosition='bottom'>
        //           <BestGrid tabLabel='Tab #1' index={4} {...this.props}></BestGrid>
        //           <BestGrid tabLabel='Tab #2' index={5} {...this.props}></BestGrid>
        //           <BestGrid tabLabel='Tab #3' index={6} {...this.props}></BestGrid>
        //           <BestGrid tabLabel='Tab #4' index={6} {...this.props}></BestGrid>
        //           <BestGrid tabLabel='Tab #5' index={6} {...this.props}></BestGrid>
        //           <BestGrid tabLabel='Tab #6' index={6} {...this.props}></BestGrid>
        //           <BestGrid tabLabel='Tab #7' index={6} {...this.props}></BestGrid>
        //           <BestGrid tabLabel='Tab #8' index={6} {...this.props}></BestGrid>
        //           <BestGrid tabLabel='Tab #9' index={6} {...this.props}></BestGrid>
        //           <BestGrid tabLabel='Tab #10' index={6} {...this.props}></BestGrid>
		// </ScrollableTabView>
      }
      </View>
		)
	}
}

let style = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default iDNAHome;