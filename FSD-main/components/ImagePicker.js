import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Button, View, Image, StyleSheet, Alert, Platform } from "react-native";

const requestPermission = async () => {
  const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!granted) {
    Alert.alert("הרשאות גישה", "אשר הרשאות גישה למצלמה", [], {
      cancelable: true,
    });
  }
};

/* https://stackoverflow.com/a/42521680 */
const prepareImageObject = (imageUri) => {
  console.log(typeof imageUri);
  let localUri = imageUri;
  localUri = localUri.replace("///", "//");
  localUri =
    Platform.OS === "android" ? imageUri : imageUri.replace("file://", "");

  const filename = localUri.split("/").pop();

  // Infer the type of the image
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : `image`;

  console.log(`localUri=${localUri}`);

  return { uri: localUri, name: filename, type };
};

const MyImagePicker = ({ onImageChange }) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(async () => {
    requestPermission();
  }, []);

  const selectImage = async () => {
    await ImagePicker.launchImageLibraryAsync()
      .then((result) => {
        setImageUri(result.uri);

        const imageObject = prepareImageObject(result.uri);
        //console.log(`imageObject=${JSON.stringify(imageObject)}`);
        onImageChange(imageObject);
      })
      .catch((error) => {
        console.log("Error reading an image");
        console.log(error);
      });
  };

  return (
    <View>
      <View style={styles.imageContainer}>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
      <Button title="Select Image" onPress={selectImage}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    backgroundColor: "#d9f2e6",
    height: 150,
    width: 150,
    borderRadius: 100,
  },
});

export default MyImagePicker;
