import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from './router';

const loadApplication = async () => {
  await Font.loadAsync({
    "roboto-regular": require("./fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./fonts/Roboto-Bold.ttf"),
    "roboto-medium": require("./fonts/Roboto-Medium.ttf"),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const routing = useRoute({});
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
    <NavigationContainer style={styles.container}>
      {routing}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    resizeMode: "cover",
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
