let initialState = {
  deckCard: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "FETCH_DECK_CARD":
      return { ...state, deckCard: payload };
    default:
      return state;
  }
};

export default reducer;
