import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  icon: {
    resizeMode: "stretch",
    width: "45%",
    height: undefined,
    aspectRatio: 1,
  },
  listContainer: {
    justifyContent: "center",
    backgroundColor: "white",
    height: "30%",
    paddingHorizontal: "3%",
    elevation: 30,
    shadowColor: "#52006A",
  },
  listItem: {
    paddingHorizontal: 10,
    paddingBottom: "10%",
    textAlign: "right",
  },
  listInfo: {
    fontSize: 20,
    marginVertical: 5,
  },
  listInfoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 13,
  },
});

const addLeadingZero = (number) => {
  if (parseInt(number) < 10) {
    return "0" + number;
  }
  return number;
};

const timeFromDateTime = (dateTimeString) => {
  const dateTimeObject = new Date(dateTimeString);
  var formatedTime =
    addLeadingZero(dateTimeObject.getUTCHours()) +
    ":" +
    addLeadingZero(dateTimeObject.getUTCMinutes());
  return formatedTime;
};

const dateFromDateTime = (dateTimeString) => {
  const dateTimeObject = new Date(dateTimeString);
  const formatedTime =
    dateTimeObject.getUTCDate() +
    "/" +
    (dateTimeObject.getUTCMonth() + 1) +
    "/" +
    dateTimeObject.getUTCFullYear();
  return formatedTime;
};

const GET_ALL_EVENTS_URL = "http://power-pag.cs.colman.ac.il/event";

const getAllEvents = async () => {
  return fetch(GET_ALL_EVENTS_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => response.json());
};

const getUserEvents = async (userId) => {
  const allEvents = await getAllEvents();

  let userEvents = [];

  allEvents.map((event) => {
    const user = event.participants.filter((user) => user._id === userId);
    if (user.length > 0) {
      userEvents.push(event);
    }
  });

  for (let i = 0; i < userEvents.length; i++) {
    const eventName = userEvents[i].name;
    const eventDateTime = userEvents[i].dateAndTime;
    const eventPlace = userEvents[i].place;

    userEvents[i] = {
      key: i,
      name: eventName,
      dateTime: eventDateTime,
      date: dateFromDateTime(eventDateTime),
      time: timeFromDateTime(eventDateTime),
      place: eventPlace,
    };
  }

  return userEvents;
};

const Notifications = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const userData = useSelector((state) => state.userData);
  const UserId = userData.userId;

  useEffect(async () => {
    if (!isModalVisible) return;

    const userEvents = await getUserEvents(UserId);
    console.log(userEvents);
    setNotificationList(userEvents);
  }, [isModalVisible]);

  return (
    <View styles={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image style={styles.icon} source={require("../../img/icon.png")} />
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn={"fadeIn"}
        animationOut={"fadeOutDown"}
        coverScreen={true}
        backdropColor={"white"}
      >
        {notificationList.length === 0 ? (
          <></>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={notificationList}
              keyExtractor={(item, index) => item.key}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={[styles.listInfo, styles.listInfoTitle]}>
                    {item.name}
                  </Text>
                  <Text style={styles.listInfo}>{"בתאריך: " + item.date}</Text>
                  <Text style={styles.listInfo}>{"בשעה: " + item.time}</Text>
                  <Text style={styles.listInfo}>{"במיקום: " + item.place}</Text>
                </View>
              )}
            />
          </View>
        )}
      </Modal>
    </View>
  );
};

export default Notifications;
