import Expo from 'expo';
import React from 'react';

import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import { Constants, WebBrowser } from 'expo';


class ArticleItem extends React.Component {
    constructor(props) {
        super(props);
        this._openUrlLink = this._openUrlLink.bind(this);
    }
    _openUrlLink = async () => {
        return await WebBrowser.openBrowserAsync(this.props.article.link);
    }
    render() {
        return (
            <TouchableHighlight onPress={this._openUrlLink}>
                <View style={styles.article}>
                    <Image style={styles.thumb} source={{uri: this.props.article.picture}} />
                    <View style={styles.content}>
                        <Text style={styles.title}>{this.props.article.title}</Text>
                        <Text style={styles.text}>{this.props.article.content}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 16
    },
    text: {
        marginTop: 15,
    },
    thumb: {
        width: '100%',
        height: 150,
    },
    content: {
        padding: 10,
    },
    article: {
        flex: 1,
        backgroundColor: 'white',
        margin: 5,
        borderWidth: 1
    }
})

export default ArticleItem;