import React, { useState } from "react";
import { ScrollView, Animated, View, StyleSheet, Text } from "react-native";
import moment from "moment";
import { DatePickerModal } from "react-native-paper-dates";
import { Input, Header, Button, ImagePicker } from "../../components";
import "intl";
import "intl/locale-data/jsonp/he-IL";

const LOCALE = "en";
const ADD_EVENT_API = "http://power-pag.cs.colman.ac.il/event";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const addNewEvent = async (fullName, description, place, date, imageObject) => {
  let formData = new FormData();
  formData.append("image", imageObject);
  formData.append("name", fullName);
  formData.append("description", description);
  formData.append("place", place);
  formData.append("dateAndTime", date);

  console.log(`formData=${JSON.stringify(formData)}`);

  const response = await fetch(ADD_EVENT_API, {
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

const AddNewEvent = ({ navigation }) => {
  const [alignment, setAlignment] = useState(new Animated.Value(0));
  const [fullName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [formatedEventDate, setFormatedEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [place, setEventLocation] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageObject, setImageObject] = useState({});

  const getFormatedEventDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const onDismissSingle = () => {
    setShowDatePicker(false);
  };

  const onConfirmSingle = (params) => {
    setShowDatePicker(false);
    setFormatedEventDate(getFormatedEventDate(params.date));
  };

  const handleRegisterButtonClick = async () => {
    await addNewEvent(
      fullName,
      description,
      place,
      formatedEventDate,
      imageObject
    );

    navigation.navigate("Events");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Animated.View style={[styles.mainContainer]}>
          <View style={{ width: "100%" }}>
            <Header title="הוספת אירוע חדש" />
          </View>
          <View>
            <View>
              <Text style={styles.inputTitle}>שם</Text>
              <Input value={fullName} onChangeText={setEventName} />
            </View>
            <View>
              <Text style={styles.inputTitle}>תאריך ושעה</Text>
              <Input
                editable={false}
                value={formatedEventDate}
                onInputFocus={showDatePickerHandler}
              />
            </View>
            <View>
              <Text style={styles.inputTitle}>מיקום</Text>
              <Input value={place} onChangeText={setEventLocation} />
            </View>
            <View>
              <Text style={styles.inputTitle}>תיאור</Text>
              <Input value={description} onChangeText={setDescription} />
            </View>
            <View>
              <Text style={styles.inputTitle}>תמונה:</Text>
              <ImagePicker onImageChange={setImageObject}></ImagePicker>
            </View>
          </View>

          {showDatePicker ? (
            <DatePickerModal
              locale={LOCALE}
              mode="single"
              visible={showDatePicker}
              onDismiss={onDismissSingle}
              date={eventDate}
              onConfirm={onConfirmSingle}
            />
          ) : (
            <></>
          )}
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

  datePicker: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
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

export default AddNewEvent;
