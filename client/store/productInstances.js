import axios from 'axios'

//action types
const GET_PRODUCTINSTANCES = 'GET_PRODUCTINSTANCES';
const CREATE_PRODUCTINSTANCES = 'CREATE_PRODUCTINSTANCES';
const EDIT_PRODUCTINSTANCES = 'EDIT_PRODUCTINSTANCES';
const DELETE_PRODUCTINSTANCES = 'DELETE_PRODUCTINSTANCES';


//action creators
const init = productInstances => ({type: GET_PRODUCTINSTANCES, productInstances});
const create = productInstance => ({type: CREATE_PRODUCTINSTANCES, productInstance});
const edit = productInstance => ({type: EDIT_PRODUCTINSTANCES, productInstance});
const remove = id => ({type: DELETE_PRODUCTINSTANCES, id});

//THUNKS
export const fetchproductInstances = function(){
	return function thunk(dispatch) {
		return axios.get('/api/product-instances')
		.then(res =>
			dispatch(init(res.data)))
		.catch(err => console.log(err))
	}
}

export const addproductInstance = function(productInstance){
	return function thunk(dispatch) {
		return axios.post('/api/product-instances', productInstance)
		.then(res =>
			dispatch(create(res.data)))
		.catch(err => console.error(err))
	}
}

export const editproductInstance = function(id, productInstance){
	return function thunk(dispatch) {
		return axios.put(`/api/product-instances/${id}`, productInstance)
		.then(res => dispatch(edit(res.data)))
		.catch(err => console.error(err))
	}
}

export const removeproductInstance = function(id){
	return function thunk(dispatch) {
		return axios.delete(`/api/product-instances/${id}`)
		.then(() => dispatch(remove(id)))
		.catch(err => console.error(err))
	}
}

//reducer
export default function(productInstances = [], action){
	switch (action.type){
		case GET_PRODUCTINSTANCES:
			return action.productInstances
		case CREATE_PRODUCTINSTANCES:
			return [...productInstances, action.productInstance]
		case EDIT_PRODUCTINSTANCES:
			return productInstances.map(productInstance => (action.productInstance.id === productInstance.id ? action.productInstance : productInstance))
		case DELETE_PRODUCTINSTANCES:
			return productInstances.filter(productInstance => (productInstance.id !== action.id))
		default:
			return productInstances
	}
}

