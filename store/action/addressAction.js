// actionAddress.js

// Define the action type directly
export const ADD_ADDRESS_DETAILS = 'ADD_ADDRESS_DETAILS';

// Action creator function
export const addAddressDetails = (newAddress) => {
  return {
    type: ADD_ADDRESS_DETAILS,
    payload: newAddress,
  };
};
