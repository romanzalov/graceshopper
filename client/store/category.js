import axios from 'axios';

//action types
const GET_CATEGORIES = 'GET_CATEGORIES';
const FILTER_CATEGORY = 'FILTER_CATEGORY';

//action creators
const init = category => ({type: GET_CATEGORIES, category});
const filter = category => ({type: FILTER_CATEGORY, category});

//THUNKS
export const fetchCategories = function(){
	return function thunk(dispatch) {
		return axios.get('/api/category')
		.then(res => {
			console.log("store/category line 16: ", res.data);
			dispatch(init(res.data))
		})
		.catch(err => console.log(err))
	}
}

export const filterCategories = function(id){
	return function thunk(dispatch) {
		return axios.get(`/api/category${id}`)
		.then(res => {
			dispatch(init(res.data))
		})
		.catch(err => console.log(err))
	}
}

//reducer
export default function(category = [], action){
	switch (action.type){
		case GET_CATEGORIES:
			return action.category
		case FILTER_CATEGORY:
            return action.category
        default:
			return category
	}
}

