import Expo from 'expo';
import React from 'react';

import { StyleSheet, ListView, View, ActivityIndicator, Text, RefreshControl } from 'react-native';
import { Constants } from 'expo';

import ArticleItem from './ArticleItem';

class ArticlesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            ds: new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2}),
        }
    }

    componentDidMount() {
        return fetch('http://localhost:3000/api/articles')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    ds: this.state.ds.cloneWithRows(responseJson),
                    isRefreshing: false,
                })
            })
            .catch(error => console.log(error))
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        return fetch('http://localhost:3000/api/articles')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isRefreshing: false,
                    ds: this.state.ds.cloneWithRows(responseJson)
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: Constants.statusBarHeight}}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)} />
                    }
                    dataSource={this.state.ds}
                    renderRow={(rowData) => <ArticleItem article={rowData} />}
                />
            </View>
        );
    }

}

export default ArticlesList;