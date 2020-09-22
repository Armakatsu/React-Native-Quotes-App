import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            prevQuoteIndex: 0,
            currentQuoteText: "Click to show quote!",
            currentQuoteAuthor: "",
            error: null,
        };
    }

    getQuote = () => {
        let url = "https://type.fit/api/quotes";
        let req = new Request(url, { method: "GET" });

        fetch(req)
            .then((res) => res.json())
            .then(this.showQuote)
            .catch(this.showError);
    };

    showQuote = (data) => {
        let index = Math.floor(Math.random() * (Object.keys(data).length - 1));
        if (index === this.state.prevQuoteIndex)
            index = Math.floor(Math.random() * (Object.keys(data).length - 1));
        this.setState({
            prevQuoteIndex: index,
            currentQuoteText: data[index].text,
            currentQuoteAuthor: data[index].author || "Anonymous",
        });
    };

    showError = (err) => {
        this.setState({ error: err.message });
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.card} onPress={this.getQuote}>
                    <View style={{ height: "90%" }}>
                        <Text style={styles.quoteBody}>
                            {this.state.currentQuoteText}
                        </Text>
                    </View>
                    {this.state.error && (
                        <Text style={styles.err}>{this.state.error}</Text>
                    )}
                    <Text style={styles.author}>
                        {this.state.currentQuoteAuthor}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "silver",
        alignItems: "center",
        justifyContent: "center",
        overflow: "scroll",
    },
    quoteBody: {
        color: "white",
        fontSize: 18,
    },
    author: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
    },
    card: {
        width: "80%",
        height: "40%",
        backgroundColor: "darkgray",
        borderRadius: 25,
        padding: 20,
        margin: 5,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    err: {
        color: "red",
        fontSize: 12,
        textAlign: "center",
    },
});
