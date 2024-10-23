import { Provider } from "react-redux";
import store from "./state/Store";
import React from "react";
import Boxes from "./containers/Menu/Boxes";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Menu from "./containers/Menu/index";
import Events from "./containers/Events/index";
import AddNewEvent from "./containers/Events/AddNewEvent";
import Tutorials from "./containers/Tutorials/index";
import AddNewTutorial from "./containers/Tutorials/AddNewTutorial";
import Information from "./containers/Information";
import AddInfo from "./containers/Information/AddInfo";

import EventDetails from "./components/EventDetails";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Informations from "./components/Informations";
import Notifications from "./components/Notifications";
import MyBaby from "./containers/MyBaby";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import Measurements from "./containers/MyBaby/Measurements";
import { registerTranslation, en } from "react-native-paper-dates";

registerTranslation("en", en);

const Stack = createNativeStackNavigator();

const MenuHeader = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 0,
        margin: 0,
      }}
    >
      <View style={{}}>
        <Text style={{ margin: 0, padding: 0, fontSize: 22 }}>
          {"תפריט ראשי"}
        </Text>
      </View>
      <View
        style={[
          {
            justifyContent: "flex-end",
            flexDirection: "row",
            padding: 0,
          },
        ]}
      >
        <Notifications style={{ margin: 0 }} />
      </View>
    </View>
  );
};

const AddMenuButton = ({ navigation, addScreen }) => {
  const userData = useSelector((state) => state.userData);
  const isAdmin = userData.adminPrivilege;

  return isAdmin ? (
    <Icon.Button
      name="plus"
      backgroundColor="transparent"
      color="black"
      onPress={() => navigation.navigate(addScreen)}
    />
  ) : (
    <></>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: " התחברות",
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: "הרשמה" }}
          />

          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{
              headerTitle: (props) => <MenuHeader {...props} />,
              title: "תפריט ראשי",
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Boxes"
            component={Boxes}
            options={{ title: "תפריט" }}
          />
          <Stack.Screen
            name="Events"
            component={Events}
            options={({ navigation, route }) => ({
              title: "סדנאות והדרכות",
              headerRight: (props) => (
                <AddMenuButton
                  {...props}
                  addScreen={"AddNewEvent"}
                  navigation={navigation}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Information"
            component={Information}
            options={{ title: " מידע חשוב" }}
          />
           <Stack.Screen
            name="AddInfo"
            component={AddInfo}
            options={{ title: "הוספת מידע" }}
          />
          <Stack.Screen
            name="Tutorials"
            component={Tutorials}
            options={({ navigation, route }) => ({
              title: "סרטונים",
              headerRight: (props) => (
                <AddMenuButton
                  {...props}
                  addScreen={"AddNewTutorial"}
                  navigation={navigation}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddNewTutorial"
            component={AddNewTutorial}
            options={{ title: "הוספת סרטון" }}
          />
          <Stack.Screen
            name="MyBaby"
            component={MyBaby}
            options={{ title: " התינוק שלי " }}
          />
          <Stack.Screen
            name="EventDetails"
            component={EventDetails}
            options={{ title: "מידע נוסף" }}
          />
          <Stack.Screen
            name="AddNewEvent"
            component={AddNewEvent}
            options={{ title: " הוספת אירוע חדש " }}
          />
          <Stack.Screen
            name="InformationDetails"
            component={Informations}
            options={{ title: "מידע נוסף" }}
          />
          <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={{ title: "התראות" }}
          />
          <Stack.Screen
            name="Measurements"
            component={Measurements}
            options={{ title: " מדידות קודמות " }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
