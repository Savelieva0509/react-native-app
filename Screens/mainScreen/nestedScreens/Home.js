import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";

const Home = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={styles.photo} />
          </View>
        )}
      />

      <Button title="go to map" onPress={() => navigation.navigate("Map")} />
      <Button
        title="go to Comments"
        onPress={() => navigation.navigate("Comments")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 8,
    // alignItems: "center",
  },
  photo: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default Home;
