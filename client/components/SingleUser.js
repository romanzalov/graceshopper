import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import store from '../store'

class SingleUser extends Component {
	constructor() {
		super();
	}

	getQuantity = order => {
		let quantity = 0;
		for (var i=0; i<order.instances.length; i++){
			quantity += order.instances.quantity;
		}
		return quantity;
	}
//user not eager loaded
	render() {
		const {user, orders} = this.props;
		console.log('props', this.props)
		const pastOrders = orders.filter(order => order.isCart === false)
		const cart = orders.filter(order => order.isCart === true)
		console.log('past orders', pastOrders)
		console.log('cart', cart)

		return (
			<div>
				<h1>Test</h1>
				<div>
					<h1>Past Orders</h1>
					{orders.length > 0 &&
					<div>
						<table>
							{pastOrders.map(order => {
								return (
									<tr key={order.id}>
									<td>
										<Link to={`/order/${order.id}`}>Past Order 1</Link>
									</td>
									<td>{this.getQuantity(order)} items</td>
									<td>{order.status}</td>
									<td>{order.createdAt.slice(0, 10)}</td>
								</tr>
								)
							})}
						</table>
						<br />
						<h1>Cart</h1>
						{/*cart.instances.length > 0 &&
						<table>
							{
								cart.instances.map(instance => {
									return (
										<tr key={instance.id}>
											<td>{instance.product.title}</td>
											<td>{instance.product.sportType}</td>
											<td>{instance.quantity}</td>
										</tr>
									)
								})
							}
						</table>
						*/}
					</div>
				}

					{user.id &&
						<table>
							<tr>{user.email}</tr>
							<tr>{user.address}</tr>
						</table>}
					</div>
				}
			</div>
		)
	}
}

const mapStateToProps = function(state) {
	return {
		user: state.user,
		orders: state.orders.filter(order => order.userId === state.user.id)
	}
}

const mapDispatchToProps = function(dispatch) {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
