import * as StoreEvents from "./StoreEvents";

export const addUserData = (userData) => {
  return {
    type: StoreEvents.ADD_USER_DATA,
    payload: userData,
  };
};
