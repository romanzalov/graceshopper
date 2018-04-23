import axios from 'axios'
/**
 * ACTION TYPES
 */
const ADD_REVIEW = 'ADD_REVIEW';
const GET_REVIEWS = 'GET_REVIEWS';

const init = reviews => ({type: GET_REVIEWS, reviews})
const add = review => ({type: ADD_REVIEW, review})


/**
 * THUNK CREATORS
 */
export const fetchReviews = function(){
  return function thunk(dispatch) {
    return axios.get('/api/reviews')
    .then(res =>
      dispatch(init(res.data)))
    .catch(err => console.error(err))
  }
}


export const addReview = function(review){
	return function reviewToAdd(dispatch) {
		return axios.post('/api/reviews', review)
		.then(res =>
			dispatch(add(res.data)))
		.catch(err => console.error(err))
	}
}
/**
 * REDUCER
 */
export default function (reviews = [], action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case ADD_REVIEW:
      return [...reviews, action.review]
    default:
      return reviews
  }
}
