import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  CameraType,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import db from '../../firebase/config';

const CreateScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);

  const {userId, nickname} = useSelector((state)=> state.auth)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  const takePhoto = async () => {
    console.log(comment);
    console.log(location);
    const photo = await camera.takePictureAsync();

    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("Home", { photo });
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = await db
      .firestore()
      .collection("posts")
      .add({ photo, comment, location: location.coords, userId, nickname });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();
    
    await db.storage().ref(`postImage/${uniquePostId}`).put(file);

    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();

    return processedPhoto;

    };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 50, width: 70, borderRadius: 8 }}
            />
          </View>
        )}
        <TouchableOpacity style={styles.cameraIcon} onPress={takePhoto}>
          <Feather name="camera" size={24} color="rgba(189, 189, 189, 1)" />
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity style={styles.loadСontainer}>
        <Text style={styles.loadText}>Загрузите фото</Text>
      </TouchableOpacity>
      <View style={styles.form}>
        <View style={{ marginBottom: 31 }}>
          <TextInput
            style={styles.input}
            placeholder="Название"
            onChangeText={setComment}
          />
        </View>
        <View style={{ marginBottom: 32 }}>
          <TextInput
            style={styles.input}
            placeholder="Местность"
          />
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={sendPhoto}>
          <Text style={styles.btnText}>Опубликовать</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  camera: {
    borderRadius: 8,
    height: 240,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(246, 246, 246, 1)",
  },
  cameraIcon: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "white",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    // height: 50,
    // width: 70,
    borderWidth: 1,
    borderColor: "#ffff",
    backgroundColor: "white",
    borderRadius: 8,
  },
  loadСontainer: {
    marginTop: 8,
  },
  loadText: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  form: {
    marginTop: 32,
  },
  input: {
    color: "#BDBDBD",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  submitBtn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "roboto-regular",
    color: "#BDBDBD",
  },
});

export default CreateScreen;
