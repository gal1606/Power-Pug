import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import SquareHeader from "./SquareHeader";
import Boxes from "./Boxes";
import { LinearGradient } from "expo-linear-gradient";

const Menu = ({ navigation }) => {
  return (
    <>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.1, 0.8, 0.95]}
        colors={["#FFF0C3", "white", "white", "#FFCACA"]}
        style={styles.container}
      >
        <View style={[styles.imageContainer, { flexGrow: 1 }]}>
          <Image
            style={[styles.icon]}
            source={require("../../img/Wolfson.png")}
          />
        </View>
        <SquareHeader style={[{ flexGrow: 1 }]} />
        <Boxes style={[{ flexGrow: 1 }]} navigation={navigation} />
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "right",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flexBasis: "auto",
    marginTop: "5%",
  },
  icon: {
    resizeMode: "contain",
    width: "28%",
    height: undefined,
    aspectRatio: 1,
  },
});

export default Menu;
