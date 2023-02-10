import React from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text>ProfileScreen</Text>
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

export default ProfileScreen