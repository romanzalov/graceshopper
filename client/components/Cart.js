import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import history from '../history';
import {checkoutCartOrder, removeproductInstance, editproductInstance, fetchCart, fetchOrders} from '../store'


class Cart extends Component {
	constructor(props) {
		super(props);
	}

	changeQuantity(id, instance, amount) {
        this.props.editproductInstance(id , {...instance, quantity: amount})
    }
    removeItem(id) {
        this.props.removeProductInstance(id)
    }

    componentDidMount() {
    	this.props.fetchOrders();
    	this.props.fetchCart();
    }

	render() {
		const {orders, user, productInstances, cart, products} = this.props;

		const instances = productInstances.filter(elem => {
			return elem.orderId===cart.id
		})


		return (
			<div className="container">
			<h1 className="my-4">Cart</h1>
				{instances.length>0 ? 
				<div className="row" style={{"paddingBottom":"10px"}}>
				<table style={{width:"100%"}} className="table">
				<tbody>
				  <tr>
					<th>Items</th>
					<th>Price</th>
					<th>Quantity</th>
					<th>Remove</th>
				  </tr>
				  {instances.map(item => (
					<tr key={item.id}>
						<td>
							<div style={{border: "1px solid black", marginBottom:"5px"}}>
								<a href="#"><img className="card-img-top" 
								src={products.find(product => product.id === item.productId).imageUrls[0]}
								alt="" 
								style={{width:"200px", marginRight:"5px"}}/></a>
								{products.find(product => product.id === item.productId).description}
							</div>
						</td>
						<td>${item.price}</td>
						<td>
						{item.quantity} 
						<br/><br/>
						<button 
						className="btn btn-danger"
						onClick={() => this.changeQuantity(item.id, item, item.quantity - 1)}
						>-</button>
							&nbsp; &nbsp;
						<button 
						className="btn btn-success"
						onClick={() => this.changeQuantity(item.id, item, item.quantity + 1)}>+</button>
						</td>
					  	<td>
						  <button 
						  className="btn btn-danger"
						  onClick={() => this.removeItem(item.id)}
						  >X</button>
						</td>
					</tr>
				  ))}
				</tbody>
			  </table>
			  	{instances.length>0 ?
					<button className="btn btn-success" onClick={() => history.push('/checkout')}>Checkout</button>
			  	: null}
				</div>
				: <div>No items in cart</div>}
			</div>
			)
	}
}

const mapStateToProps = function(state) {
	return {
		orders: state.orders,
		user: state.user,
		productInstances: state.productInstances,
		cart: state.cart,
		products: state.products
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
        checkout: cart => {
            dispatch(checkoutCartOrder(cart))
        },
        removeProductInstance: id => {
            dispatch(removeproductInstance(id))
        },
        editproductInstance: (id,productInstance) => {
            dispatch(editproductInstance(id,productInstance))
        },
        fetchOrders: () => {
        	dispatch(fetchOrders())
        },
        fetchCart: () => {
        	dispatch(fetchCart())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)
