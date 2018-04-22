import axios from 'axios';

//action types
const GET_CATEGORIES = 'GET_CATEGORIES';
const CREATE_CATEGORY = 'CREATE_CATEGORY';
const EDIT_CATEGORY = 'EDIT_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';


//action creators
const init = categories => ({type: GET_CATEGORIES, categories});
const create = category => ({type: CREATE_CATEGORY, category});
const edit = category => ({type: EDIT_CATEGORY, category});
const remove = id => ({type: DELETE_CATEGORY, id});

//THUNKS
export const fetchCategories = function(){
	return function thunk(dispatch) {
		return axios.get('/api/categories')
		.then(res =>
			dispatch(init(res.data)))
		.catch(err => console.log(err))
	}
}

export const addCategory = function(category){
	return function thunk(dispatch) {
		return axios.post('/api/categories', category)
		.then(res =>
			dispatch(create(res.data)))
		.catch(err => console.error(err))
	}
}

export const editCategory = function(id, category){
	return function thunk(dispatch) {
		return axios.put(`/api/categories/${id}`, category)
		.then(res => dispatch(edit(res.data)))
		.catch(err => console.error(err))
	}
}

export const removeCategory = function(id){
	return function thunk(dispatch) {
		return axios.delete(`/api/categories/${id}`)
		.then(() => dispatch(remove(id)))
		.catch(err => console.error(err))
	}
}

//reducer
export default function(categories = [], action){
	switch (action.type){
		case GET_CATEGORIES:
			return action.categories
		case CREATE_CATEGORY:
			return [...categories, action.category]
		case EDIT_CATEGORY:
			return categories.map(category => (action.category.id === category.id ? action.category : category))
		case DELETE_CATEGORY:
			return categories.filter(category => (category.id !== action.id))
		default:
			return categories
	}
}

