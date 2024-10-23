import { Platform, NativeModules } from "react-native";

//export const HEBREW_PLATFORRM = ["iw_IL", "en_IL"];
export const HEBREW_PLATFORRM = ["iw_IL"];

export const getLocale = () => {
  if (Platform.OS === "ios") {
    return (
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    );
  } else if (Platform.OS === "android") {
    return NativeModules.I18nManager.localeIdentifier;
  } else {
    // Currently there is no support for web platform.
    return {};
  }
};

export const isLocaleHebrew = () => {
  const lang = getLocale();
  if (HEBREW_PLATFORRM.includes(lang)) {
    return true;
  }
  return false;
};
