import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";

const SquareHeader = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  let helloText = "בוקר טוב";
  if (currentHour >= 19 || currentHour <= 5) {
    helloText = "ערב טוב";
  } else if (currentHour >= 11) {
    helloText = "צהריים טובים";
  }
  const userData = useSelector((state) => state.userData);
  const userName = userData.userName;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTextStyle}>{helloText + " " + userName}</Text>
        <Text style={styles.headerTextStyle}>לאן ברצונך לגשת?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    top: "42%",
    paddingHorizontal: 50,
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 1,
    flexShrink: 1,
    marginVertical: "10%",
  },
  headerTextStyle: {
    flexDirection: "row",
    fontSize: 22,
    paddingTop: 2,
    fontWeight: "500",
  },
});

export default SquareHeader;
