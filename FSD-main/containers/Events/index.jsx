import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import EventCard from "../../components/EventCard";

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

const EVENTS_URL = "http://power-pag.cs.colman.ac.il/event";

const getEventsFromServer = async () => {
  return fetch(EVENTS_URL).then((response) => response.json());
};

const Events = ({ navigation }) => {
  const [eventsData, setEventsData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(async () => {
    const eventsData = await getEventsFromServer();
    console.log(`# of events: ${eventsData.length}`);
    setEventsData(eventsData);
  }, [isFocused]);

  const getFirstEventById = (eventId) => {
    const matchingEvents = eventsData.filter((event) => event._id === eventId);
    return matchingEvents[0];
  };

  const handleOnPress = (eventId) => {
    const eventToDisplay = getFirstEventById(eventId);

    navigation.navigate("EventDetails", {
      eventDetails: eventToDisplay,
    });
  };

  return (
    <View styles={styles.container}>
      <SafeAreaView styles={styles.container}>
        <ScrollView style={styles.scrollView}>
          {eventsData?.map((event, index) => (
            <EventCard
              title={event.name}
              date={dateFromDateTime(event.dateAndTime)}
              time={timeFromDateTime(event.dateAndTime)}
              id={event._id}
              onPress={handleOnPress}
              key={index}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
  mainContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default Events;
