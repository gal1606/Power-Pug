import { Platform } from "react-native";
/**
    Helper function to create cross platform shadow style.

    React Native shadow tutorial: https://blog.logrocket.com/applying-box-shadows-in-react-native/ 
    React Native shadow generator: https://ethercreative.github.io/react-native-shadow-generator/

    How to use:
    1. Create styles object
    2. Create the shadow using this helper function:
        const shadowDesign = generateBoxShadowStyle(0, 5, "#000", 0.34, 6.27, 10, "#000");
    3. Insert the shadow to the style object:
        styles.boxShadow = shadowDesign;
    4. Use the shadow style in your component:
        <View style={styles.boxShadow}>
*/
export const generateBoxShadowStyle = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColorAndroid
) => {
  if (Platform.OS === "ios") {
    return {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === "android") {
    return {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  } else {
    // Currently there is no shadow design for web platform.
    return {};
  }
};

export const DEFAULT_SHADOW_STYLE = generateBoxShadowStyle(
  0,
  5,
  "#000",
  0.34,
  6.27,
  10,
  "#000"
);
