/* eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {editOrder, fetchOrders} from '../store'

class OrderHistory extends Component {

	constructor(props) {
		super(props);
		this.state = {
			statuses: ""
		}
	}

	getTotalPrice = order => {
		let total = 0;
		order.instances.forEach((instance) => {
			total = total + instance.price * instance.quantity;
		})
		return total
	}

	render() {
		const { orders } = this.props
		return (
			<div className="container">
				<div className="row">
					<h1 className="my-4">Order History</h1>
					<table style={{ width: "100%" }} className="table">
						<tbody>
							<tr>
								<th>Order Placed</th>
								<th>Total</th>
								<th>Shipped To</th>
								<th>Items</th>
								<th>Status</th>
							</tr>
							{orders.filter(order => order.isCart === false).map((order) => (
								<tr key={order.id}>
									<td>{order.createdAt.slice(0, 10)}</td>
									<td>{this.getTotalPrice(order)}</td>
									<td>{order.information.address ? order.information.address : null}</td>
									<td>
										{order.instances.map(instance => (
											<div key={instance.id} style={{ border: "1px solid black", marginBottom: "5px" }}>
												<a href="#"><img className="card-img-top" src={instance.product.imageUrls[0]} alt=""
													style={{ width: "200px", marginRight: "5px" }} /></a>
												{instance.product.description}
											</div>
										))}
									</td>
									<td>
										<p>{order.status}</p>
										<br />
										<form onSubmit={this.props.handleOrderChange(order.id)}>
										<div className="form-group">
											<label htmlFor="exampleFormControlSelect1">Order Status:</label>
											{order.status === 'Created' &&
												<div className="form-group">
													<select className="form-control" id="status">
														<option selected>Created</option>
														<option>Processing</option>
														<option>Cancelled</option>
														<option>Completed</option>
													</select>
												</div>
											}
											{order.status === 'Processing' &&
												<div className="form-group">
													<select className="form-control" id="status">
														<option>Created</option>
														<option selected>Processing</option>
														<option>Cancelled</option>
														<option>Completed</option>
													</select>
												</div>
											}
											{order.status === 'Cancelled' &&
												<div className="form-group">
													<select className="form-control" id="status">
														<option>Created</option>
														<option>Processing</option>
														<option selected>Cancelled</option>
														<option>Completed</option>
													</select>
												</div>
											}
											{order.status === 'Completed' &&
												<div className="form-group">
													<select className="form-control" id="status">
														<option>Created</option>
														<option>Processing</option>
														<option>Cancelled</option>
														<option selected>Completed</option>
													</select>
												</div>
											}
										</div>
										<button type="submit" style={{ "marginTop": "10px" }} className="btn btn-primary">Save</button>
										</form>
									</td>

								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		orders: state.orders
	}
}

const mapDispatchToProps = function (dispatch) {
	return {
		handleOrderChange: id => event => {
			const status = event.target.status.value;
			dispatch(editOrder(id, { status }));
		},
		fetchOrders: () => {
			dispatch(fetchOrders())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
