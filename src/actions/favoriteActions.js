
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
