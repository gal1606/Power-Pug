import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Store object in the local storage.
 * @param {string} key
 * @param {object} valueObject
 */
export const storeData = async (key, valueObject) => {
  try {
    const jsonValue = JSON.stringify(valueObject);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // TODO
  }
};

/**
 * Get object from the local storage.
 * @param {string} key
 * @returns
 */
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // TODO
  }
};
