import { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
} from "react-native";

import { useDispatch } from "react-redux";

import { authSignInUser } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };

    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setstate(initialState);
    dispatch(authSignInUser(state));
  };

  const onClose = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <ImageBackground
        style={styles.image}
        source={require("../../img/background.jpg")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.form,
              paddingBottom: isShowKeyboard ? 20 : 78,
              width: dimensions,
            }}
          >
            <View>
              <Text style={styles.header}>Войти</Text>
            </View>
            <View style={styles.field}>
              <TextInput
                style={styles.input}
                placeholder="Адрес электронной почты"
                value={state.email}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, email: value }))
                }
              />
            </View>
            <View style={styles.field}>
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry={true}
                value={state.password}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, password: value }))
                }
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={handleSubmit}
            >
              <Text style={styles.btnTitle}>Войти</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.link}>
                  Нет аккаунта? Зарегистрироваться
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#FFFFFF",
    paddingTop: 92,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  header: {
    fontFamily: "roboto-bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
    marginBottom: 16,
  },
  field: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    padding: 16,
    fontFamily: "roboto-regular",
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    padding: 16,
    marginTop: 43,
    marginBottom: 16,
    height: 51,
    marginHorizontal: 16,
  },
  btnTitle: {
    fontFamily: "roboto-regular",
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },

  link: {
    textAlign: "center",
    alignItems: "center",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "roboto-regular",
    color: "#1B4371",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
