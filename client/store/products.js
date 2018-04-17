import axios from 'axios';

//action types
const GET_PRODUCTS = 'GET_PRODUCTS';

//initial state
const defaultProducts = []

//action creators
const getProducts = products => ({type: GET_PRODUCTS, products});

//THUNKS
export const fetchProducts = () =>
	dispatch =>
    axios.get('/api/products')
      .then(res =>
        dispatch(getProducts(res.data || defaultProducts)))
      .catch(err => console.log(err))

//reducer
export default function(state = defaultProducts, action){
	switch (action.type){
		case GET_PRODUCTS:
			return action.products
		default:
			return state
	}
}

