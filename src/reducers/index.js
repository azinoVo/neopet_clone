import {
    BUY_ITEM,
    SELL_ITEM,
} from '../actions';

const initialState = {
    user: {
        currency: 1000,
        inventory:
            {
                spring_seed: 3,
                summer_seed: 1,
                fall_seed: null,
                winter_seed: null,
                main_garden_plot: 2,
                orchard_plot: 2
            }
    },
    game: {
        shop: ["spring_seed", "summer_seed", "fall_seed", "winter_seed", "main_garden_plot", "orchard_plot"],
        shopPrices: {
            spring_seed: 20,
            summer_seed: 25,
            fall_seed: 30,
            winter_seed: 35,
            main_garden_plot: 100,
            orchard_plot: 200
        }
    },
    orchard: ["empty_plot.png", "empty_plot.png"],
    mainGarden: ["empty_plot.png", "empty_plot.png"],
    
};

// Switch statements that handle action creators to set the state
const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case BUY_ITEM:
            console.log("BUY ITEM in reducer", action.payload)
            return {
                ...state,
                user: {
                    ...state.user,
                    currency: state.user.currency - action.payload.price,
                    inventory: {
                        ...state.user.inventory,
                        [action.payload.item]: state.user.inventory[action.payload.item] + 1
                    }
                }

            };

            case SELL_ITEM:
                console.log("SELL ITEM in reducer", action.payload)
                return {
                    ...state,
                    user: {
                        ...state.user,
                        currency: state.user.currency + Math.ceil(action.payload.price*0.75),
                        inventory: {
                            ...state.user.inventory,
                            [action.payload.item]: state.user.inventory[action.payload.item] - 1
                        }
                    }
    
                };

        default:
            return state;
    }
};

export default rootReducer;
