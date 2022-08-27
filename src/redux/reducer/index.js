const {
    GET_ALL_PRODUCTS,
    GET_PRODUCT_BY_ID,
    UPDATE_PRODUCT,
    FILTERED_INSTRUMENTS,
    CREATE_PRODUCT,
    ADD_TO_CART,
    // REMOVE_ONE_FROM_CART,
    // REMOVE_ALL_FROM_CART,
    GET_USER_NAME_ORDERS,
    GET_USER_NAME_COMMENT,
    UPDATE_AMOUNT,
    // CLEAR_CART,
    PURCHASE_ORDER,
    ADD_TO_CART_PURCHASE_ORDER,
    // REMOVE_ONE_FROM_CART_PURCHASE_ORDER,
    // REMOVE_ALL_FROM_CART_PURCHASE_ORDER,
    GET_USERS,
    // POST_USER,
    GET_USER_NAME,

} = require('../actions/index');

const initialState = {
    instruments: [],
    allInstruments: [],
    favoriteInstruments: [],
    retrievedInstrument: null,
    filteredIntruments: [],
    orders: [],
    ordersCopy: [],
    cart: [],
    cartAmount: 0,
    purchaseOrder: [],
    comments: [],
    commentsAdmin: [],
    commentsAdminCopy: [],
    render: [],
    users: [],
    usersCopy: [],
    userLogged: [],
    usersFavAll: [],
    usersFavShowed: [],
    userLoggedFavsShowed: [],
    
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allInstruments: action.payload,
                instruments: action.payload,
            }

        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                retrievedInstrument: action.payload
            }

        case UPDATE_PRODUCT:
            const allInstrumentsUpdated = state.allInstruments.map(item =>
                item._id === action.payload._id ? action.payload : item);

            const instrumentsUpdated = state.instruments.map(item =>
                item._id === action.payload._id ? action.payload : item);

            return {
                ...state,
                allInstruments: allInstrumentsUpdated,
                instruments: instrumentsUpdated,
                retrievedInstrument: action.payload
            }

        case CREATE_PRODUCT:
            return {
                ...state,
                allInstruments: [action.payload, ...state.allInstruments]
            }
        case FILTERED_INSTRUMENTS:
            console.log(action.payload);
            return {
                ...state,
                instruments: action.payload
            }

        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                usersCopy: action.payload,
                usersFavAll: action.payload,
                usersFavShowed: action.payload,
            }

        // case POST_USER:
        //     const loggedFavBooks = action.payload[0].favouritesBooks
        //     const loggedFavBooksShowed = loggedFavBooks.filter(
        //         (book) => book.isHidden === false
        //     )

        //     return {
        //         ...state,
        //         userLogged: action.payload,
        //         userLoggedFavsBooksShowed: loggedFavBooksShowed,
        //     }

        case GET_USER_NAME:
            const nameUCopy = state.usersCopy
            const nameU = nameUCopy.filter(
                (e) =>
                    e.username.toLowerCase().includes(action.payload.toLowerCase()) ||
                    e.email.toLowerCase().includes(action.payload.toLowerCase())
            )

            return {
                ...state,
                users: nameU,
            }

        case GET_USER_NAME_ORDERS:
            const ordersWithUsersReducer = state.ordersCopy.filter(
                (order) => order.user.length > 0
            )
            const nameUOrder = ordersWithUsersReducer.filter((order) =>
                order.user[0].email
                    .toLowerCase()
                    .includes(action.payload.toLowerCase())
            )

            return {
                ...state,
                orders: nameUOrder,
            }

        // case GET_USER_NAME_COMMENT:
        //     const userNameComments = state.commentsAdminCopy.filter(
        //         (comment) => comment.users.length > 0
        //     )
        //     const nameUComment = userNameComments.filter((comment) =>
        //         comment.users[0].email
        //             .toLowerCase()
        //             .includes(action.payload.toLowerCase())
        //     )

        //     return {
        //         ...state,
        //         commentsAdmin: nameUComment,
        //     }

        case PURCHASE_ORDER:
            return {
                ...state,
                purchaseOrder: [...state.purchaseOrder, action.payload],
            }

        case ADD_TO_CART:
            let newCart = state.cart
            let repeats = false
            let index = ''
            newCart.map((e, i) =>  {
                if (e._id === action.payload._id) {
                    repeats = true
                    index = i
                }
            })
            if (repeats) {
                newCart[index].amount++
            } else {
                newCart.push(action.payload)
                newCart[newCart.length - 1].amount = 1
            }
            return {
                ...state,
                cart: newCart,
                render: Math.random(),
            }

        case ADD_TO_CART_PURCHASE_ORDER:
            let newCart4 = state.purchaseOrder
            let newCart5 = state.cart
            let rep = false
            let index4 = ''
            let instrumentId = ''

            newCart5.map((e, i) => {
                if (e._id === action.payload) {
                    instrumentId = e.products._id
                }
            })

            newCart4.map((e, i) => {
                if (e.name === instrumentId) {
                    rep = true
                    index4 = i
                }
            })

            if (rep) {
                newCart4[index4].quantity++
            }
            return {
                ...state,
                purchaseOrder: newCart4,
            }


        // case REMOVE_ONE_FROM_CART:
        //     let newCart2 = state.cart
        //     let index2 = ''
        //     newCart2.map((e, i) => {
        //         if (e._id === action.payload) {
        //             index2 = i
        //         }
        //     })
        //     if (newCart2[index2].amount === 1) {
        //         newCart2.splice(index2, 1)
        //     } else {
        //         newCart2[index2].amount--
        //     }
        //     return {
        //         ...state,
        //         cart: newCart2,
        //         render: Math.random(),
        //     }

        // case REMOVE_ONE_FROM_CART_PURCHASE_ORDER:
        //     let newCart6 = state.purchaseOrder
        //     let newCart7 = state.cart
        //     let index5 = ''
        //     let instrumentId1 = ''

        //     newCart7.map((e, i) => {
        //         if (e._id === action.payload) {
        //             instrumentId1 = e.products._id
        //         }
        //     })

        //     newCart6.map((e, i) => {
        //         if (e.name === instrumentId1) {
        //             index5 = i
        //         }
        //     })

        //     if (newCart6[index5].quantity === 1) {
        //         newCart6.splice(index5, 1)
        //     } else {
        //         newCart6[index5].quantity--
        //     }

        //     return {
        //         ...state,
        //         purchaseOrder: newCart6,
        //     }

        // case REMOVE_ALL_FROM_CART:
        //     let newCart3 = state.cart
        //     console.log('id :', action.payload)
        //     newCart3 = newCart3.filter((e) => e._id !== action.payload)
        //     return {
        //         ...state,
        //         cart: newCart3,
        //     }
        case UPDATE_AMOUNT:
            return {
                ...state,
                cartAmount: action.payload,
            }

        // case REMOVE_ALL_FROM_CART_PURCHASE_ORDER:
        //     let newCart8 = state.purchaseOrder
        //     let newCart9 = state.cart
        //     let instrumentId2 = ''

        //     newCart9.map((e, i) => {
        //         if (e._id === action.payload) {
        //             instrumentId2 = e.name
        //         }
        //     })

        //     const newCart10 = newCart8.filter((e) => e.name !== instrumentId2)

        //     return {
        //         ...state,
        //         purchaseOrder: newCart10,
        //     }

        // case CLEAR_CART:
        //     return {
        //         ...state,
        //         cart: [],
        //         purchaseOrder: [],
        //     }
        default:
            return state
    }
}
