import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigator, } from 'react-navigation';
import SimpleExample from './SimpleExample';
import ScrollableTabsExample from './ScrollableTabsExample';
import OverlayExample from './OverlayExample';
import FacebookExample from './FacebookExample';
import DynamicExample from './DynamicExample';
import CollapsableExample from './CollapsableExample';

const HomeScreen = React.createClass({
  navigationOptions: {
    title: 'Welcome',
  },

  render() {
    const { navigate, } = this.props.navigation;

    return <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('Simple')}
      >
        <Text>Simple example</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('Scrollable')}
      >
        <Text>Scrollable tabs example</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('Overlay')}
      >
        <Text>Overlay example</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('Facebook')}
      >
        <Text>Facebook tabs example</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('Dynamic')}
      >
        <Text>Dynamic tabs example</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate('Collapsable')}
      >
        <Text>Collapsable content example</Text>
      </TouchableOpacity>
    </View>;
  },
});

const App = new StackNavigator({
  Home: { screen: HomeScreen, },
  Simple: { screen: SimpleExample, },
  Scrollable: { screen: ScrollableTabsExample, },
  Overlay: { screen: OverlayExample, },
  Facebook: { screen: FacebookExample, },
  Dynamic: { screen: DynamicExample, },
  Collapsable: { screen: CollapsableExample, },
});

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    padding: 10,
  },
});