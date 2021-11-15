import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../user/LoginSlice";
import Dataslice from "../user/Dataslice";
import FormSlice from "../user/FormSlice";
import userSlice from "../user/userslice";

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem("state");
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};


const persistedStore = loadFromLocalStorage();

const store = configureStore({
  reducer:{
    Login: LoginSlice,
    data: Dataslice,
    Form: FormSlice,
    user: userSlice,
  },
  persistedStore
})
store.subscribe(()=>{
  saveToLocalStorage(store.getState());
})
export default store;

// export default configureStore({
//   reducer: {
//     Login: LoginSlice,
//     data: Dataslice,
//     Form: FormSlice,
//     user: userSlice,
//   },
// });
