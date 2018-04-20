import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchOrders } from '../store/orders';

class SingleOrder extends Component {
	constructor(props) {
		super(props);
	}

	getOrderTotal = () => {
		const {order} = this.props;
		let sum = 0;
		for(let i=0; i<order.instances.length; i++){
			sum += order.instances[i].price * order.instances[i].quantity;
		}
		return sum/100;
	}


	render() {
		const {order} = this.props;
		console.log('props', this.props)
		return (
			<div>
				<h3>Order created: {order.createdAt.slice(0,9)}</h3>
				<h3>Status: {order.status}</h3>
				<h3>Total: {this.getOrderTotal()}</h3>
				<table>
					{order.instances.map(instance => {
						return (
							<tr key={instance.id}>
								<td>{instance.product.title}</td>
								<td>{instance.price}</td>
								<td>{instance.quantity}</td>
							</tr>
						)
					})}
				</table>
			</div>

			)
	}
}

const mapStateToProps = function(state, ownProps) {
	console.log('orders', state.orders)
	return {
		order: state.orders.filter(order => order.id === ownProps.match.params.id)
	}
}

const mapDispatchToProps = function(dispatch) {
	return {

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleOrder)
