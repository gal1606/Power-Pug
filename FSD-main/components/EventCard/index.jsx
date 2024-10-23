import React, { useRef } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import { DEFAULT_SHADOW_STYLE } from "../../components/SahdowUtils";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const UNREGISTER_FROM_EVENTS_URL =
  "http://power-pag.cs.colman.ac.il/event/unregisterFromEvent";

const deregisterFromEvent = async (requestData) => {
  return fetch(UNREGISTER_FROM_EVENTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
  });
};

const EventCard = ({ title, date, time, id, onPress }) => {
  const userData = useSelector((state) => state.userData);
  const userId = userData.userId;
  const swipeableReference = useRef();

  styles.boxShadow = DEFAULT_SHADOW_STYLE;

  const handleRectPress = async () => {
    const requestData = {
      eventId: id,
      userId,
    };

    await deregisterFromEvent(requestData);

    swipeableReference.current.close();
  };

  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
          onPress={async () => handleRectPress()}
        >
          ביטול הרשמה
        </Animated.Text>
      </RectButton>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeableReference}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderLeftActions={renderLeftActions}
      >
        <View style={[styles.container, styles.boxShadow]}>
          <Text style={[styles.text, styles.titleText]}>{title}</Text>
          <Text style={styles.text}>בתאריך: {date}</Text>
          <Text style={styles.text}>בשעה: {time}</Text>
          <TouchableOpacity
            style={[{ backgroundColor: "#2E338C" }, styles.button1]}
            onPress={() => onPress(id)}
          >
            <Text style={styles.text1}>{"למידע נוסף והרשמה"}</Text>
          </TouchableOpacity>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#C7E8F9",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 10,
    backgroundColor: "#D4EBF7",
    marginHorizontal: "2%",
  },
  button: {
    padding: 20,
    paddingHorizontal: 50,
    borderRadius: 20,
    alignItems: "center",
  },
  button1: {
    margin: 10,
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontSize: 22,
    fontWeight: "500",
  },
  titleText: {
    fontWeight: "bold",
  },
  text1: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  leftAction: {
    justifyContent: "center",
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#C7E8F9",
  },
  actionText: {
    color: "black",
    fontSize: 16,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EventCard;
