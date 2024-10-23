import React, { useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { Input, Header, Button } from "../../components";
import { useDispatch } from "react-redux";
import { ADD_USER_DATA } from "../../state/StoreEvents";

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
  },
  mainContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  img: {
    marginTop: 0,
    paddingTop: 0,
    marginBottom: 0,
    paddingBottom: 0,
    resizeMode: "stretch",
    width: "100%",
    height: "30%",
  },
});

const LOGIN_API = "http://power-pag.cs.colman.ac.il/user/login";
const FAILED_LOGIN_STATUS = "fail";

const loginUser = (userCreds) => {
  return fetch(LOGIN_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userCreds),
  }).then((response) => response.json());
};

const Login = ({ navigation }) => {
  const [alignment, setAlignment] = useState(new Animated.Value(0));
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const addUserDataToStore = (userData) =>
    dispatch({ type: ADD_USER_DATA, payload: userData });

  const toDocumentsPage = () => {
    Animated.timing(alignment, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const heightIntropolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  const opacityIntropolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const mainContainerStyle = {
    height: heightIntropolate,
    opacity: opacityIntropolate,
  };

  const saveUserDataToStore = async (userName, userId, adminPrivilege) => {
    const userData = {
      userName,
      userId,
      adminPrivilege,
    };

    addUserDataToStore(userData);
  };

  const handleLoginButtonClick = async () => {
    const userCreds = { password, israeliId: id };
    console.log(`Try login with: ${JSON.stringify(userCreds)}`);

    const userLoginData = await loginUser(userCreds);
    console.log(`Received user data: ${JSON.stringify(userLoginData)}`);

    if (FAILED_LOGIN_STATUS == userLoginData.status) {
      alert("ניסיון ההתחברות נכשל, אנא נסה שוב.")
    }

    await saveUserDataToStore(
      userLoginData.fullName,
      userLoginData.objectId,
      userLoginData.adminPrivilege
    );

    if (userCreds.israeliId.length < 9 || userCreds.password.length < 6) {
      Alert.alert("לא ניתן להתחבר", "תעודת זהות או סיסמה לא תקינים");
    } else {
      navigation.replace("Menu");
    }
  };

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <Image
          source={require("../../img/login-image.jpg")}
          style={styles.img}
        />
        <View style={styles.container}>
          <Animated.View style={[styles.mainContainer, mainContainerStyle]}>
            <View style={{ width: "100%" }}>
              <Header
                title=" ברוכים הבאים לאפליקציית הפגייה של וולפסון "
                subTitle="לאזור האישי"
              />
            </View>

            <View>
              <Input
                icon="ios-wallet"
                placeholder="תעודת זהות"
                value={id}
                onChangeText={setId}
              />
              <Input
                icon="ios-checkmark-outline"
                placeholder="סיסמה"
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <Button onPress={handleLoginButtonClick} title="להתחברות" />
            <Button
              background={false}
              onPress={() => navigation.navigate("Register")}
              title="להרשמה לחץ כאן"
            />
          </Animated.View>
        </View>
      </ScrollView>
    </>
  );
};

export default Login;
