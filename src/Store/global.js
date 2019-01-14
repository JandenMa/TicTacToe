import { createStore } from 'redux'

const GlobalStore = createStore((state = {
    orders: 3,
    btnval: 'X'
}, action) => {
    switch (action.type) {
        case 'restart':
            state.orders = action.value;
            return state;
        default:
            return state;
    }
})

export default GlobalStore;

