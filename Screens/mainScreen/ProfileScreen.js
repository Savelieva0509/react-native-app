import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button title="signout" onPress={signOut} />
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
});

export default ProfileScreen;
