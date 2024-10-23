import React, { Children } from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemEven: {
    backgroundColor: "#fff",
  },
  itemOdd: {
    backgroundColor: "grey",
  },
});

const List = ({ list }) => {
  return (
    <View styles={styles.container}>
      {!!list &&
        list.map((item, index) => (
          <View
            onPress={item.onPress}
            style={index % 2 === 0 ? styles.itemEven : styles.itemOdd}
          >
            <Text>{item.text}</Text>
          </View>
        ))}
    </View>
  );
};

export default List;
