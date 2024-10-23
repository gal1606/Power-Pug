import React, { useState } from "react";
import { ScrollView, Animated, View, StyleSheet, Text } from "react-native";
import moment from "moment";
import { DatePickerModal } from "react-native-paper-dates";
import { Input, Header, Button, ImagePicker } from "../../components";
import "intl";
import "intl/locale-data/jsonp/he-IL";
const LOCALE = "en";
const ADD_INFO_API = "http://power-pag.cs.colman.ac.il/information";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const addInfo = async (subject, title, textToSend,imageObject) => {
  let formData = new FormData();
  formData.append("image", imageObject);
  formData.append("subject", subject);
  formData.append("title", title);
  formData.append("text", textToSend);
  console.log(`formData=${JSON.stringify(formData)}`);

  const response = await fetch(ADD_INFO_API, {
    method: "POST",
    // headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  })
    .catch((error) => {
      console.log(`Error=${error}`);
    })
    .catch(() => {
      console.log(`Some error occured`);
    });

  await sleep(2000);
};

const AddInfo = ({ navigation }) => {
  const [alignment, setAlignment] = useState(new Animated.Value(0));
  const [subject, setSubjectName] = useState("");
  const [title, setTitle] = useState("");
  const [textToSend, setText] = useState("");
  const [imageObject, setImageObject] = useState({});

  const handleRegisterButtonClick = async () => {
    await addInfo(
      subject,
      title,
      textToSend,
      imageObject
    );
    navigation.navigate("Information");
    console.log("going to events screen back");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Animated.View style={[styles.mainContainer]}>
          <View style={{ width: "100%" }}>
            <Header title=" הוספת מידע חשוב" />
          </View>
          <View>
            <View>
              <Text style={styles.inputTitle}>כותרת</Text>
              <Input value={title} onChangeText={setTitle} />
            </View>
            <View>
              <Text style={styles.inputTitle}>נושא</Text>
              <Input value={subject} onChangeText={setSubjectName} />
            </View>
            <View>
              <Text style={styles.inputTitle}>תיאור</Text>
              <Input value={textToSend} onChangeText={setText} />
            </View>
            <View>
              <Text style={styles.inputTitle}>תמונה:</Text>
              <ImagePicker onImageChange={setImageObject}></ImagePicker>
            </View>
          </View>
          <Button title="שמור" onPress={handleRegisterButtonClick} />
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

  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  inputTitle: { fontSize: 21 },
  saveButton: {
    margin: 10,
    backgroundColor: "#2E338C",
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignItems: "center",
  },
});

export default AddInfo;
