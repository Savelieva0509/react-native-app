import React from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";

const CommentsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>CommentsScreen</Text>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 8,
        // alignItems: "center",
    }
})

export default CommentsScreen