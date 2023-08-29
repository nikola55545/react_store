// cartReducer.js
const initialState = {
    cartItems: []
};

const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITES':
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };

        case 'REMOVE_FROM_FAVORITES':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
            };
        default:
            return state;
    }
};

export default favoriteReducer;
