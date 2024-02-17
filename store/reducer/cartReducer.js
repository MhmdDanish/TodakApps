
const initialState = {
    items: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                items: [...state.items, action.payload],
            };

        case 'REMOVE_FROM_CART':
            const updatedItems = state.items.reduce((accumulator, subArray) => {
                const filteredItems = subArray.filter(item => !action.payload.includes(item.id));
                if (filteredItems.length > 0) {
                    accumulator.push(filteredItems);
                }
                return accumulator;
            }, []);

            console.log('Updated items:', updatedItems);

            return {
                ...state,
                items: updatedItems,
            };


        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
            };

        case 'UPDATE_QUANTITY':
            console.log('Updating quantity for item with id:', action.payload.id);
            console.log('New quantity:', action.payload.newQuantity);

            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.newQuantity }
                        : item
                ),
            };

        default:
            return state;
    }
};




export default cartReducer;
