import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("screen");

const Button = ({ disabled = false, title, onPress, background = true }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          background ? [styles.button, styles.buttonBackground] : styles.button
        }
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={background ? styles.text : styles.blackText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    margin: 1,
    padding: 10,
    paddingHorizontal: 5,
    borderRadius: 15,
    width: width / 2.2,
    alignItems: "center",
  },
  buttonBackground: {
    backgroundColor: "#2E338C",
  },
  text: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "500",
  },
  blackText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default Button;
