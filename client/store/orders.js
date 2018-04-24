import axios from 'axios';

//action types
const GET_ORDERS = 'GET_ORDERS';
const CREATE_ORDER = 'CREATE_ORDER';
const EDIT_ORDER = 'EDIT_ORDER';

//action creators
const init = orders => ({type: GET_ORDERS, orders});
const create = order => ({type: CREATE_ORDER, order});
const edit = order => ({type: EDIT_ORDER, order});

//THUNKS
export const fetchOrders = function(){
	return function thunk(dispatch) {
		return axios.get('/api/orders')
		.then(res =>
			dispatch(init(res.data)))
		.catch(err => console.log(err))
	}
}

export const addOrder = function(order){
	return function thunk(dispatch) {
		return axios.post('/api/orders', order)
		.then(res => {
			dispatch(create(res.data))
		})
		.catch(err => console.error(err))
	}
}

export const editOrder = function(id, order){
	return function thunk(dispatch) {
		return axios.put(`/api/orders/${id}`, order)
		.then(res => {
			dispatch(edit(res.data))
		})
		.catch(err => console.error(err))
	}
}

//reducer
export default function(orders = [], action){
	switch (action.type){
		case GET_ORDERS:
			return action.orders
		case CREATE_ORDER:
			return [...orders, action.order]
		case EDIT_ORDER:
			console.log('orders', orders)
			console.log('action order', action.order)
			return orders.map(order => (action.order.id === order.id ? action.order : order))
		default:
			return orders
	}
}

