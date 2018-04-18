import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUsers} from '../store/'

class SingleUser extends Component {
	constructor() {
		super();
	}

	render() {
		const {user} = this.props;
		const pastOrders = user.orders.filter(order => order.isCart === false)
		const cart = user.orders.filter(order => order.isCart === true)
		return (
			<div>
				<h1>Past Orders</h1>
				<table>
					{pastOrders.map(order => {
						return (
							<tr key={order.id}>
							<td>
								<Link to={`/orders/${order.id}`}>Past Order 1</Link>
							</td>
							<td>{order.status}</td>
							<td>{order.createdAt}</td>
						</tr>
						)
					})}
				</table>
				<br />
				<h1>Cart</h1>
				<table>
					{
						cart.map(item => {
							return (
								<tr key={item.id}>
								</tr>
							)
						})
					}
				</table>
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
