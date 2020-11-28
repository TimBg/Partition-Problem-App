import { LDM } from './../scripts/LDMalgorithm';

let _ = require('lodash');

const SPLIT_ARR = 'SPLIT_ARR';

let initialState = {
    result: null,
};

const mainReducer = (state = initialState, action) => {
    let copyOfState;

    switch (action.type) {
        case SPLIT_ARR:
            {
                if (!action.arr) {
                    alert('\'set\' key not found');
                    return state
                }

                let newState = _.cloneDeep(state);
                let isNumeric = !action.arr.find(item => typeof item !== 'number');

                if (isNumeric) {
                    newState.result = LDM(action.arr);
                    console.log(newState.result);
                    copyOfState = newState;
                }
            }; return copyOfState;
        default: {
            return state;
        }
    }
}

export const split = arr => {
    return {
        type: SPLIT_ARR,
        arr: arr
    }
}

export default mainReducer;