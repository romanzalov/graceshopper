import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import store from '../store'

class SingleUser extends Component {
	constructor() {
		super();
		this.state = {
			showChangePassword:false,
		};
		this.showChangePassword = this.showChangePassword.bind(this);
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

	showChangePassword() {
		if (!this.state.showChangePassword) {
			this.setState({
				showChangePassword: true,
			})
		}
		else {
			this.setState({
				showChangePassword: false,
			})
		}
	}
	//user not eager loaded
	render() {
		const { user, orders, reviews, productInstances, products, cart } = this.props;
		const pastOrders = orders.filter(order => order.isCart === false)

		const instances = productInstances.filter(elem => {
            return elem.orderId===cart.id
        })

		return (
			<div className="container">
 				<div>
			        { user.id &&
			        	<div>
			        		<h3>Account Info</h3>
							<p>{user.email}</p>
							<button className="btn btn-success" onClick={this.showChangePassword}>Change Password</button>
						</div>
					}
			        <hr />
			        <div>
			        <h3>Current Cart</h3>
			        <table className="table">
			        	<tbody>
				        	<tr>
								<th>Item</th>
								<th>Categories</th>
								<th>Quantity</th>
								<th>Price</th>
							</tr>
				        	{
								instances.length > 0 ? instances.map(instance => {
									const selectedProduct = products.find(product => product.id === instance.productId)
									let categories = []
									selectedProduct.categories.forEach(category => categories.push(category.name))
									categories = categories.join(', ')
									return (
										<tr key={instance.id}>
											<td>{selectedProduct.title}</td>
											<td>{categories}</td>
											<td>{instance.quantity} item(s)</td>
											<td>${instance.price}</td>
										</tr>)

								}) : null
							}
						</tbody>
			        </table>
			        </div>
			        <hr />
			        <div>
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
			        <button onClick={(() => this.props.history.push('/cart'))} className="btn btn-success">Edit Cart</button>
			    	</div>
			    	<div className="card card-outline-secondary my-4">
						<div className="card-header">
							User Reviews
						</div>
						<div className="card-body">
						{reviews.length ? reviews.filter(review => review.userId === user.id).map(review => (
							<div key={review.id}>
								<p>{review.content}</p>
								<p>{review.stars} stars out of 5</p>
								<small className="text-muted">Posted by user ID {review.userId} on {review.createdAt.slice(0,10)}</small>
								<hr />
							</div>
						)) : <div>No reviews</div>}
						</div>
					</div>
			    </div>
	        </div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		user: state.user,
		orders: state.orders.filter(order => order.userId === state.user.id),
		reviews: state.reviews,
		productInstances: state.productInstances,
		products: state.products,
		cart: state.cart
	}
}

const mapDispatchToProps = function (dispatch) {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
