import React, { useState } from "react";
import {} from "react-native";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Main from "./components/Main";

const loadApplication = async () => {
  await Font.loadAsync({
    "roboto-regular": require("./fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./fonts/Roboto-Bold.ttf"),
    "roboto-medium": require("./fonts/Roboto-Medium.ttf"),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  
  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
