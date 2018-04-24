import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {SingleProduct, Checkout, Cart, AddCategory, AddProduct, EditProduct, EditUser, AdminDashboard, Login, Signup, UserHome, OrderHistory, SingleUser, SingleOrder, AccountInfo, Confirmation, CategoryProducts, ChangePassword } from './components'
import {me} from './store'
import {fetchProducts} from './store/products'
import {fetchOrders} from './store/orders'
import {fetchCart} from './store/cart'
import {fetchproductInstances} from './store/productInstances'
import {fetchCategories} from './store/categories'
import {fetchReviews} from './store/reviews'

import axios from 'axios';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/confirmation" component={Confirmation} />
        <Route path="/all-users" component={AccountInfo} />
        <Route path="/single-user" component={SingleUser} />
        <Route path="/order-history" component={OrderHistory} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/order/:id" component={SingleOrder} />
        <Route path="/category/:id" component={CategoryProducts} />
        <Route exact path="/product/:id" component={SingleProduct} />
        <Route exact path="/" component={UserHome} />
        {
          isLoggedIn &&
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/change-password" component={ChangePassword} />
            {
              isAdmin &&
              <Switch>
                {/* Routes placed here are only available for admin users */}
                <Route path="/edit-product/:id" component={EditProduct} />
                <Route path="/edit-user/:id" component={EditUser} />
                <Route path="/add-product" component={AddProduct} />
                <Route path="/add-category" component={AddCategory} />
                <Route path="/admin-dashboard" component={AdminDashboard} />
              </Switch>
            }
          </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchProducts())
      dispatch(fetchOrders())
      dispatch(fetchCart())
      dispatch(fetchproductInstances())
      dispatch(fetchCategories())
      dispatch(fetchReviews())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
