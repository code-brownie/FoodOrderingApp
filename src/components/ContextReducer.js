import React, { useReducer, createContext, useContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    img: action.img,
                    Qty: action.Qty,
                    size: action.size,
                    price: action.price
                }
            ];
        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;
        case "UPDATE":
            let arr = [...state];
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.Qty, parseInt(action.Qty), action.price + food.price);
                    arr[index] = { ...food, Qty: parseInt(action.Qty) + food.Qty, price: action.price + food.price };
                }
                return null; // Add a return statement here
            });
            return arr;
        case "DROP":
            let empArray = [];
            return empArray;
        default:
            console.log("Error in Reducer");
            return state; // Return the default state
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
