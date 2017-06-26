import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Constants, WebBrowser } from 'expo';

import ArticlesList from './Components/Articles/ArticlesList.js';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state= {
      result: null,
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <ArticlesList />
        </View>
      );
  }

  _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://www.usr.ro');
    this.setState({ result });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
