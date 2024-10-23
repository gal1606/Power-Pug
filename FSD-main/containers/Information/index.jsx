import React, { useEffect, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import _groupBy from "lodash/groupBy";
import _forEach from "lodash/forEach";
import { DEFAULT_SHADOW_STYLE } from "../../components/SahdowUtils";

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  Button: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: 500,
  },
  button: {
    margin: 10,
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C7E8F9",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#D4EBF7",
  },
  text1: {
    color: "#000",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
});

const INFORMATION_URL = "http://power-pag.cs.colman.ac.il/information";

const getInformationFromServer = () => {
  return fetch(INFORMATION_URL).then((response) => response.json());
};

const Information = ({ navigation, setIsAuthenticated }) => {
  const [informationData, setInformationData] = useState([]);
  const [alignment, setAlignment] = useState(new Animated.Value(0));
  const [subjects, setSubjects] = useState({});

  styles.boxShadow = DEFAULT_SHADOW_STYLE;

  useEffect(async () => {
    const fetchedData = await getInformationFromServer();
    let groupedBySubjects = _groupBy(fetchedData, "subject");
    setSubjects(groupedBySubjects);
    setInformationData(fetchedData);
  }, []);

  const onPressSubject = (subject) => {
    navigation.navigate("InformationDetails", {
      informationDetails: subjects[subject],
    });
  };

  return (
    <View style={styles.container}>
        <Animated.View style={[styles.mainContainer]}>
          {Object.keys(subjects)?.map((subject, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.button, styles.boxShadow]}
              onPress={() => onPressSubject(subject)}
            >
              <Text style={styles.text1}>{subject}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
    </View>
  );
};

export default Information;
