import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProduct } from '../store'
import history from '../history'

class AddProduct extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<h1 className="my-4">Add Product</h1>
				<form onSubmit={this.props.handleSubmit}>
					<div className="row" style={{ "padding-bottom": "10px" }}>
						<div className="col-lg-6">
							<div className="form-group">
								<label for="productTitle"><b>Product Title</b></label>
								<input type="string" className="form-control" id="productTitle" aria-describedby="emailHelp" placeholder="Enter product name" />
								<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
							</div>
							<div className="form-group">
								<label for="productDescription"><b>Product Description</b></label>
								<input type="string" className="form-control" id="productDescription" placeholder="Enter description" />
							</div>
							<div className="form-group">
								<label for="imageUrl"><b>Product Images (up to 3)</b></label>
								<input type="file" className="form-control" id="imageUrl1" placeholder="Password" />
								<input type="file" className="form-control" id="imageUrl2" placeholder="Password" />
								<input type="file" className="form-control" id="imageUrl3" placeholder="Password" />
							</div>
						</div>
						<div className="col-lg-6">
							<div className="form-group">
								<label for="quantity"><b>Quantity</b></label>
								<input type="number" className="form-control" id="quantity" placeholder="Enter Quantity" />
							</div>

							<div className="form-group">
								<label for="price"><b>Price</b></label>
								<input type="number" className="form-control" id="price" placeholder="Enter Price" />
							</div>
							<b>Product Categories</b>
							<div className="form-check">
								<input type="checkbox" className="form-check-input" id="exampleCheck1" />
								<label className="form-check-label" for="exampleCheck1">Check me out</label>
								<br />
								<input type="checkbox" className="form-check-input" id="exampleCheck2" />
								<label className="form-check-label" for="exampleCheck2">Check me out</label>
								<br />
								<input type="checkbox" className="form-check-input" id="exampleCheck3" />
								<label className="form-check-label" for="exampleCheck3">Check me out</label>
								<br />
								<input type="checkbox" className="form-check-input" id="exampleCheck4" />
								<label className="form-check-label" for="exampleCheck4">Check me out</label>
								<br />
								<input type="checkbox" className="form-check-input" id="exampleCheck5" />
								<label className="form-check-label" for="exampleCheck5">Check me out</label>
								<br />
							</div>
							<button type="submit" className="btn btn-primary" style={{ "margin-top": "10px" }}><b>Submit</b></button>
						</div>
					</div>
				</form>
			</div>

		)
	}
}

const mapStateToProps = function (state) {
	return {}
}

const mapDispatchToProps = function (dispatch) {
	return {
		handleSubmit: event => {
			event.preventDefault();
			console.log('event', event.target.productTitle.value)
			const productTitle = event.target.productTitle.value
			const productDescription = event.target.productDescription.value
			const quantity = event.target.quantity.value
			const price = event.target.price.value
			dispatch(addProduct({
				sportType: 'Baseball',
				title: productTitle,
				description: productDescription,
				quantity,
				price
			}))
			history.push('/admin-dashboard')
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
