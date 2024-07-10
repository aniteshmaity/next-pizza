"use client"

const { createContext, useReducer, useMemo } = require("react");



const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":

            return [...state, {
                id: action.id,
                tempId: action.tempId,
                name: action.name,
                price: action.price,
                qty: action.qty,
                size: action.priceOptions,
                image: action.image
            }];

        case "UPDATE":
            let arr = [...state];
            arr.find((item, index) => {
                console.log(item);
                if (item.tempId === action.tempId) {
                    arr[index] = { ...item, qty:parseInt(action.qty) + parseInt(item.qty), price:action.price + item.price }
                }
            });
            return arr;

            case "REMOVE":
                let newArr=[...state];
                newArr.splice(action.index, 1);
           return newArr;

           case "INCREMENT":
      let incArr = [...state];
      incArr.find((food, index) => {
        if (food.tempId === action.tempId) {
          incArr[index] = {
            ...food,
            qty: parseInt(food.qty) + 1,
            price: food.price + action.unitPrice,
          };
        }
      });
      return incArr;

      case "DECREMENT":
        let decArr = [...state];
        decArr.find((food, index) => {
          if (food.tempId === action.tempId) {
            decArr[index] = {
              ...food,
              qty: parseInt(food.qty) - 1,
              price: food.price - action.unitPrice,
            };
          }
        });
        return decArr;

        case "DROP":
          return [];

        default:
            console.log("jsut");
    }
}



export const cartContext = createContext();



export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, []);
    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch])
    return (
        <cartContext.Provider value={contextValue}>
            {children}
        </cartContext.Provider>
    )
}