// cartActions.js
export const addToCart = (product) => {
    return {
        type: 'ADD_TO_CART',
        payload: product
    };
};

export const removeFromCart = (product) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: product
    };
};

export const addToFavorites = (product) => {
    return {
        type: 'ADD_TO_FAVORITES',
        payload: product
    };
};

export const removeFromFavorites = (product) => {
    return {
        type: 'REMOVE_FROM_FAVORITES',
        payload: product
    };
};
