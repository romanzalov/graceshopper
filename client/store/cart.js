import axios from 'axios';

//action types
const GET_CART = 'GET_CART';
const EDIT_CART = 'EDIT_CART';

//action creators
const init = cart => ({type: GET_CART, cart});
const edit = cart => ({type: EDIT_CART, cart});

//THUNKS
export const fetchCart = function(){
	return function thunk(dispatch) {
		return axios.get('/api/session')
		.then(res =>
			dispatch(init(res.data.cart)))
		.catch(err => console.log(err))
	}
}

// export const editOrder = function(id, order){
// 	return function thunk(dispatch) {
// 		return axios.put(`/api/orders/${id}`, order)
// 		.then(res => dispatch(edit(res.data)))
// 		.catch(err => console.error(err))
// 	}
// }

//add product to cart
export const addProductToCart = function(id){
	return function thunk(dispatch) {
		return axios.post('/api/session/cart', {
			productId: id,
		})
		.then((res) => {
			dispatch(init(res.data))
		})
	}
}

//reducer
export default function(cart = {}, action){
	switch (action.type){
		case GET_CART:
			return action.cart
		case EDIT_CART:
			return cart.map(el => (action.cart.id === el.id ? action.cart : el))
		default:
			return cart
	}
}

