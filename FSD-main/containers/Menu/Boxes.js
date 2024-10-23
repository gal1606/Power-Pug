import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { DEFAULT_SHADOW_STYLE } from "../../components/SahdowUtils";

const Boxes = ({ navigation }) => {
  styles.boxShadow = DEFAULT_SHADOW_STYLE;

  return (
    <View style={styles.allScreen}>
      <View style={styles.firstContainer}>
        <View style={styles.box}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Tutorials")}
            style={[styles.firstBoxFromTheLeft, styles.boxShadow]}
          >
            <Text style={styles.textStyle}>סרטונים {"\n"} </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.middleBox}></View>

        <View style={styles.box}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Events")}
            style={[styles.secondBox, styles.boxShadow]}
          >
            <Text style={styles.textStyle}>סדנאות {"\n"}והדרכות</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.secondContainer}>
        <View style={styles.box}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Information")}
            style={[styles.thirdBox, styles.boxShadow]}
          >
            <Text style={styles.textStyle}>מידע{"\n"}חשוב</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.middleBox}></View>
        <View style={styles.box}>
          <TouchableOpacity
            onPress={() => navigation.navigate("MyBaby")}
            style={[styles.forthBox, styles.boxShadow]}
          >
            <Text style={styles.textStyle}>התינוק{"\n"}שלי</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// container - the down half of the screen
const styles = StyleSheet.create({
  allScreen: {
    paddingHorizontal: 20,
  },
  firstContainer: {
    width: "100%",
    height: "30%",
    padding: 5,
    flexWrap: "wrap",
  },
  secondContainer: {
    height: "30%",
    padding: 5,
    flexWrap: "wrap",
  },
  textStyle: {
    color: "white",
    fontSize: 23,
    textAlign: "center",
    fontWeight: "500",
  },
  // the 4 boxes
  box: {
    width: "45%",
    height: "100%",
    padding: 5,
    marginLeft: "2%",
  },
  middleBox: {
    width: "5%",
    padding: 5,
  },
  firstBoxFromTheLeft: {
    flex: 1,
    backgroundColor: "#034694",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  secondBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "orange",
  },
  thirdBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "red",
  },
  forthBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "green",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Boxes;
