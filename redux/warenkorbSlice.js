import { createSlice } from "@reduxjs/toolkit";

const warenkorbSlice = createSlice({
  name: "warenkorb",
  initialState: {
    produkte: [],
    gesamtbetrag: 0,
    wAnzahl: 0,
  },
  reducers: {
    addProdukte: (state, action) => {
      state.produkte.push(action.payload);
      state.wAnzahl += 1;
      state.gesamtbetrag += action.payload.preis * action.payload.menge;
    },
    leeren: (state) => {
      state.produkte = [];
      state.wAnzahl = 0;
      state.gesamtbetrag = 0;
    },
    loescheProdukt: (state, action) => {
      const leftProdukte = state.produkte.filter(
        (produkt) => produkt._id !== action.payload._id,
      );
      state.produkte = leftProdukte;

      state.wAnzahl -= 1;
      state.gesamtbetrag -= action.payload.preis * action.payload.menge;
    },
    mengeÄnderrung: (state, action) => {
      const { _id, menge } = action.payload;
      const produkt = state.produkte.find((p) => p._id === _id);
      if (produkt && menge > 0) {
        produkt.menge = menge;

        state.gesamtbetrag = state.produkte.reduce(
          (summe, p) => summe + p.preis * p.menge,
          0,
        );
      }
    },
  },
});

export const { loescheProdukt, addProdukte, leeren, mengeÄnderrung } =
  warenkorbSlice.actions;
export default warenkorbSlice.reducer;
