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
		return sum;
	}

	render() {
		const {order} = this.props
		return (
			<div className="container">
				<div className="row">
					<h1 className="my-4">Order</h1>
					<table style={{width:"100%"}} className="table">
						{order ? (
						<tbody>
							<tr>
								<th>Order Placed</th>
								<th>Total</th>
								<th>Shipped To</th>
								<th>Items</th>
								<th>Status</th>
							</tr>
							<tr>
								<td>{order.createdAt}</td> 
								<td>${this.getOrderTotal()}</td> 
								<td>{order.user.address.Description ? order.user.address.Description : null}</td>
								<td>
									{order.instances.map(instance => (
										<div key={instance.id} style={{border: "1px solid black", marginBottom:"5px"}}>
											<a href="#"><img className="card-img-top" src={instance.product.imageUrls[0]} alt="" 
											style={{width:"200px", marginRight:"5px"}}/></a>
											{instance.product.description}
										</div>
									))}
								</td>
								<td>{order.status}</td>
	             			</tr>
						</tbody>
						) : null
					}
				  </table>
				</div>
			</div>
		)
	}
}

const mapStateToProps = function(state, ownProps) {
	return {
		order: state.orders.find(order => order.id === +ownProps.match.params.id)
	}
}

const mapDispatchToProps = function(dispatch) {
	return {

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleOrder)
