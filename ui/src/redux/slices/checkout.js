import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';

// ----------------------------------------------------------------------

const initialState = {
  activeStep: 0,
  currentReelId: null,
  cart: [],
  subTotal: 0,
  discountedSubTotal: 0,
  total: 0,
  discount: 0,
  taxAmount: 0,
  taxRate: 0,
  shipping: 0,
  billing: null,
  address: [],
  totalItems: 0,
};

const slice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    getCart(state, action) {
      const cart = action.payload;

      const totalItems = sum(cart.map((product) => product.quantity));

      const subTotal = sum(cart.map((product) => product.price * product.quantity));
      const discountedSubTotal = sum(cart.map((product) => product.sale_price * product.quantity));

      state.cart = cart;
      state.currentReelId = state.currentReelId || null;
      state.discount = state.discount || 0;
      state.taxAmount = state.taxAmount || 0;
      state.taxRate = state.taxRate || 0;
      state.shipping = state.shipping || 0;
      state.billing = state.billing || null;
      state.address = state.address || [];
      state.subTotal = subTotal;
      state.discountedSubTotal = discountedSubTotal;
      state.total = discountedSubTotal - state.discount;
      state.totalItems = totalItems;
    },

    addToCart(state, action) {
      const newProduct = action.payload;

      const cartEmpty = !state.cart.length;

      if (cartEmpty) {
        state.cart = [...state.cart, newProduct];
      } else {
        state.cart = state.cart.map((product) => {
          const existProduct = product.id === newProduct.id;

          if (existProduct) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          }

          return product;
        });
      }

      state.cart = uniqBy([...state.cart, newProduct], 'id');
      state.totalItems = sum(state.cart.map((product) => product.quantity));
    },

    deleteCart(state, action) {
      const updateCart = state.cart.filter((product) => product.id !== action.payload);
      const subTotal = sum(updateCart.map((product) => product.sale_price * product.quantity));
      const discountedSubTotal = sum(updateCart.map((product) => product.price * product.quantity));
      state.subTotal = subTotal;
      state.discount = state.subTotal === 0 && 0;
      state.discountedSubTotal = discountedSubTotal;
      state.total = discountedSubTotal;
      state.cart = updateCart;
    },

    resetCart(state) {
      state.cart = [];
      state.address = [];
      state.billing = null;
      state.currentReelId = null;
      state.activeStep = 0;
      state.total = 0;
      state.subTotal = 0;
      state.discountedSubTotal = 0;
      state.discount = 0;
      state.taxAmount = 0;
      state.taxRate = 0;
      state.shipping = 0;
      state.totalItems = 0;
    },

    updateReelId(state, action) {
      state.currentReelId = action.payload;
      console.log('reelId in state', state.currentReelId);
    },

    backStep(state) {
      state.activeStep -= 1;
    },

    nextStep(state) {
      state.activeStep += 1;
    },

    gotoStep(state, action) {
      state.activeStep = action.payload;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;
      console.log(productId);
      const updateCart = state.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });

      state.cart = updateCart;
      state.totalItems = sum(state.cart.map((product) => product.quantity));
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;

      const updateCart = state.cart
        .map((product) => {
          if (product.id === productId) {
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          }
          return product;
        })
        .filter((product) => product.quantity > 0);

      state.cart = updateCart;
      state.totalItems = sum(state.cart.map((product) => product.quantity));
    },

    createBilling(state, action) {
      state.billing = action.payload;
    },

    addAddress(state, action) {
      const address = action.payload;
      state.address = address;
    },

    applyDiscount(state, action) {
      const discount = action.payload;

      state.discount = discount;
      state.total = state.discountedSubTotal + state.shipping - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;

      state.shipping = shipping;
      state.total = state.discountedSubTotal - state.discount + shipping;
    },

    applyTax(state, action) {
      const taxRate = action.payload;
      state.taxRate = taxRate;
      const taxAmount = (state.discountedSubTotal * taxRate) / 100;

      state.taxAmount = taxAmount;
      state.total = state.discountedSubTotal - state.discount + state.shipping + taxAmount;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  updateReelId,
  getCart,
  addToCart,
  resetCart,
  gotoStep,
  backStep,
  nextStep,
  deleteCart,
  createBilling,
  addAddress,
  applyShipping,
  applyTax,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
} = slice.actions;
