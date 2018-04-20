/* eslint-disable */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class OrderHistory extends Component {

	constructor(props) {
		super(props);
	}

	getTotalPrice = order => {
		let total = 0;
		order.instances.forEach((instance) => {
			total = total + instance.price * instance.quantity;
		})
		return total
	}

	render() {
		const {orders} = this.props
		return (
			<div className="container">
				<div className="row">
					<h1 className="my-4">Order History</h1>
					<table style={{width:"100%"}} className="table">
						<tbody>
							<tr>
								<th>Order Placed</th>
								<th>Total</th>
								<th>Shipped To</th>
								<th>Items</th>
								<th>Status</th>
							</tr>
							{orders.filter(order => order.isCart===false).map((order) => (
								<tr key={order.id}>				  
									<td>{order.createdAt}</td> 
									<td>{this.getTotalPrice(order)}</td> 
									<td>{order.user.address.Description}</td>
									<td>
										{order.instances.map(instance => (
											<div key={instance.id} style={{border: "1px solid black", marginBottom:"5px"}}>
												<a href="#"><img className="card-img-top" src={instance.product.imageUrls[0]} alt="" 
												style={{width:"200px", marginRight:"5px"}}/></a>
												{instance.product.description}
											</div>
										))}
									</td>
                  <td>
                    {order.status}
                  <br/>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Order Status:</label>
                    <select className="form-control" id="exampleFormControlSelect1">
                      <option>{order.status}</option>
                      <option>Cancelled</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                  <button style={{"marginTop":"10px"}} className="btn btn-primary">Save</button>
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

const mapStateToProps = function(state) {
	return {
		orders: state.orders
	}
}

const mapDispatchToProps = function(dispatch) {
	return {

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderHistory)
