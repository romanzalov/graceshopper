import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { destroyUser, editUser, editOrder } from '../store'

class EditUser extends Component {
	constructor(props) {
		super(props);
	}

	toggleAdmin = (user) => {
		user.isAdmin ? user.isAdmin = false : user.isAdmin = true
		console.log(user, user.id)
		this.props.updateUserAdmin(user, user.id)
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

	render() {
		const { users } = this.props;
		const user = users.find((element) => parseInt(this.props.match.params.id) === element.id)
		const pastOrders = user.orders.filter(order => order.isCart === false)

		return (
			<div className="container">
				{user ? (
					<div>
						<h3>Account Info</h3>
						<p>{user.email}</p>
						{user.isAdmin ? (
							<button
								className="btn btn-danger"
								onClick={() => this.toggleAdmin(user)}
							>Demote to Regular User</button>
						) : (
								<button
									className="btn btn-primary"
									onClick={() => this.toggleAdmin(user)}
								>Promote to Admin</button>
							)
						}

						<button
							className="btn btn-success"
						>Trigger Password Reset</button>
						<button
							onClick={() => this.props.handleUserDelete(user.id)}
							className="btn btn-danger"
							style={{ display: 'inline-block' }}
						>Delete User</button>
					</div>
				) : null}

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
								<th></th>
							</tr>
							{pastOrders.length > 0 && pastOrders.map(order =>
								(
									<tr key={order.id}>
										<td>
											<Link to={`/order/${order.id}`}>Past Order {order.id}</Link>
										</td>
										<td>{order.createdAt.slice(0, 10)}</td>
										<td>${this.getTotalPrice(order)}</td>
										<td>{this.getQuantity(order)} items</td>
										<td>
										<form onSubmit={this.props.handleOrderChange(order.id)}>
											<td>
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
											</td>
											<td><button>Save</button></td>
										</form>
										</td>
										<td><button>Save</button></td>
									</tr>
								)
							)
							}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		users: state.users,
	}

}

const mapDispatchToProps = function (dispatch) {
	return {
		handleUserDelete: id => dispatch(destroyUser(id)),
		updateUserAdmin: (user, id) => dispatch(editUser(user, id)),
		updateOrderStatus: (id, order) => dispatch(editOrder(id, order)),
		handleOrderChange: id => event => {
			event.preventDefault();
			const status = event.target.status.value;
			dispatch(editOrder(id, {status}));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
