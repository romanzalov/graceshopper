import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import history from '../history';

class Cart extends Component {
	constructor(props) {
		super(props);
	}

	handleAdd(){
		
	}

	render() {
		// const {orders, user, productInstances} = this.props;
		// const {cart} = this.state
		const {orders, user, productInstances, cart} = this.props;
		console.log(cart)
		// const cart = orders.find((order) => {
		// 	return order.isCart === true && order.user.id === this.props.user.id
		// })

		return (
			<div className="container">
			<h1 className="my-4">Cart</h1>
			<div className="row" style={{"paddingBottom":"10px"}}>
			<table style={{width:"100%"}} className="table">
			<tbody>
			  <tr>
				<th>Items</th>
				<th>Price</th>
				<th>Quantity</th>
				<th>Remove</th>
			  </tr>
			  {cart.instances ? cart.instances.map(item => (
				<tr key={item.id}>
					<td>
						<div style={{border: "1px solid black", marginBottom:"5px"}}>
							<a href="#"><img className="card-img-top" src={item.product.imageUrls[0]} alt="" 
							style={{width:"200px", marginRight:"5px"}}/></a>
							{item.product.description}
						</div>
					</td>
					<td>${item.price}</td> 
					<td>
					{item.quantity} 
					<br/><br/>
					<button className="btn btn-danger">-</button>
						&nbsp; &nbsp;
					<button className="btn btn-success">+</button>
					</td>
				  	<td>
					  <button className="btn btn-danger">X</button>
					</td>
				</tr>
			  )) : null}
			</tbody>
		  </table>

			<button className="btn btn-success" onClick={() => history.push('/checkout')}>Checkout</button>
			</div>
			</div>
			)
	}
}

const mapStateToProps = function(state) {
	return {
		orders: state.orders,
		user: state.user,
		productInstances: state.productInstances,
		cart: state.cart
	}
}

const mapDispatchToProps = function(dispatch) {
	return {

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)
