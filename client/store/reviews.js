import axios from 'axios'
/**
 * ACTION TYPES
 */
const ADD_REVIEW = 'ADD_REVIEW'

/**
 * INITIAL STATE
 */
const productReview = {}

/**
 * ACTION CREATORS
 */
// const reviewx = review => ({type: ADD_REVIEW, review})

export const reviewx = function (review) {
    return {
        type: ADD_REVIEW,
        review
    }
}

/**
 * THUNK CREATORS
 */
export const addReview = function(review){
	return function reviewToAdd(dispatch) {
		return axios.post('/api/reviews', review)
		.then(res =>
			dispatch(reviewx(res.data)))
		.catch(err => console.error(err))
	}
}
/**
 * REDUCER
 */
export default function (state = productReview, action) {
  switch (action.type) {
    case ADD_REVIEW:
      return action.review
    default:
      return state
  }
}
