import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = ({ title, subTitle }) => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{subTitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    marginTop: "1%",
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: "1%",
  },
  title: {
    fontSize: 29,
    fontWeight: "500",
    textAlign: "center",
    textTransform: "uppercase",
  },
  subtitleContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: "1%",
  },
  subtitle: {
    fontWeight: "300",
    fontSize: 18,
  },
});

export default Header;
