import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ajouterAuPanier: (state, action) => {
      const produit = action.payload;
      const existant = state.items.some((item) => item._id === produit._id);

      if (!existant) {
        state.items.push(produit);
        state.totalPrice += produit.price || 0;
      }
    },
    supprimerDuPanier: (state, action) => {
      const produitId = action.payload;
      const produit = state.items.find((item) => item._id === produitId);

      if (produit) {
        state.totalPrice -= produit.price || 0;
        state.items = state.items.filter((item) => item._id !== produitId);
      }
    },
    viderLePanier: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { ajouterAuPanier, supprimerDuPanier, viderLePanier } =
  cartSlice.actions;
export default cartSlice.reducer;
