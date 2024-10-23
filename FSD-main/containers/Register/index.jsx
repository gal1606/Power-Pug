import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Animated,
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { ADD_USER_DATA } from "../../state/StoreEvents";
import { Input, Header, Button, Icon } from "../../components";

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
});

const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
const FAILED_REGISTER_STATUS = "fail";

function isValidIsraeliID(id) {
  var id = String(id).trim();
  if (id.length > 9 || id.length < 5 || isNaN(id)) return false;
  // Pad string with zeros up to 9 digits
  id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

  return (
    Array.from(id, Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    }) %
      10 ===
    0
  );
}

const REGISTER_API = "http://power-pag.cs.colman.ac.il/user/register";

const registerNewUser = async (userData) => {
  return fetch(REGISTER_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  }).then((response) => response.json());
};

const Register = ({ navigation }) => {
  const [alignment, setAlignment] = useState(new Animated.Value(0));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [israeliId, setIsraeliId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();
  const addUserDataToStore = (userData) =>
    dispatch({ type: ADD_USER_DATA, payload: userData });

  const saveUserDataToStore = async (userName, userId, adminPrivilege) => {
    const userData = {
      userName,
      userId,
      adminPrivilege,
    };

    addUserDataToStore(userData);
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

  const validateUserData = (userData) => {
    if (userData.password.length < 6) {
      Alert.alert(
        "ניסיון הרשמה נכשל",
        "נא לבחור סיסמה באורך 6 תווים ומעלה",
        [],
        { cancelable: true }
      );
      return false;
    }

    if (!isValidIsraeliID(israeliId)) {
      Alert.alert("ניסיון הרשמה נכשל", "נא להזין תעודת זהות תקינה", [], {
        cancelable: true,
      });
      return false;
    }

    const emailValidation = pattern.test(email);
    if (userData.fullName.length == 0) {
      Alert.alert("ניסיון הרשמה נכשל", "נא להזין שם מלא", [], {
        cancelable: true,
      });
      return false;
    }

    if (!emailValidation) {
      Alert.alert("ניסיון הרשמה נכשל", "כתובת אימייל לא תקינה", [], {
        cancelable: true,
      });
      return false;
    }
    return true;
  };

  const handleRegisterButtonClick = async () => {
    const userData = {
      email,
      password,
      fullName,
      israeliId,
      phoneNumber,
    };

    console.log(`Registerd user data: ${JSON.stringify(userData)}`);

    if (!validateUserData(userData)) {
      return;
    }

    const registeredUserData = await registerNewUser(userData);
    console.log(
      `Register response data: ${JSON.stringify(registeredUserData)}`
    );

    if (FAILED_REGISTER_STATUS === registeredUserData.status) {
      console.log(registeredUserData);
      Alert.alert("שגיאה בהרשמה", "אירעה שגיאה בהרשמה", [], {
        cancelable: true,
      });
      return;
    }

    await saveUserDataToStore(
      registeredUserData.fullName,
      registeredUserData.objectId,
      registeredUserData.adminPrivilege
    );

    navigation.navigate("Menu");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Animated.View style={[styles.mainContainer, mainContainerStyle]}>
          <View style={{ width: "100%" }}>
            <Header title="יצירת משתמש חדש" subTitle="הכנס פרטים אישיים" />
          </View>
          <View>
            <Input
              icon="md-person"
              placeholder="שם מלא"
              value={fullName}
              onChangeText={setFullName}
            />
            <Input
              icon="md-at"
              placeholder="אימייל"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              icon="ios-wallet"
              placeholder="תעודת זהות"
              value={israeliId}
              onChangeText={setIsraeliId}
            />
            <Input
              icon="ios-checkmark-outline"
              placeholder="סיסמה"
              value={password}
              onChangeText={setPassword}
            />
            <Input
              icon="ios-phone-portrait"
              placeholder="טלפון"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          <Button title="להרשמה" onPress={handleRegisterButtonClick} />
          <Button
            background={false}
            title="להתחברות לחץ כאן"
            onPress={() => navigation.navigate("Login")}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Register;
