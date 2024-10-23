import React, { useState } from "react";
import {
  ScrollView,
  Animated,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Input, Header, Icon, Button } from "../../components";
const { height } = Dimensions.get("screen");

const REGISTER_API = "http://power-pag.cs.colman.ac.il/tutorial";

const sendNewIdToServer = async (hebrewUrlId, englishUrlId) => {
  const response = await fetch(REGISTER_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      hebrewURL: hebrewUrlId,
      englishURL: englishUrlId,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("Added url successfully");
        return response.json();
      } else {
        console.log(response.status);
      }
    })
    .catch((error) => console.error(error));
};

const AddNewTutorial = ({ navigation }) => {
  const [alignment, setAlignment] = useState(new Animated.Value(0));
  const [hebrewUrl, setHebrewUrl] = useState("");
  const [englishUrl, setEnglishUrl] = useState("");

  const YouTubeGetID = (url) => {
    var ID = "";
    url = url
      .replace(/(>|<)/gi, "")
      .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
      ID = url[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    } else {
      ID = url;
    }
    return ID;
  };
  const handleSendButton = () => {
    const urls = { hebrewUrl, englishUrl };
    const hebrewUrlId = YouTubeGetID(hebrewUrl);
    const englishUrlId = YouTubeGetID(englishUrl);
    const youtubeId = { hebrewUrlId, englishUrlId };
    console.log(hebrewUrlId, englishUrlId + " jnnjk");
    sendNewIdToServer(youtubeId.hebrewUrlId, youtubeId.englishUrlId);
    navigation.navigate("Tutorials");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Animated.View style={[styles.mainContainer]}>
          <View style={{ width: "100%" }}>
            <Header title="הוספת סרטון חדש" />
          </View>
          <View>
            <Input
              placeholder="כתובת סרטון בעברית "
              value={hebrewUrl}
              onChangeText={setHebrewUrl}
            />
            <Input
              placeholder="כתובת סרטון באנגלית"
              value={englishUrl}
              onChangeText={setEnglishUrl}
            />
          </View>
          <Button title="שמור" onPress={handleSendButton} />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  datePicker: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  mainText: {
    fontSize: 22,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default AddNewTutorial;
