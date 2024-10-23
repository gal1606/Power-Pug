import React from "react";
import { Image, Text, ScrollView, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 25,
    marginTop: 15,
    paddingHorizontal: 20,
  },
  scrollView: {
    marginHorizontal: 30,
    paddingHorizontal: 10,
    marginTop: 25,
    marginBottom: 35,
    overflow: "scroll",
    paddingTop: 0,
  },
  question: {
    fontSize: 22,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  answer: {
    fontSize: 20,
    marginBottom: 30,
  },
  img: {
    resizeMode: "center",
    width: "auto",
    height: "10%",
    margin: 0,
    padding: 0,
  },
});

const InformationData = ({ title, image, text }) => {
  return (
    <>
      <Text style={styles.question}>{title}</Text>
      {image && (
        <Image
          style={styles.img}
          source={{
            uri: image,
          }}
        />
      )}
      <Text style={styles.answer}>{text}</Text>
    </>
  );
};

const Informations = ({ route }) => {
  const informations = route.params.informationDetails;

  const createInformation = () => {
    return informations.map((info, index) => (
      <InformationData
        key={index}
        title={info.title}
        image={info.image}
        text={info.text}
      />
    ));
  };

  return (
    <>
      <Text style={styles.title}>{informations[0].subject}</Text>
      <ScrollView style={styles.scrollView}>{createInformation()}</ScrollView>
    </>
  );
};

export default Informations;
