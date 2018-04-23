import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import history from '../history';
import {checkoutCartOrder, removeproductInstance, editproductInstance} from '../store'


class Cart extends Component {
	constructor(props) {
		super(props);
	}

	changeQuantity(id, instance, amount) {
        console.log("changing quantity: ", id, amount)
        // var orderId = this.props.cart.id;
        

        this.props.editproductInstance(id , {...instance, quantity: amount})

        // axios.put(`/api/orders/${orderId}/products/${id}`, {
        //     quantity: amount,
        // }).then(()=> {
        //     axios.get('/api/session/cart').then(response => {
        //         if (response.data) {
        //             this.setState({
        //                 cart: response.data,
        //                 loaded: true,
        //             })
        //         }
        //     })
        // })
    }
    removeItem(id) {
        console.log("removing item: ", id);
        

        this.props.removeProductInstance(id)

        // axios.delete(`/api/orders/${orderId}/products/${id}`).then(() =>  {
        //     axios.get('/api/session/cart').then(response => {
        //         if (response.data) {
        //             this.setState({
        //                 cart: response.data,
        //                 loaded: true,
        //             })
        //         }
        //     })       
        // })
    }

	render() {
		// const {orders, user, productInstances} = this.props;
		// const {cart} = this.state
		const {orders, user, productInstances, cart} = this.props;
		console.log(cart)
		// const cart = orders.find((order) => {
		// 	return order.isCart === true && order.user.id === this.props.user.id
		// })

		return (
			<div className="container">
			<h1 className="my-4">Cart</h1>
				{cart.instances ? 
				<div className="row" style={{"paddingBottom":"10px"}}>
				<table style={{width:"100%"}} className="table">
				<tbody>
				  <tr>
					<th>Items</th>
					<th>Price</th>
					<th>Quantity</th>
					<th>Remove</th>
				  </tr>
				  {cart.instances.map(item => (
					<tr key={item.id}>
						<td>
							<div style={{border: "1px solid black", marginBottom:"5px"}}>
								<a href="#"><img className="card-img-top" src={item.product.imageUrls[0]} alt="" 
								style={{width:"200px", marginRight:"5px"}}/></a>
								{item.product.description}
							</div>
						</td>
						<td>${item.price}</td> 
						<td>
						{item.quantity} 
						<br/><br/>
						<button 
						className="btn btn-danger"
						onClick={() => this.changeQuantity(item.id, item, item.quantity - 1)}
						>-</button>
							&nbsp; &nbsp;
						<button 
						className="btn btn-success"
						onClick={() => this.changeQuantity(item.id, item, item.quantity + 1)}>+</button>
						</td>
					  	<td>
						  <button 
						  className="btn btn-danger"
						  onClick={() => this.removeItem(item.id)}
						  >X</button>
						</td>
					</tr>
				  ))}
				</tbody>
			  </table>
			  	{cart.instances.length ?
					<button className="btn btn-success" onClick={() => history.push('/checkout')}>Checkout</button>
			  	: null}
				</div>
				: <div>No items in cart</div>}
			</div>
			)
	}
}

const mapStateToProps = function(state) {
	return {
		orders: state.orders,
		user: state.user,
		productInstances: state.productInstances,
		cart: state.cart
	}
}

const mapDispatchToProps = function(dispatch) {
	return {
        checkout: cart => {
            dispatch(checkoutCartOrder(cart))
        },
        removeProductInstance: id => {
            dispatch(removeproductInstance(id))
        },
        editproductInstance: (id,productInstance) => {
            dispatch(editproductInstance(id,productInstance))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)
