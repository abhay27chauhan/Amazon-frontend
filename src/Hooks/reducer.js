import { calculatePriceDetails } from "../utils/product";

export const initialState = {
    basket: {},
    user: null,
    totalQuantity: 0,
    totalPrice: 0,
}

export const ACTIONS = {
    ADD_TO_BASKET: "add-to-basket",
    REMOVE_FROM_BASKET: "remove-from-basket",
    SET_USER: "set-user",
    EMPTY_BASKET: "empty-basket"
}

export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price*item.quantity + amount, 0)

const reducer = (state, action) => {
    switch(action.type){
        case ACTIONS.ADD_TO_BASKET: {
            const product = action.payload;
            const currentEntry = state.basket[product.id];
            let newEntry;
            if (currentEntry) {
                newEntry = {
                    ...currentEntry,
                    quantity: currentEntry.quantity + 1,
                };
            } else {
                newEntry = {
                    ...product,
                    quantity: 1,
                };
            }
            const { finalPrice } = calculatePriceDetails(product.price);
            return {
                ...state,
                totalQuantity: state.totalQuantity + 1,
                totalPrice: state.totalPrice + finalPrice,
                basket: {
                    ...state.basket,
                    [product.id]: newEntry,
                },
            };
        }
        case ACTIONS.REMOVE_FROM_BASKET: {
            const product = action.payload;
            const currentEntry = state.basket[product.id];
            if(!currentEntry) return state;

            let newEntry;
            if (currentEntry.quantity === 1) {
                newEntry = null;
            } else {
                newEntry = {
                    ...currentEntry,
                    quantity: currentEntry.quantity - 1,
                };
            };

            const { finalPrice } = calculatePriceDetails(product.price);
            return {
                ...state,
                totalQuantity: state.totalQuantity - 1,
                totalPrice: state.totalPrice - finalPrice,
                basket: {
                    ...state.basket,
                    [product.id]: newEntry,
                },
            };
        }
        case ACTIONS.SET_USER:
            return{
                ...state,
                user: action.user
            }
        case ACTIONS.EMPTY_BASKET:
            return {
                ...state,
                basket: {},
                totalQuantity: 0,
                totalPrice: 0,
            }
        default:
            return state;
    }
}

export default reducer;