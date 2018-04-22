import axios from 'axios';

//action types
const GET_PRODUCTS = 'GET_PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';


//action creators
const init = products => ({type: GET_PRODUCTS, products});
const create = product => ({type: CREATE_PRODUCT, product});
const edit = product => ({type: EDIT_PRODUCT, product});
const remove = id => ({type: DELETE_PRODUCT, id});

//THUNKS
export const fetchProducts = function(){
	return function thunk(dispatch) {
		return axios.get('/api/products')
		.then(res =>
			dispatch(init(res.data)))
		.catch(err => console.log(err))
	}
}

export const addProduct = function(product){
	return function thunk(dispatch) {
		return axios.post('/api/products', product)
		.then(res =>
			dispatch(create(res.data)))
		.catch(err => console.error(err))
	}
}

export const editProduct = function(product, id){
	console.log('running')
	return function thunk(dispatch) {
		console.log('still running')
		return axios.put(`/api/products/${id}`, product)
		.then(res => dispatch(edit(res.data)))
		.catch(err => console.error(err))
	}
}

export const removeProduct = function(id){
	return function thunk(dispatch) {
		return axios.delete(`/api/products/${id}`)
		.then(() => dispatch(remove(id)))
		.catch(err => console.error(err))
	}
}

//reducer
export default function(products = [], action){
	switch (action.type){
		case GET_PRODUCTS:
			return action.products
		case CREATE_PRODUCT:
			return [...products, action.product]
		case EDIT_PRODUCT:
			return products.map(product => (action.product.id === product.id ? action.product : product))
		case DELETE_PRODUCT:
			return products.filter(product => (product.id !== action.id))
		default:
			return products
	}
}

