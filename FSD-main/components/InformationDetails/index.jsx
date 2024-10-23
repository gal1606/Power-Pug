import React from "react";
import { Image, View, Text, ScrollView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 50,
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    flex: 1,
  },
  title: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 25,
  },
  description: {
    marginTop: 15,
    height: "20%",
    marginBottom: 15,
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
  },
  mainContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 300,
    height: 300,
  },
});

const InformationDetails = ({ route }) => {
  const informationData = route.params.informationDetails;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{informationData.subject}</Text>
      <Text style={styles.description}>{informationData.title}</Text>
      {informationData.img && (
        <Image style={styles.img} source={informationData.img} />
      )}

      <View style={styles.detailsContainer}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.info}>{informationData.text}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default InformationDetails;
