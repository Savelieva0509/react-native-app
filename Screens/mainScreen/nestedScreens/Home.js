import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../../redux/auth/authOperations";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import db from "../../../firebase/config";
const Home = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPost();
  }, [route.params]);

    const signOut = () => {
      dispatch(authSignOutUser());
    };

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="logout"
        size={32}
        color="gray"
        onPress={signOut}
        style={{ marginBottom: 32 }}
      />
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postWrapper}>
            <Image source={{ uri: item.photo }} style={styles.photo} />
            <Text style={styles.name}>{item.name}</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View>
                <EvilIcons
                  name="comment"
                  size={24}
                  color="grey"
                  onPress={() =>
                    navigation.navigate("Comments", { postId: item.id })
                  }
                />
              </View>
              <View>
                <EvilIcons
                  name="location"
                  size={24}
                  color="grey"
                  onPress={() =>
                    navigation.navigate("Map", { location: item.location })
                  }
                />
                <Text></Text>
              </View>
            </View>
          </View>
        )}
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
  postWrapper: {
    marginBottom: 32,
  },
  photo: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "roboto-regular",
    marginBottom: 8,
  },
});

export default Home;
