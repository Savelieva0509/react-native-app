import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import db from "../../firebase/config";

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };

  useEffect(() => {
    getUserPosts();
  });

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
        style={{ marginBottom: 32}}
      />
      <View style={styles.container}>
        <FlatList
          data={userPosts}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.postWrapper}>
              <Image source={{ uri: item.photo }} style={styles.photo} />
              <Text style={styles.name}>{item.name}</Text>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View>
                  <EvilIcons
                    onPress={() =>
                      navigation.navigate("Comments", {
                        postId: item.id,
                        photo: item.photo,
                      })
                    }
                    name="comment"
                    size={24}
                    color="grey"
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <EvilIcons name="location" size={24} color="grey" />
                  <Text
                    onPress={() =>
                      navigation.navigate("Map", { location: item.location })
                    }
                  >
                    {item.locationName}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
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

export default ProfileScreen;
