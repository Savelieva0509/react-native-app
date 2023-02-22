import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./nestedScreens/Home";
import MapScreen from "./nestedScreens/MapScreen";
import CommentsScreen from "./nestedScreens/CommentsScreen";

const NestedScreen = createStackNavigator();
const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen name="Map" component={MapScreen} />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
    </NestedScreen.Navigator>
  );
};
export default PostsScreen;
