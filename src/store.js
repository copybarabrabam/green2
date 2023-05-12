import { configureStore, createSlice, current } from "@reduxjs/toolkit";
import itemReducer from "./components/Slices/itemSlice";

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 50, title: "하이", quantity: 1, price: 100 },
    { id: 11, title: "바이", quantity: 1, price: 200 },
  ],
  reducers: {
    addCart(state, action) {
      let itemId = state.findIndex((item) => action.payload.id === item.id);
      itemId !== -1 ? state[itemId].quantity++ : state.push(action.payload);
    },
    removeCart(state, action) {
      let newState = state.filter((item) => item.id !== Number(action.payload));
      return newState;
    },
    updateQuantity(state, action) {
      const { newQuantity, i } = action.payload;
      state[i].quantity = newQuantity;
    },
  },
});

let checkout = createSlice({
  name: "checkout",
  initialState: { subTotal: 0, discount: 1 },
  reducers: {
    getDiscount(state, action) {
      let newDiscount = action.payload;
      state.discount = newDiscount;
    },
    getTotalSum(state, action) {
      let newTotalSum = action.payload;
      state.subTotal = newTotalSum;
      console.log(state.subTotal);
    },
  },
});

let login = createSlice({
  name: "login",
  initialState: { isLogin: false },
  reducers: {
    loginToggle(state, action) {
      console.log("기본값: " + state.isLogin)
      state.isLogin = action.payload;
      console.log(" 변경 값: " + action.payload);
    },
    logout(state) {
      state.isLogin = false;
      console.log("로그아웃 되었습니다.");
    },
  },
});

const store = configureStore({
  reducer: {
    items: itemReducer,
    cart: cart.reducer,
    checkout: checkout.reducer,
    login: login.reducer,
  },
});

export let { addCart, removeCart, updateQuantity } = cart.actions;
export let { getDiscount, getTotalSum } = checkout.actions;
export let { loginToggle,logout } = login.actions;

export default store;
