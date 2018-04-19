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
		const {user} = this.props;
		console.log('user', this.props.user)
		// if (user.id) {
		// 	const pastOrders = user.orders.filter(order => order.isCart === false)
		// 	const cart = user.orders.filter(order => order.isCart === true)
		// }
		return (
			<div>
				{user.id &&
				<div>
					{/*<h1>Past Orders</h1>
					<table>
						{pastOrders.map(order => {
							return (
								<tr key={order.id}>
								<td>
									<Link to={`/orders/${order.id}`}>Past Order 1</Link>
								</td>
								<td>{this.getQuantity(order)} items</td>
								<td>{order.status}</td>
								<td>{order.createdAt.slice(0,9)}</td>
							</tr>
							)
						})}
					</table>
					<br />
					<h1>Cart</h1>
					<table>
						{
							cart.map(instance => {
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
					<table>
						<tr>{user.email}</tr>
						<tr>{user.address}</tr>
						{user.googleId && <tr>{user.googleId}</tr>}
					</table>
				</div>
				}
			</div>
		)
	}
}

const mapStateToProps = function(state) {
	return {
		user: state.user
	}
}

const mapDispatchToProps = function(dispatch) {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser)
