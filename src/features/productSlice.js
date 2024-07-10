import { createSlice } from "@reduxjs/toolkit";

const dataFromLocalStorage = () => {
  return (
    JSON.parse(localStorage.getItem("products")) || {
      products: [],
      amount: 0,
      price: 0,
    }
  );
};

const productsSlice = createSlice({
  name: "products",
  initialState: dataFromLocalStorage(),
  reducers: {
    addProduct: (state, { payload }) => {
      const item = state.products.find((product) => product.id === payload.id);

      if (item) {
        item.amount += payload.amount;
      } else {
        state.products.push(payload);
      }

      productsSlice.caseReducers.calculateTotal(state);
    },
    removeProduct: (state, { payload }) => {
      state.products = state.products.filter((item) => {
        return item.id !== payload;
      });
      productsSlice.caseReducers.calculateTotal(state);
    },
    clearCart: (state) => {
      state.amount = 0;
      state.products = [];
    },
    changeAmount: (state, { payload }) => {
      const item = state.products.find((item) => item.id === payload.id);
      if (payload.type === "increase") {
        item.amount += 1;
      } else {
        item.amount -= 1;
      }
      productsSlice.caseReducers.calculateTotal(state);
    },
    calculateTotal: (state) => {
      let price = 0;
      let amount = 0;

      state.products.forEach((item) => {
        price += item.price * item.amount;
        amount += item.amount;
      });

      state.amount = amount;
      state.price = price;
      localStorage.setItem("products", JSON.stringify(state));
    },
  },
});

export const {
  addProduct,
  removeProduct,
  calculateTotal,
  clearCart,
  changeAmount,
} = productsSlice.actions;
export default productsSlice.reducer;
