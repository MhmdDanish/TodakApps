// reducer.js

// Import any necessary dependencies
import { ADD_ADDRESS_DETAILS } from '../action/addressAction'; // Import your action type constant

// Initial state
const initialState = {
  // Your initial state properties
  addresses: [],
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESS_DETAILS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };
    // Handle other action types if needed

    default:
      return state;
  }
};

export default reducer;
