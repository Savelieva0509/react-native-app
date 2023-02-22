import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import db from "../../../firebase/config";
import { AntDesign } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { nickname } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const addComment = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, nickname });
  };

  const getAllPosts = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View>
              <Text>{item.nickname}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Comment"
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.button} onPress={addComment}>
          <AntDesign name="arrowup" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
  },

  input: {
    height: 50,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    padding: 16,
  },

  form: {
    position: "relative",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  author: {
    fontFamily: "roboto-bold",
  },
  comment: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    minHeight: 30,
    justifyContent: "center",
  },
  commentsField: {
    marginBottom: 24,
    borderColor: "#000",
    borderWidth: 1,
    padding: 5,
  },
  image: {
    marginBottom: 32,
    height: 240,
    borderRadius: 8,
  },
});

export default CommentsScreen;
