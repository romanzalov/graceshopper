import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const CREATE_USER = 'CREATE_USER'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER = 'UPDATE_USER'


/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
const deleteUser = id => ({type: DELETE_USER, id})
const createUser = user => ({type: CREATE_USER, user})
const updateUser = user => ({type: UPDATE_USER, user})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () =>
  dispatch =>
    axios.get('/api/users')
      .then(res =>
        dispatch(getUsers(res.data)))
      .catch(err => console.log(err))

export const postUser = (user) => {
  return async function thunk (dispatch){
    let newUser = await axios.post('/api/users', user).data;
    dispatch(createUser(newUser));
    //history.push(/path)
    return newUser;
  }
}

export const destroyUser = id =>
  dispatch =>
    axios.delete(`api/users/${id}`)
      .then(() => dispatch(deleteUser(id)))
      .catch(err => console.error(`Removing user: ${id} unsuccessful`, err));

export const editUser = (user, id) => dispatch => {
  return axios.put(`/api/users/${id}`, user)
  .then(res => dispatch(updateUser(res.data)))
  .catch(err => console.error(err))
}


/**
 * REDUCER
 */
export default function (users = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;

    case CREATE_USER:
      return [...users, action.user];

    case DELETE_USER:
      return users.filter(user => user.id !== action.id);

    case UPDATE_USER:
      return users.map(user => (action.user.id === user.id ? action.user : user
      ))

    default:
      return users;
  }
}
