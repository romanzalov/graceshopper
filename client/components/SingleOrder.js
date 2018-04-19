import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

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
		const {order} = this.props;
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

const mapStateToProps = function(state) {
	return {
		order:
		{
			"id": 1,
			"isCart": false,
			"status": "Created",
			"createdAt": "2018-04-19T16:02:37.452Z",
			"updatedAt": "2018-04-19T16:02:37.452Z",
			"userId": 1,
			"instances": [
				{
					"id": 1,
					"price": "29.99",
					"quantity": 1,
					"createdAt": "2018-04-19T16:02:37.458Z",
					"updatedAt": "2018-04-19T16:02:37.458Z",
					"orderId": 1,
					"productId": 2,
					"product": {
						"id": 2,
						"sportType": "Football",
						"title": "Helmet",
						"quantity": 6,
						"price": "35",
						"imageUrls": [
							"https://picsum.photos/700/400"
						],
						"availability": null,
						"description": "A sport",
						"createdAt": "2018-04-19T16:02:37.432Z",
						"updatedAt": "2018-04-19T16:02:37.432Z"
					}
				},
				{
					"id": 2,
					"price": "9.99",
					"quantity": 1,
					"createdAt": "2018-04-19T16:02:37.458Z",
					"updatedAt": "2018-04-19T16:02:37.458Z",
					"orderId": 1,
					"productId": 1,
					"product": {
						"id": 1,
						"sportType": "Football",
						"title": "Shoulder Pads",
						"quantity": 7,
						"price": "23",
						"imageUrls": [
							"https://picsum.photos/700/400"
						],
						"availability": null,
						"description": "A sport",
						"createdAt": "2018-04-19T16:02:37.432Z",
						"updatedAt": "2018-04-19T16:02:37.432Z"
					}
				},
				{
					"id": 3,
					"price": "39.99",
					"quantity": 2,
					"createdAt": "2018-04-19T16:02:37.458Z",
					"updatedAt": "2018-04-19T16:02:37.458Z",
					"orderId": 1,
					"productId": 4,
					"product": {
						"id": 4,
						"sportType": "Basketball",
						"title": "Basketball Shoes",
						"quantity": 13,
						"price": "250",
						"imageUrls": [
							"https://picsum.photos/700/400"
						],
						"availability": null,
						"description": "A sport",
						"createdAt": "2018-04-19T16:02:37.432Z",
						"updatedAt": "2018-04-19T16:02:37.432Z"
					}
				}
			]
		}
	}
}

const mapDispatchToProps = function(dispatch) {
	return {

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleOrder)
