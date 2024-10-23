import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Alert, FlatList, Text, Switch } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useIsFocused } from "@react-navigation/native";

const TUTORIAL_URL = "http://power-pag.cs.colman.ac.il/tutorial";

const Tutorials = () => {
  const [playing, setPlaying] = useState(false);
  const [videos, setVideos] = useState([]);
  const [isHebrew, setIsHebrew] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const lang = isHebrew ? "עברית" : "English";

  const getAllVideos = async () => {
    return fetch(TUTORIAL_URL)
      .then((response) => response.json())
      .then((jsonArr) => {
        const newVideos = jsonArr?.map((video, index) => {
          return {
            id: index,
            url: isHebrew ? video.hebrewURL : video.englishURL,
            isPlaying: false,
          };
        });
        setVideos(newVideos);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  };

  useEffect(async () => {
    await getAllVideos();
  }, [isHebrew, isFocused]);

  console.log(videos);
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.lang}>
          <Text>{lang}</Text>
          <Switch
            trackColor={{ false: "dodgerblue", true: "dodgerblue" }}
            thumbColor={isHebrew ? "black" : "white"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setIsHebrew(!isHebrew)}
            value={isHebrew}
          />
        </View>
      </View>

      <View>
        {videos && videos.length > 0 && (
          <FlatList
            style={styles.list}
            data={videos}
            renderItem={(video) => (
              <View key={video.item.id}>
                <YoutubePlayer
                  height={270}
                  play={playing}
                  videoId={video.item.url}
                  onChangeState={onStateChange}
                />
              </View>
            )}
          />
        )}
      </View>
    </>
  );
};

export default Tutorials;

const styles = StyleSheet.create({
  SafeAreaView: {
    backgroundColor: "#e6faff",
  },
  Image: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  lang: {
    alignItems: "center",
  },
  list: {
    marginTop: 20,
    width: "90%",
    alignContent: "center",
    marginLeft: 20,
  },
});
