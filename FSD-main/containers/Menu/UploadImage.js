import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function UploadImage() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ marginTop: 100 }}>
      {/* title="Upload baby photo:" */}
      <Button title="upload:" color="black" onPress={pickImage}></Button>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderColor: "black",
        }}
      >
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 200 / 2,
              borderColor: "black",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        )}
      </View>
    </View>
  );
}
