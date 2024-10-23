import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInputMask } from "react-native-masked-text";

export default class Datetime extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dt: "",
    };
  }

  render() {
    return (
      <View>
        <TextInputMask
          style={styles.MaskedDate}
          type={"datetime"}
          options={{
            format: "DD/MM/YYYY",
          }}
          value={this.state.dt}
          onChangeText={(text) => {
            this.setState({
              dt: text,
            });
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MaskedDate: {
    backgroundColor: "white",
    borderColor: "black",
    height: 35,
    padding: 10,
    width: 100,
    borderRadius: 4,
    marginBottom: 10,
    position: "relative",
  },
});
