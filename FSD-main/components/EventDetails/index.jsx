import React from "react";
import {
  Alert,
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";

const REGISTER_TO_Event_URL =
  "http://power-pag.cs.colman.ac.il/event/registertoevent/";

const postRegisterUserToEvent = async (userId, eventId) => {
  const registrationData = {
    eventId,
    userId,
  };

  console.log(
    `Register user=[ID=${registrationData.userId}] to event[ID=${registrationData.eventId}] `
  );

  return fetch(REGISTER_TO_Event_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registrationData),
  });
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 15,
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 25,
    paddingHorizontal: 20,
  },
  description: {
    marginTop: "5%",
    marginBottom: "5%",
    fontSize: 20,
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    fontSize: 20,
    marginVertical: 5,
  },
  mainContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    resizeMode: "stretch",
    width: "70%",
    height: "30%",
    margin: 0,
    padding: 0,
  },
  button1: {
    margin: 10,
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignItems: "center",
  },
  text1: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
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

const EventDetails = ({ navigation, route }) => {
  const userData = useSelector((state) => state.userData);
  const eventData = route.params.eventDetails;
  const eventId = eventData._id;

  const date = dateFromDateTime(eventData.dateAndTime);
  const time = timeFromDateTime(eventData.dateAndTime);

  const handleRegisterUserToTutorial = async () => {
    const response = await postRegisterUserToEvent(userData.userId, eventId);
    if (response.ok) {
      Alert.alert("נרשמת בהצלחה!");
    } else {
      Alert.alert("לא ניתן להתחבר", "אירעה שגיאה");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{eventData.name}</Text>
      <Text style={styles.description}>{eventData.description}</Text>
      {eventData.image && (
        <Image
          style={styles.img}
          source={{
            uri: eventData.image,
          }}
        />
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.info}>{"בתאריך: " + date}</Text>
        <Text style={styles.info}>{"בשעה: " + time}</Text>
        <Text style={styles.info}>{eventData.place}</Text>
      </View>
      <TouchableOpacity
        style={[{ backgroundColor: "#2E338C" }, styles.button1]}
        onPress={() => handleRegisterUserToTutorial()}
      >
        <Text style={styles.text1}>{"להרשמה"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventDetails;
