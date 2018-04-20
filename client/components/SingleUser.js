import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import store from '../store'

class SingleUser extends Component {
	constructor() {
		super();
	}

	getQuantity = order => {
		let quantity = 0;
		order.instances.forEach((instance) => {
			quantity = quantity + instance.quantity
		})
		// for (var i = 0; i < order.instances.length; i++) {
		// 	quantity += order.instances.quantity;
		// }
		return quantity;
	}

	getTotalPrice = order => {
		let total = 0;
		order.instances.forEach((instance) => {
			total = total + instance.price * instance.quantity;
		})
		return total
	}
	//user not eager loaded
	render() {
		const { user, orders } = this.props;
		const pastOrders = orders.filter(order => order.isCart === false)
		const cart = orders.find(order => order.isCart === true)

		return (
			<div className="container">
 				<div className="row" style={{"paddingTop":"10px"}}>
			        { user.id &&
			        	<div>
			        		<h3>Account Info</h3>
							<p>{user.email}</p>
							<p>{user.address.Description}</p>
						</div>
					}
			        <hr />
			        <h3>Past Orders</h3>
			        <table className="table">
				        <tbody>
								<tr>
									<th>Order</th>
									<th>Date</th>
									<th>Total</th>
									<th>Quantity</th>
									<th>Status</th> 
								</tr>
								{orders.length > 0 && pastOrders.map(order =>
										(
											<tr key={order.id}>
												<td>
													<Link to={`/order/${order.id}`}>Past Order {order.id}</Link>
												</td>
												<td>{order.createdAt.slice(0, 10)}</td>
												<td>${this.getTotalPrice(order)}</td>
												<td>{this.getQuantity(order)} items</td>
												<td>{order.status}</td>
											</tr>
										)
									)
								}
				         </tbody>
			        </table>
			        <hr />
			        <h3>Current Cart</h3>
			        <table className="table">
			        	<tbody>
				        	<tr>
								<th>Item</th>
								<th>Category</th>
								<th>Quantity</th>
								<th>Price</th>
							</tr>
				        	{
								cart ? cart.instances.map(instance => (
									
										<tr key={instance.id}>
											<td>{instance.product.title}</td>
											<td>{instance.product.sportType}</td>
											<td>{instance.quantity}</td>
											<td>{instance.price}</td>
										</tr>
									)
								) : null
							}
						</tbody>
			        </table>
			        <button onClick={(() => this.props.history.push('/cart'))} className="btn btn-success">Edit Cart</button>
			    </div> 
	        </div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		user: state.user,
		orders: state.orders.filter(order => order.userId === state.user.id)
	}
}

const mapDispatchToProps = function (dispatch) {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
