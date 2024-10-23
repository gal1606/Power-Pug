import * as StoreEvents from "./StoreEvents";

const initialState = {
  userData: {
    userName: "",
    userId: "",
    adminPrivilege: false,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case StoreEvents.ADD_USER_DATA: {
      return {
        ...state,
        userData: { ...action.payload },
      };
    }
    default: {
      return state;
    }
  }
}
