import store from "./Store";
import { addUserData } from "./StoreActions";

export const addUserDataToStore = (userData) => {
  return store.dispatch(addUserData(userData));
};

export const getUserData = () => {
  const storeState = store.getState();
  return storeState.userData;
};
